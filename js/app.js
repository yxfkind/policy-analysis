// ============================================================
// 全国电力市场规则分析 - 前端渲染逻辑
// ============================================================

const D = window.__DATA__;

// ---------- 工具函数 ----------
const viewBadge = (v) => {
  if (!v) return '';
  const map = {
    god:  '<span class="badge badge-god" title="上帝视角=理论上限">上帝</span>',
    exec: '<span class="badge badge-exec" title="执行视角=含摩擦的真实结算">执行</span>',
    eval: '<span class="badge badge-eval" title="经评视角=年化均值">经评</span>'
  };
  return map[v] || '';
};

const boxTag = (b) => {
  if (!b) return '';
  const map = {
    white: '<span class="box-white">[白箱]</span>',
    gray:  '<span class="box-gray">[灰箱]</span>',
    black: '<span class="box-black">[黑箱]</span>'
  };
  return map[b] || '';
};

const dot = (color) => {
  const map = { green: 'dot-green', amber: 'dot-amber', gray: 'dot-gray' };
  return `<span class="dot ${map[color] || 'dot-gray'}"></span>`;
};

const card = (html, cls = 'card') => `<div class="${cls}">${html}</div>`;

// ---------- 导航 ----------
function renderNav() {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = D.nav.map(n =>
    `<button class="nav-btn" data-view="${n.id}" onclick="switchView('${n.id}')">
      <i class="fa ${n.icon}"></i> ${n.label}
    </button>`
  ).join('');
}

function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  document.getElementById('view-' + id).classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === id);
  });
  location.hash = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- 总览 ----------
