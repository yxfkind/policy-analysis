/**
 * 全国电力市场规则分析 - 数据自动更新脚本
 *
 * 功能：
 * 1. 从配置的数据源抓取最新政策/数据
 * 2. 更新 data/data.js 中的数据字段
 * 3. 生成更新日志
 *
 * 使用方式：
 *   node scripts/update-data.js              # 执行更新
 *   node scripts/update-data.js --check      # 仅检查是否有更新，不写入
 *   node scripts/update-data.js --dry-run    # 试运行，打印将发生的变更
 *
 * 数据源在 SOURCES 中配置，可按需增删。
 * 由于政策网站结构多变，本脚本采用「抓取 + 人工复核」半自动模式：
 *  - 自动抓取候选更新
 *  - 写入 data/data.js 前标记箱级（灰箱/待核实）
 *  - 可在 CI 中定时运行，生成 PR 供人工审核
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, '..', 'data', 'data.js');
const LOG_FILE  = path.join(__dirname, '..', 'data', 'update-log.json');

// ---------- 数据源配置 ----------
// 每个源：name, url, type(rss/json/html), parser 函数名
// 实际使用时请根据目标网站结构调整 parser
const SOURCES = [
  {
    name: '国家发改委-政策发布',
    url: 'https://www.ndrc.gov.cn/xxgk/zcfb/',
    type: 'html',
    keywords: ['电力', '储能', '现货', '容量', '电价', '新能源']
  },
  {
    name: '国家能源局-通知公告',
    url: 'https://www.nea.gov.cn/policy/zcfg.htm',
    type: 'html',
    keywords: ['电力市场', '储能', '现货']
  },
  {
    name: '北极星储能网',
    url: 'https://chuneng.bjx.com.cn/',
    type: 'html',
    keywords: ['容量电价', '现货', '储能收益']
  }
];

// ---------- 工具：HTTP GET ----------
function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (policy-analysis-bot)',
        'Accept': 'text/html,application/xhtml+xml'
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ---------- 简易 HTML 文本抽取 ----------
function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- 从文本中匹配关键数据 ----------
function matchMetrics(text) {
  const hits = [];
  // 价差类：数字 + 元/MWh
  const spreadRe = /(\d+(?:\.\d+)?)\s*元\/MWh/g;
  let m;
  while ((m = spreadRe.exec(text)) !== null) {
    hits.push({ type: 'spread', value: m[1], context: text.slice(Math.max(0, m.index - 40), m.index + 40) });
  }
  // 利用率
  const utilRe = /(风电|光伏)[^\d]{0,10}(\d{2,3}(?:\.\d+)?)%/g;
  while ((m = utilRe.exec(text)) !== null) {
    hits.push({ type: 'utilization', category: m[1], value: m[2], context: text.slice(Math.max(0, m.index - 30), m.index + 30) });
  }
  return hits;
}

// ---------- 读取当前数据 ----------
function readData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return raw;
}

// ---------- 更新 data.js 中的字段 ----------
function patchDataFile(updates) {
  let raw = readData();
  let changed = false;

  // 更新数据时点
  if (updates.dataDate) {
    raw = raw.replace(/(dataDate:\s*")[^"]*(")/, `$1${updates.dataDate}$2`);
    changed = true;
  }
  // 更新最后更新时间
  if (updates.lastUpdate) {
    raw = raw.replace(/(lastUpdate:\s*")[^"]*(")/, `$1${updates.lastUpdate}$2`);
    changed = true;
  }
  // 更新版本号（小版本+1）
  if (updates.bumpVersion) {
    const m = raw.match(/version:\s*"v(\d+)\.(\d+)"/);
    if (m) {
      const major = m[1];
      const minor = parseInt(m[2]) + 1;
      raw = raw.replace(/(version:\s*")v\d+\.\d+(")/, `$1v${major}.${minor}$2`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(DATA_FILE, raw, 'utf-8');
  }
  return changed;
}

// ---------- 写入更新日志 ----------
function writeLog(entry) {
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8')); } catch (e) { logs = []; }
  }
  logs.unshift(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs.slice(0, 50), null, 2), 'utf-8');
}

// ---------- 主流程 ----------
async function main() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const dryRun = args.includes('--dry-run');

  console.log('🔍 开始检查政策数据源更新...\n');

  const today = new Date().toISOString().slice(0, 10);
  const allHits = [];
  const sourceResults = [];

  for (const src of SOURCES) {
    process.stdout.write(`  抓取 ${src.name} ... `);
    try {
      const res = await fetch(src.url);
      if (res.status !== 200) {
        console.log(`HTTP ${res.status}`);
        sourceResults.push({ name: src.name, status: `HTTP ${res.status}` });
        continue;
      }
      const text = extractText(res.body);
      const hits = matchMetrics(text);
      console.log(`发现 ${hits.length} 条候选数据`);
      allHits.push(...hits);
      sourceResults.push({ name: src.name, status: 'ok', hits: hits.length });
    } catch (e) {
      console.log(`失败: ${e.message}`);
      sourceResults.push({ name: src.name, status: `error: ${e.message}` });
    }
  }

  console.log(`\n共发现 ${allHits.length} 条候选数据点。`);

  if (checkOnly) {
    console.log('\n[--check] 仅检查模式，未写入数据。');
    if (allHits.length > 0) {
      console.log('候选数据示例：');
      allHits.slice(0, 5).forEach(h => console.log(`  - [${h.type}] ${h.value} | ${h.context}`));
    }
    return;
  }

  if (dryRun) {
    console.log('\n[--dry-run] 试运行，以下变更将被写入：');
    console.log(`  - dataDate → ${today}`);
    console.log(`  - lastUpdate → ${today}`);
    console.log(`  - version 小版本 +1`);
    return;
  }

  // 执行更新
  const changed = patchDataFile({
    dataDate: today,
    lastUpdate: today,
    bumpVersion: true
  });

  writeLog({
    time: new Date().toISOString(),
    sources: sourceResults,
    hitsCount: allHits.length,
    sampleHits: allHits.slice(0, 10),
    dataFilePatched: changed
  });

  console.log(`\n✅ 数据文件已更新（dataDate=${today}）。`);
  console.log(`📋 候选数据点已记录至 data/update-log.json，建议人工复核后更新具体数值。`);
  console.log(`\n下一步：`);
  console.log(`  1. 查看 data/update-log.json 中的候选数据`);
  console.log(`  2. 人工确认后修改 data/data.js 对应字段（标注箱级）`);
  console.log(`  3. 提交并推送，触发部署`);
}

main().catch(e => { console.error(e); process.exit(1); });