function renderOverview() {
  const o = D.overview;
  const html = `
    <div class="card-soft mb-6">
      <p class="text-gray-700">${o.intro}</p>
    </div>

    <div class="card mb-6">
      <h3 class="sub-title"><i class="fa fa-bookmark-o text-brand-green"></i> ${o.readingNote.title}</h3>
      <p class="text-xs text-gray-500 mb-3">${o.readingNote.subtitle}</p>
      <div class="grid md:grid-cols-3 gap-3 mb-4">
        ${o.readingNote.views.map(v => `
          <div class="bg-white border border-cream-200 rounded-lg p-3">
            <div class="font-semibold text-sm mb-1">${v.name} ${viewBadge(v.color)}</div>
            <p class="text-xs text-gray-600 leading-relaxed">${v.desc}</p>
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-600 bg-amber-50 border-l-4 border-amber-400 p-2 rounded">
        <i class="fa fa-exclamation-triangle text-amber-500"></i> ${o.readingNote.reminder}
      </p>
    </div>

    <h2 class="section-title">核心指标速览</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      ${o.kpis.map(k => `
        <div class="kpi-card">
          <div class="kpi-value">${k.value}${k.unit ? ' <span class="text-sm font-normal text-gray-500">' + k.unit + '</span>' : ''} ${viewBadge(k.view)}</div>
          <div class="kpi-label">${k.label}</div>
        </div>
      `).join('')}
    </div>

    <h2 class="section-title">${o.architecture.title}</h2>
    <div class="card mb-6">
      <div class="flex flex-col md:flex-row items-stretch gap-2">
        ${o.architecture.layers.map((l, i) => `
          <div class="flex-1 bg-white border border-cream-200 rounded-lg p-4 text-center">
            <div class="text-brand-green font-bold">${l.name}</div>
            <div class="text-xs text-gray-500 my-1">${l.level}</div>
            <div class="text-sm text-gray-700">${l.desc}</div>
          </div>
          ${i < o.architecture.layers.length - 1 ? '<div class="flow-arrow md:flex-col justify-center"><i class="fa fa-arrow-right md:fa-arrow-down"></i></div>' : ''}
        `).join('')}
      </div>
      <p class="text-xs text-gray-500 mt-3">${o.architecture.source}</p>
    </div>

    <h2 class="section-title">${o.policyChain.title}</h2>
    <div class="policy-chain mb-6">
      ${o.policyChain.files.map(f => `
        <div class="policy-card">
          <div class="font-bold text-brand-dark">${f.name}</div>
          <div class="text-xs text-gray-500 mb-2">${f.full} · ${f.date}</div>
          <div class="text-sm text-gray-700 mb-2">${f.mechanism}</div>
          <div class="text-xs text-brand-light"><i class="fa fa-users"></i> ${f.target}</div>
        </div>
      `).join('')}
    </div>

    <h2 class="section-title">${o.spotTimeline.title}</h2>
    <div class="card">
      <p class="text-gray-700">${o.spotTimeline.text}</p>
    </div>
  `;
  document.getElementById('view-overview').innerHTML = html;
}

// ---------- 33省矩阵 ----------
function renderMatrix() {
  const m = D.matrix;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${m.intro}</p>
    </div>
    <div class="card mb-4">
      <p class="text-xs text-gray-500">${m.note}</p>
    </div>
    <div class="flex flex-wrap gap-4 mb-3 text-sm">
      <span>${dot('green')}机制成熟/已落地</span>
      <span>${dot('amber')}试运行/建设中</span>
      <span>${dot('gray')}未开展/待出</span>
    </div>
    <div class="card overflow-x-auto">
      <table class="data-table">
        <thead>
          <tr>
            <th>省份</th>
            ${m.dims.map(d => `<th class="text-center">${d}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${m.provinces.map(p => `
            <tr class="province-row" onclick="openProvince('${p.name}')">
              <td class="font-semibold text-brand-dark">${p.name}</td>
              <td class="text-center">${dot(p.spot)}</td>
              <td class="text-center">${dot(p.mid)}</td>
              <td class="text-center">${dot(p.anc)}</td>
              <td class="text-center">${dot(p.cap)}</td>
              <td class="text-center">${dot(p.storage)}</td>
              <td class="text-center">${dot(p.renew)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('view-matrix').innerHTML = html;
}

// ---------- 省份详情 ----------
function renderProvince() {
  const names = Object.keys(D.provinces);
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">六维规则卡 + 机制电价/价差锚点。箱级标注：绿字=白箱（官方/权威信源），琥珀字=灰箱（二手转述/推断），灰字=黑箱（待核实）。</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${names.map(n => {
        const p = D.provinces[n];
        const dimLabels = ['现货','中长期','辅助服务','容量','储能','新能源'];
        const dimKeys = ['spot','mid','anc','cap','storage','renew'];
        return `
          <div class="card cursor-pointer hover:shadow-md transition" onclick="openProvince('${n}')">
            <div class="flex justify-between items-center mb-2">
              <div class="font-bold text-brand-dark text-lg">${p.name}</div>
              <div class="text-xs text-gray-500">现货：${p.spotSince}</div>
            </div>
            <div class="grid grid-cols-6 gap-1 mb-2 text-center text-xs">
              ${dimKeys.map((k, i) => `
                <div class="flex flex-col items-center">
                  <span class="dot ${k==='spot'?'dot-'+p.dims.spot:k==='mid'?'dot-'+p.dims.mid:k==='anc'?'dot-'+p.dims.anc:k==='cap'?'dot-'+p.dims.cap:k==='storage'?'dot-'+p.dims.storage:'dot-'+p.dims.renew}"></span>
                  <span class="text-gray-500 mt-0.5">${dimLabels[i]}</span>
                </div>
              `).join('')}
            </div>
            <div class="text-xs mb-2 bg-cream-50 rounded px-2 py-1 border border-cream-200">
              <span class="text-gray-500">机制电价：</span><span class="font-semibold text-brand-dark">光 ${p.mechPrice ? p.mechPrice.pv : '—'}</span> <span class="text-gray-400">/</span> <span class="font-semibold text-brand-dark">风 ${p.mechPrice ? p.mechPrice.wind : '—'}</span>
            </div>
            <ul class="text-xs text-gray-600 space-y-0.5">
              ${p.highlights.slice(0, 2).map(h => `<li>• ${h}</li>`).join('')}
            </ul>
          </div>
        `;
      }).join('')}
    </div>
  `;
  document.getElementById('view-province').innerHTML = html;
}

// ---------- 省份弹窗 ----------
function openProvince(name) {
  const p = D.provinces[name];
  if (!p) {
    alert(`${name} 详情待补充`);
    return;
  }
  document.getElementById('modal-title').textContent = `${p.name} · 省份详情`;
  const dimLabels = ['现货状态','中长期市场','辅助服务','容量机制','储能准入','新能源入市'];
  const dimKeys = ['spot','mid','anc','cap','storage','renew'];
  document.getElementById('modal-body').innerHTML = `
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
      ${dimKeys.map((k, i) => `
        <div class="bg-white border border-cream-200 rounded p-2 text-center">
          <div>${dot(p.dims[k])}</div>
          <div class="text-xs text-gray-600 mt-1">${dimLabels[i]}</div>
        </div>
      `).join('')}
    </div>

    <h4 class="font-bold text-brand-dark mb-2">机制电价锚点（元/kWh）</h4>
    <div class="card mb-4">
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div class="flex justify-between py-1 border-b border-cream-200"><span class="text-gray-600">光伏</span><span class="font-bold text-brand-dark">${p.mechPrice ? p.mechPrice.pv : '—'}</span></div>
        <div class="flex justify-between py-1 border-b border-cream-200"><span class="text-gray-600">风电</span><span class="font-bold text-brand-dark">${p.mechPrice ? p.mechPrice.wind : '—'}</span></div>
      </div>
      ${p.mechPrice && p.mechPrice.note ? `<p class="text-xs text-gray-500 mt-2">注：${p.mechPrice.note}</p>` : ''}
    </div>

    ${p.params && p.params.length ? `
      <h4 class="font-bold text-brand-dark mb-2">参数加深</h4>
      <ul class="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-1">
        ${p.params.map(x => `<li>${x}</li>`).join('')}
      </ul>
    ` : ''}

    <h4 class="font-bold text-brand-dark mb-2">关键要点</h4>
    <ul class="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-1">
      ${p.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>

    ${p.anchors.length ? `
      <h4 class="font-bold text-brand-dark mb-2">价差/收益锚点</h4>
      <div class="card">
        ${p.anchors.map(a => `
          <div class="flex justify-between items-center py-1 border-b border-cream-200 last:border-0">
            <span class="text-sm">${a.label}</span>
            <span class="font-bold text-brand-dark">${a.value} ${a.unit} ${viewBadge(a.view)} ${boxTag(a.box)}</span>
          </div>
        `).join('')}
        <p class="text-xs text-gray-500 mt-2">源：${p.anchors[0].source}</p>
      </div>
    ` : ''}
  `;
  document.getElementById('province-modal').classList.remove('hidden');
  document.getElementById('province-modal').classList.add('flex');
}

function closeProvinceModal() {
  document.getElementById('province-modal').classList.add('hidden');
  document.getElementById('province-modal').classList.remove('flex');
}

// ---------- 现货市场 ----------
function renderSpot() {
  const s = D.spot;
  const pf = D.performance;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${s.intro}</p>
    </div>

    <h2 class="section-title">${s.q2strategy.title}</h2>
    <div class="card mb-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        ${s.q2strategy.data.map(d => `
          <div class="bg-cream-100 rounded p-2 text-center">
            <div class="font-bold text-brand-dark">${d.province}</div>
            <div class="text-sm text-gray-700">${d.exact ? d.value : d.range}</div>
            <div class="text-xs text-gray-500">元/MWh</div>
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-500">${s.q2strategy.source}</p>
    </div>

    <h2 class="section-title">${s.q3monthly.title}</h2>
    <div class="card mb-4 overflow-x-auto">
      <table class="data-table text-sm">
        <thead><tr><th>省份</th><th>时段</th><th>价差/区间</th><th>视角</th><th>箱</th><th>备注</th></tr></thead>
        <tbody>
          ${s.q3monthly.items.map(it => `
            <tr>
              <td class="font-semibold whitespace-nowrap">${it.province}</td>
              <td class="whitespace-nowrap">${it.period}</td>
              <td class="font-bold text-brand-dark">${it.value} ${it.unit}</td>
              <td>${viewBadge(it.view)}</td>
              <td>${boxTag(it.box)}</td>
              <td class="text-xs text-gray-600">${it.note}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500 mt-2">${s.q3monthly.source}</p>
    </div>

    <h2 class="section-title">${s.julTheory.title}</h2>
    <div class="card mb-4">
      <div class="kpi-card text-center mb-3 inline-block">
        <div class="kpi-value">${s.julTheory.national.value} <span class="text-sm text-gray-500">元/MWh</span> ${viewBadge(s.julTheory.national.view)}</div>
        <div class="kpi-label">全国月均｜同比 ${s.julTheory.national.yoy}，环比 ${s.julTheory.national.mom}</div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <div class="text-sm font-semibold text-green-700 mb-1">全国前二</div>
          ${s.julTheory.top.map(t => `<div class="flex justify-between text-sm py-1 border-b border-cream-200"><span>${t.province}</span><span class="font-bold">${t.value} 元/MWh</span></div>`).join('')}
        </div>
        <div>
          <div class="text-sm font-semibold text-gray-600 mb-1">最低样本</div>
          ${s.julTheory.low.map(t => `<div class="flex justify-between text-sm py-1 border-b border-cream-200"><span>${t.province}</span><span class="font-bold">${t.value} 元/MWh</span></div>`).join('')}
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-3">${s.julTheory.source}</p>
    </div>

    <h2 class="section-title">${s.peakValley.title}</h2>
    <div class="card mb-4">
      <p class="text-sm text-gray-700">${s.peakValley.source}</p>
    </div>

    <h2 class="section-title">${s.priceLimit.title}</h2>
    <div class="card mb-4 overflow-x-auto">
      <table class="data-table">
        <thead><tr><th>省份/区域</th><th>上限</th><th>下限</th><th>上下限差</th><th>备注</th></tr></thead>
        <tbody>
          ${s.priceLimit.items.map(it => `
            <tr>
              <td>${it.province}</td>
              <td>${it.upper ?? '—'}</td>
              <td>${it.lower ?? '—'}</td>
              <td class="font-bold text-brand-dark">${it.diff ?? '—'}</td>
              <td class="text-xs text-gray-600">${it.note || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500 mt-2">${s.priceLimit.source}</p>
    </div>

    <h2 class="section-title">${pf.title}</h2>
    <div class="card-soft mb-4">
      <p class="text-sm text-gray-700">${pf.intro}</p>
    </div>

    <h3 class="sub-title">${pf.q2income.title}</h3>
    <div class="card mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
        ${pf.q2income.top.map(t => `
          <div class="bg-green-50 border border-green-200 rounded p-3 text-center">
            <div class="text-xs text-gray-500">${t.province}</div>
            <div class="text-xl font-bold text-green-700">${t.value}</div>
            <div class="text-xs text-gray-500">万元/站</div>
          </div>
        `).join('')}
      </div>
      <div class="text-sm text-gray-600">尾部：${pf.q2income.low.map(l => `${l.province} ${l.value}万元/站`).join('、')}</div>
      <p class="text-xs text-gray-500 mt-2">${pf.q2income.source}</p>
    </div>

    <h3 class="sub-title">${pf.q3income.title}</h3>
    <div class="card mb-4 overflow-x-auto">
      <table class="data-table text-sm">
        <thead><tr><th>省份</th><th>时段</th><th>价差/收益</th><th>箱</th><th>详情</th></tr></thead>
        <tbody>
          ${pf.q3income.items.map(it => `
            <tr>
              <td class="font-semibold whitespace-nowrap">${it.province}</td>
              <td class="whitespace-nowrap">${it.period}</td>
              <td class="font-bold text-brand-dark">${it.value}</td>
              <td>${boxTag(it.box)}</td>
              <td class="text-xs text-gray-600">${it.detail}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500 mt-2">${pf.q3income.source}</p>
    </div>

    <h3 class="sub-title">${pf.renewUtil.title}</h3>
    <div class="card mb-4">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
        ${pf.renewUtil.items.map(it => `
          <div class="bg-cream-100 rounded p-3 text-center">
            <div class="text-xs text-gray-500">${it.metric}</div>
            <div class="text-lg font-bold text-brand-dark">${it.value}</div>
            <div class="text-xs text-gray-500">${boxTag(it.box)}</div>
            <div class="text-xs text-gray-400 mt-1">${it.detail}</div>
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-500">${pf.renewUtil.source}</p>
    </div>

    <h3 class="sub-title">${pf.durationMultiplier.title}</h3>
    <div class="card mb-4">
      <div class="flex flex-wrap gap-2">
        ${pf.durationMultiplier.top.map(t => `
          <div class="bg-blue-50 border border-blue-200 rounded px-3 py-2">
            <span class="text-sm text-gray-600">${t.province}</span>
            <span class="font-bold text-blue-700 ml-2">${t.value}x</span>
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-500 mt-3">${pf.durationMultiplier.source}</p>
    </div>

    <div class="card">
      <p class="text-sm text-gray-600"><i class="fa fa-info-circle text-brand-green"></i> ${pf.gridPriceNote}</p>
    </div>
  `;
  document.getElementById('view-spot').innerHTML = html;
}

// ---------- 容量机制 ----------
function renderCapacity() {
  const c = D.capacity;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${c.intro}</p>
    </div>
    <div class="card mb-4 bg-amber-50 border-amber-200">
      <div class="font-mono text-sm text-amber-900">${c.formula}</div>
      <p class="text-xs text-amber-700 mt-2">${c.formulaNote}</p>
    </div>

    <h2 class="section-title">${c.status.title}</h2>
    <div class="card mb-4 overflow-x-auto">
      <table class="data-table">
        <thead><tr><th>省份</th><th>名义标准(元/kW·年)</th><th>T值</th><th>储能政策详情</th></tr></thead>
        <tbody>
          ${c.status.provinces.map(p => `
            <tr>
              <td class="font-semibold">${p.name}</td>
              <td>${p.nominal ?? '—'}</td>
              <td>${p.T}</td>
              <td>${p.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500 mt-2">${c.status.source}</p>
    </div>

    <h2 class="section-title">${c.duration2h.title}</h2>
    <div class="card mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${c.duration2h.items.map(it => `
          <div class="bg-white border border-cream-200 rounded p-3">
            <div class="font-bold text-brand-dark mb-2">${it.province}（T=${it.T}）</div>
            <div class="flex justify-between text-sm">
              <span>名义标准：<span class="font-bold">${it.nominal} 元/kW·年</span></span>
            </div>
            <div class="flex justify-between text-sm mt-1">
              <span>2h实得：<span class="font-bold text-red-600">${it.actual2h} 元/kW·年</span></span>
              <span class="text-xs text-gray-500">折算 ${(it.actual2h/it.nominal*100).toFixed(1)}%</span>
            </div>
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-500 mt-3">${c.duration2h.source}</p>
    </div>
  `;
  document.getElementById('view-capacity').innerHTML = html;
}

// ---------- 辅助服务 ----------
function renderAncillary() {
  const a = D.ancillary;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${a.intro}</p>
    </div>

    <h2 class="section-title">${a.centralDocs.title}</h2>
    <div class="card mb-4">
      <div class="space-y-3">
        ${a.centralDocs.items.map(d => `
          <div class="border-l-4 border-brand-mid pl-3">
            <div class="font-bold text-brand-dark">${d.name}</div>
            <div class="text-sm text-gray-600 mt-1">${d.content}</div>
            <a href="${d.link}" target="_blank" class="text-xs text-blue-600 hover:underline mt-1 inline-block">查看文件 →</a>
          </div>
        `).join('')}
      </div>
    </div>

    <h2 class="section-title">${a.provinceTable.title}</h2>
    <div class="card mb-4 overflow-x-auto">
      <table class="data-table text-sm">
        <thead><tr>
          ${a.provinceTable.headers.map(h => `<th>${h}</th>`).join('')}
        </tr></thead>
        <tbody>
          ${a.provinceTable.items.map(it => `
            <tr>
              <td class="font-semibold whitespace-nowrap">${it.province}</td>
              <td class="whitespace-nowrap">${it.varieties}</td>
              <td class="text-center">${it.priceCap}</td>
              <td class="text-center">${it.priceFloor}</td>
              <td class="text-xs">${it.keyRule}</td>
              <td class="text-xs whitespace-nowrap">${it.doc}</td>
              <td class="text-xs"><a href="${it.link}" target="_blank" class="text-blue-600 hover:underline">链接</a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500 mt-2">${a.provinceTable.source}</p>
    </div>

    <h2 class="section-title">${a.incomeAnchors.title}</h2>
    <div class="card mb-4">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        ${a.incomeAnchors.items.map(it => `
          <div class="bg-white border border-cream-200 rounded p-3 text-center">
            <div class="text-xs text-gray-500">${it.province}</div>
            <div class="text-xl font-bold text-brand-dark">${it.value}</div>
            <div class="text-xs text-gray-500">万元/年 ${boxTag(it.box)}</div>
            ${it.note ? `<div class="text-xs text-gray-400 mt-1">${it.note}</div>` : ''}
          </div>
        `).join('')}
      </div>
      <p class="text-xs text-gray-500">${a.incomeAnchors.source}</p>
    </div>
  `;
  document.getElementById('view-ancillary').innerHTML = html;
}

// ---------- 新能源入市 ----------
function renderRenewable() {
  const r = D.renewable;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${r.intro}</p>
    </div>

    <h2 class="section-title">${r.mechanismPrice.title}</h2>
    <div class="card mb-4">
      <p class="text-xs text-gray-500">${r.mechanismPrice.note}</p>
      <p class="text-sm text-gray-600 mt-3 text-center italic">各省机制电价竞价结果数据可由自动更新脚本从官方信源抓取后填入此处。</p>
    </div>

    <h2 class="section-title">${r.utilization.title}</h2>
    <div class="card mb-4">
      <table class="data-table mb-3">
        <thead><tr><th>期间</th><th>风电利用率</th><th>光伏利用率</th><th>同比</th></tr></thead>
        <tbody>
          ${r.utilization.history.map(h => `
            <tr>
              <td class="font-semibold">${h.period}</td>
              <td>${h.wind}</td>
              <td>${h.solar}</td>
              <td class="text-red-600">${h.yoy || '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p class="text-xs text-gray-500">${r.utilization.source}</p>
    </div>
  `;
  document.getElementById('view-renewable').innerHTML = html;
}

// ---------- 省间与全国 ----------
function renderInterprovincial() {
  const i = D.interprovincial;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700">${i.intro}</p>
    </div>

    <h2 class="section-title">${i.blocks.title}</h2>
    <div class="grid md:grid-cols-3 gap-3 mb-6">
      ${i.blocks.items.map(b => `
        <div class="card text-center">
          <div class="font-bold text-brand-dark text-lg mb-1">${b.name}</div>
          <div class="text-sm text-gray-600">${b.desc}</div>
        </div>
      `).join('')}
    </div>

    <h2 class="section-title">${i.roadmap.title}</h2>
    <div class="card">
      <div class="relative pl-6">
        <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-brand-green opacity-30"></div>
        ${i.roadmap.milestones.map(m => `
          <div class="relative mb-4">
            <div class="absolute -left-4 top-1.5 w-3 h-3 rounded-full bg-brand-green"></div>
            <div class="font-bold text-brand-dark">${m.time}</div>
            <div class="text-sm text-gray-700">${m.event}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('view-interprovincial').innerHTML = html;
}

// ---------- 数据台账 ----------
function renderLedger() {
  const l = D.ledger;
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700 text-sm">${l.intro}</p>
    </div>
    <div class="card overflow-x-auto">
      <table class="data-table">
        <thead>
          <tr><th>指标</th><th>数值</th><th>视角</th><th>分母口径</th><th>箱级</th><th>来源</th></tr>
        </thead>
        <tbody>
          ${l.entries.map(e => `
            <tr>
              <td class="font-semibold">${e.metric}</td>
              <td class="text-brand-dark font-bold">${e.value}</td>
              <td>${e.view}</td>
              <td>${e.denom}</td>
              <td>${boxTag(e.box === '白' ? 'white' : e.box === '灰' ? 'gray' : 'black')}</td>
              <td class="text-xs text-gray-600">${e.source}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('view-ledger').innerHTML = html;
}

// ---------- 版本路标 ----------
function renderVersions() {
  const html = `
    <div class="card-soft mb-4">
      <p class="text-gray-700 text-sm">功能上线即登记。规划内容以追加块为准。</p>
    </div>
    <div class="space-y-3">
      ${D.versions.map(v => `
        <div class="card flex gap-4">
          <div class="text-center min-w-[90px]">
            <div class="inline-block bg-brand-green text-white px-3 py-1 rounded font-bold">${v.version}</div>
            <div class="text-xs text-gray-500 mt-1">${v.date}</div>
          </div>
          <div class="flex-1 text-sm text-gray-700 pt-1">${v.changes}</div>
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('view-versions').innerHTML = html;
}

// ---------- 初始化 ----------
function init() {
  // 元信息：数据时点动态取当天日期
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById('version-badge').textContent = D.meta.version;
  document.getElementById('data-date').textContent = today;
  document.getElementById('last-update').textContent = today;

  renderNav();
  renderOverview();
  renderMatrix();
  renderProvince();
  renderSpot();
  renderCapacity();
  renderAncillary();
  renderRenewable();
  renderInterprovincial();
  renderLedger();
  renderVersions();

  // 路由
  const hash = location.hash.replace('#', '') || 'overview';
  switchView(hash);

  // 弹窗点击外部关闭
  document.getElementById('province-modal').addEventListener('click', (e) => {
    if (e.target.id === 'province-modal') closeProvinceModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
