// ============================================================
// 全国电力市场规则分析 - 数据文件
// 自动更新脚本会修改此文件中的数据字段
// ============================================================

window.__DATA__ = {

  // 元信息
  meta: {
    version: "v4.16",
    dataDate: "2026-10-25",
    lastUpdate: "2026-10-25",
    sourceRepo: "policy-analysis"
  },

  // ----------------------------------------------------------
  // 导航
  // ----------------------------------------------------------
  nav: [
    { id: "overview",        label: "总览",           icon: "fa-home" },
    { id: "matrix",          label: "33省矩阵",       icon: "fa-th" },
    { id: "province",        label: "省份详情",       icon: "fa-map-marker" },
    { id: "spot",            label: "现货实效",       icon: "fa-line-chart" },
    { id: "capacity",        label: "容量机制",       icon: "fa-battery-full" },
    { id: "ancillary",       label: "辅助服务",       icon: "fa-wrench" },
    { id: "renewable",       label: "新能源入市",     icon: "fa-leaf" },
    { id: "interprovincial", label: "省间与全国",     icon: "fa-exchange" },
    { id: "ledger",          label: "数据台账",       icon: "fa-book" }
  ],

  // ----------------------------------------------------------
  // 一、总览
  // ----------------------------------------------------------
  overview: {
    intro: "统一市场、两级运作：全国统一电力市场顶层设计 → 区域市场（南方区域/省间/京津冀）→ 33个省级市场。本台以六维红绿灯梳理省级规则，以两大中央文件（136/114号文）为主线。",

    readingNote: {
      title: "价差数据三层视角读法",
      subtitle: "阅读说明 · 引自《电价三层视角与价差审计专题报告》（2026-09-20）",
      views: [
        { name: "上帝视角＝理论上限", desc: "全分辨率×事后全知：回答\"池子有多大\"——市场设计坐标，本身不产生收益，但没有它不知道天花板在哪。", color: "god" },
        { name: "执行视角＝含摩擦的真实结算", desc: "全分辨率×事前有限信息：回答\"你能舀走多少\"——含预测误差、偏差考核、申报规则与运行约束的真实现金流。", color: "exec" },
        { name: "经评视角＝年化均值", desc: "年化平滑×事后：回答\"值多少钱、能否融资\"——波动现金流翻译成资本的通用货币（IRR/融资对齐的定价坐标系）。", color: "eval" }
      ],
      reminder: "本站引用的价差类数字均标注所属视角与分母口径，跨视角数字不可直接比较。三个视角两两的gap本身即信息——捕获率＝执行÷上帝（团队能力）、波动率红利＝上帝÷经评（分布价值）、资本故事距离＝执行÷经评。页内核心价差锚点已按此三色徽章打标（绿=上帝 / 琥珀=执行 / 蓝=经评，悬停看定义）。"
    },

    kpis: [
      { value: "11家",   label: "省级现货正式运行｜晋粤鲁甘蒙西鄂浙+冀南网皖闽陕" },
      { value: "18个",   label: "省级市场连续结算试运行｜另南方区域五省区统一出清" },
      { value: "31省",   label: "已开展机制电价竞价｜累计宣布规模约2200亿kWh" },
      { value: "13省",   label: "出台容量补偿/容量电价政策｜114号文后5省细则落地" },
      { value: "262.5",  unit: "元/MWh", view: "god",  label: "2026年7月2h储能价差理论收益｜同比-14.4%，环比-9.0%" },
      { value: "90.9%/91.4%", label: "2026H1风电/光伏利用率｜同比-2.3/-2.6pct，三年连降" }
    ],

    architecture: {
      title: "三层市场架构",
      layers: [
        { name: "全国统一市场", level: "中央文件层", desc: "基本规则体系136/114/394/196号文" },
        { name: "区域+省间",     level: "跨省资源配置层", desc: "南方区域连续运行 省间现货规则获批 京津冀模拟" },
        { name: "33个省级市场",  level: "价格发现层", desc: "11家正式 21家试运行 西藏未开展" }
      ],
      source: "架构与转正信息源：国家发改委394号文（2025-04）、国办发〔2026〕4号、各省发改委转正通知、电力行业公开报道（时点2026-10）。"
    },

    policyChain: {
      title: "五大中央文件传导链",
      files: [
        { name: "136号文", full: "发改价格〔2025〕136号", date: "2025-02", mechanism: "新能源全部电量入市，机制电价差价结算，存量/增量竞价", target: "新能源场站/投资方/售电公司" },
        { name: "114号文", full: "发改价格〔2026〕114号", date: "2026-01-30", mechanism: "首次确立独立储能容量电价（按顶峰能力折算+清单制）；煤电容量回收比例≥50%；可靠容量补偿机制", target: "储能/煤电/气电/抽蓄" },
        { name: "4号文", full: "国办发〔2026〕4号", date: "2026-02-08", mechanism: "完善全国统一电力市场体系实施意见：现货市场2027年前基本实现正式运行；2030年市场化交易电量占比约70%", target: "各级政府/市场经营主体" },
        { name: "394号文", full: "发改办体改〔2025〕394号", date: "2025-04-29", mechanism: "现货市场建设时间表：2025底全覆盖；鄂浙转正、皖陕2026-06前转正等", target: "省级市场/交易机构" },
        { name: "196号文", full: "发改价格〔2024〕196号", date: "2024-02-08", mechanism: "辅助服务价格机制：调频里程单一制、上限0.015元/kW、费用传导规则", target: "调频/备用/调峰市场主体" }
      ]
    },

    spotTimeline: {
      title: "省级现货市场转正时间线（截至2026-10-12，共11家）",
      text: "转正名单：山西(2023-12)、广东(2023-12)、山东(2024-06)、甘肃(2024-09)、蒙西(2025)、湖北(2025-06-06)、浙江(2025-08-08)、河北南网(2026-08-01，冀发改运行〔2026〕719号)、安徽(2026-09-09)、陕西(2026-09-29，全国第10)、福建(2026-09-30，闽发改电力〔2026〕406号，全国第11)。国办发〔2026〕4号明确：现货市场2027年前基本实现正式运行。"
    }
  },

  // ----------------------------------------------------------
  // 二、33省规则矩阵
  // ----------------------------------------------------------
  matrix: {
    intro: "六维：①现货状态 ②中长期市场 ③辅助服务 ④容量机制 ⑤储能准入 ⑥新能源入市。绿=机制成熟/已落地，琥珀=试运行/建设中，灰=未开展/待出。点击省份行进入详情。",
    note: "口径说明：「受电型省份」（京津）未独立建设省级现货，按灰标注；河北分南网/冀北、蒙东/蒙西分计，共33个省级市场。单元格为框架级判定，细则参数见省份详情与数据台账。储能准入判定：绿=已出台正式文件允许独立储能入市并在运行（基于475号文5MW/10MWh准入框架+114号文容量电价清单制），琥珀=调峰等辅助服务试运行或规则试行中，灰=尚无省级准入安排。",
    dims: ["现货状态", "中长期市场", "辅助服务", "容量机制", "储能准入", "新能源入市"],
    // 状态：green / amber / gray
    provinces: [
      { name: "山西",       spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      { name: "广东",       spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      { name: "山东",       spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      { name: "甘肃",       spot:"green", mid:"green", anc:"green", cap:"gray",  storage:"green", renew:"green" },
      { name: "蒙西",       spot:"green", mid:"green", anc:"green", cap:"gray",  storage:"green", renew:"green" },
      { name: "湖北",       spot:"green", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "浙江",       spot:"green", mid:"green", anc:"amber", cap:"gray",  storage:"green", renew:"green" },
      { name: "河北南网",   spot:"green", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      { name: "安徽",       spot:"green", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      { name: "福建",       spot:"green", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "陕西",       spot:"green", mid:"green", anc:"green", cap:"amber", storage:"amber", renew:"green" },
      { name: "宁夏",       spot:"amber", mid:"green", anc:"green", cap:"gray",  storage:"green", renew:"green" },
      { name: "青海",       spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      { name: "新疆",       spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      { name: "蒙东",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "河北冀北",   spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "四川",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "云南",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "贵州",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "广西",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "海南",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "黑龙江",     spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "吉林",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "辽宁",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"green", renew:"green" },
      { name: "江苏",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "上海",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "北京",       spot:"gray",  mid:"green", anc:"amber", cap:"gray",  storage:"gray",  renew:"green" },
      { name: "天津",       spot:"gray",  mid:"green", anc:"amber", cap:"gray",  storage:"gray",  renew:"green" },
      { name: "河南",       spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      { name: "湖南",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "江西",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "重庆",       spot:"amber", mid:"green", anc:"amber", cap:"gray",  storage:"amber", renew:"green" },
      { name: "西藏",       spot:"gray",  mid:"gray",  anc:"gray",  cap:"gray",  storage:"gray",  renew:"gray"  }
    ]
  },

  // ----------------------------------------------------------
  // 三、省份详情（33省全量：六维规则卡 + 机制电价锚点 + 参数加深）
  // ----------------------------------------------------------
  provinces: {
    "山西": {
      name: "山西", spotSince: "2023-12",
      dims: { spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      mechPrice: { pv: "0.3168", wind: "0.2770" },
      highlights: [
        "全国首批现货正式运行省份，市场成熟度高",
        "2026Q2策略价差250~400元/MWh区间",
        "一次调频6元/MW固定补偿+二次5~10元竞价",
        "2026Q1储能总收益反推约1000万元（全国最高）"
      ],
      params: ["现货：正式运行，负电价出清空间", "调频：一调6元/MW固定+二调5~10元竞价", "容量机制：已出台省级政策"],
      anchors: [
        { label: "2h储能价差理论收益", value: "452", unit: "元/MWh", view: "god", box: "gray", source: "行业测算2026-07" }
      ]
    },
    "河北南网": {
      name: "河北南网", spotSince: "2026-08-01",
      dims: { spot:"green", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3344", wind: "0.3530" },
      highlights: ["冀发改运行〔2026〕719号，2026-08-01转正式运行（全国第8）", "容量补偿政策已出台"],
      params: ["2025-03-01启动连续结算试运行，历时17个月转正"],
      anchors: []
    },
    "冀北": {
      name: "冀北", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3520", wind: "0.3470" },
      highlights: ["冀北电网独立市场，与河北南网分列"],
      params: [],
      anchors: []
    },
    "北京": {
      name: "北京", spotSince: "未开展",
      dims: { spot:"red", mid:"green", anc:"gray", cap:"gray", storage:"gray", renew:"amber" },
      mechPrice: { pv: "0.3598", wind: "0.3598" },
      highlights: ["本地电源体量小，以中长期+省间受电为主"],
      params: [],
      anchors: []
    },
    "天津": {
      name: "天津", spotSince: "未开展",
      dims: { spot:"red", mid:"green", anc:"gray", cap:"gray", storage:"gray", renew:"amber" },
      mechPrice: { pv: "0.3200", wind: "0.3196" },
      highlights: ["现货尚未开展，中长期市场为主"],
      params: [],
      anchors: []
    },
    "山东": {
      name: "山东", spotSince: "2024-06",
      dims: { spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      mechPrice: { pv: "0.2610", wind: "0.3100" },
      highlights: [
        "2026Q2 2h储能季度收益215.54万元/站",
        "调频里程申报价上限12元/MW、下限0.1元/MW",
        "2h→4h收益倍率超1.80",
        "光伏机制电价0.2610元/kWh接近竞价下限（全国低位）"
      ],
      params: ["现货：正式运行，午间深谷负电价常见", "调频里程：0.1~12元/MW", "容量补偿：已出台"],
      anchors: []
    },
    "上海": {
      name: "上海", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.4155", wind: "0.4155" },
      highlights: ["机制电价0.4155元/kWh触顶（全国最高，燃煤基准价最高）"],
      params: [],
      anchors: []
    },
    "江苏": {
      name: "江苏", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3600", wind: "0.3600" },
      highlights: ["负荷大省，现货连续结算试运行中"],
      params: [],
      anchors: []
    },
    "浙江": {
      name: "浙江", spotSince: "2025-08-08",
      dims: { spot:"green", mid:"green", anc:"amber", cap:"gray", storage:"green", renew:"green" },
      mechPrice: { pv: "0.3816", wind: "0.3816" },
      highlights: ["2025-08-08正式转正", "2026年机制电价竞价已组织（光伏/风电分类出清）", "电网侧独立储能正式入市：商业运营统调储能参与现货+调频，非统调仅现货（浙江能源监管办2026年通知）"],
      params: ["竞价平台：集中式走新能源云平台，分布式走网上国网App", "储能以自计划方式参与，按日选择电能量或调频市场；未按储能身份注册的原则上不予调用"],
      anchors: []
    },
    "安徽": {
      name: "安徽", spotSince: "2026-09-09",
      dims: { spot:"green", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3837", wind: "0.3840" },
      highlights: [
        "2026-09-09转正式运行",
        "容量电价正式文：皖发改价格〔2026〕526号，165元/kW·年、T=6h，2027-01-01执行",
        "容量电费月内两次未达标扣10%、三次扣50%、四次及以上扣100%",
        "2027年起一般及大型工商业分布式光伏不再纳入机制电价（修订征求意见稿）"
      ],
      params: ["容量电价：165元×（放电时长÷6h），清单制，按月计算滚动清算", "储能充放电价：按节点市场规则执行"],
      anchors: []
    },
    "福建": {
      name: "福建", spotSince: "2026-09-30",
      dims: { spot:"green", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3500", wind: "0.3500", note: "海上光伏单独0.388" },
      highlights: [
        "2026-09-30转正式运行，全国第11家（闽发改电力〔2026〕406号）",
        "15分钟滚动出清、调频与电能量独立出清",
        "1-8月用户侧市场交易结算电量1689.9亿kWh，占全社会用电量69.3%",
        "清洁能源发电占比55.33%（1-8月）"
      ],
      params: ["现货：15分钟滚动出清", "省间：闽粤联网通道参与跨经营区绿电交易"],
      anchors: []
    },
    "江西": {
      name: "江西", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3330", wind: "0.3650" },
      highlights: ["赣发改价管〔2026〕512号修订竞价细则：工商业分布式保留竞价资格，60%边际入选门槛，取消履约保函"],
      params: [],
      anchors: []
    },
    "湖北": {
      name: "湖北", spotSince: "2025-06-06",
      dims: { spot:"green", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3330", wind: "0.3870" },
      highlights: ["2025-06-06正式转正（全国第6）"],
      params: [],
      anchors: []
    },
    "湖南": {
      name: "湖南", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3750", wind: "0.3300" },
      highlights: ["现货连续结算试运行中", "储能准入规则已印发试行：新型储能纳入市场注册经营主体，现货细则含独立储能运行参数章节（2025-11系列规则解读）"],
      params: [],
      anchors: []
    },
    "河南": {
      name: "河南", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.2760", wind: "0.3040" },
      highlights: ["容量电价330元/kW·年（征求意见稿，灰箱管理）", "豫发改价管〔2025〕902号：新能源2026-01-01起全面入市，存量机制电量比例80%"],
      params: ["存量机制电价：按现行燃煤发电基准价执行"],
      anchors: []
    },
    "辽宁": {
      name: "辽宁", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"green", renew:"green" },
      mechPrice: { pv: "0.3000", wind: "0.3300" },
      highlights: ["东北风电机制电价集体修复，吉林/辽宁容量电价330~370元/kW·年属全国最高档", "独立储能全电量入市：可自主选择报量报价竞价或报量不报价自调度模式，按自然年选择（辽发改〔2026〕支持新型储能健康发展通知）"],
      params: ["现货：东北区域市场框架下运行", "储能不受中长期合约缺额约束，全电量参与现货出清并优先出清"],
      anchors: []
    },
    "吉林": {
      name: "吉林", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3340", wind: "0.2500" },
      highlights: ["容量电价330~370元/kW·年全国最高档（东北）"],
      params: [],
      anchors: []
    },
    "黑龙江": {
      name: "黑龙江", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.2281", wind: "0.2845" },
      highlights: [
        "2026Q2策略价差421.48元/MWh",
        "Q2储能收益311.75万元/站（全国居首）",
        "风电机制电价0.2845元/kWh（+24.7%，东北集体修复）"
      ],
      params: [],
      anchors: []
    },
    "蒙东": {
      name: "蒙东", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "政策口径不设", wind: "政策口径不设" },
      highlights: ["2h储能7月价差587元/MWh（理论收益样本最高）", "暂未安排新增项目参与机制竞价"],
      params: [],
      anchors: []
    },
    "蒙西": {
      name: "蒙西", spotSince: "2025",
      dims: { spot:"green", mid:"green", anc:"green", cap:"gray", storage:"green", renew:"green" },
      mechPrice: { pv: "政策口径不设", wind: "政策口径不设" },
      highlights: [
        "现货上下限差5206元/MWh（深度负电价空间）",
        "调频市场约12亿盘子，35%份额摊薄约300万元/站",
        "2h→4h收益倍率超1.80"
      ],
      params: ["现货：全国首批转正，负电价下限深"],
      anchors: []
    },
    "陕西": {
      name: "陕西", spotSince: "2026-09-29",
      dims: { spot:"green", mid:"green", anc:"green", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3500", wind: "0.3520" },
      highlights: [
        "2026-09-29转正式运行，全国第10家（全年无休/全电量出清/全主体参与）",
        "容量电价165元/kW·年、T=6h，2026-08-01执行（2h储能实得55元）",
        "独立储能日均充放电价差约0.4元/kWh",
        "新能源利用率稳定保持93%"
      ],
      params: [
        "现货：申报/出清0~1000元/MWh（2026-01-01起）",
        "调频：0~15元/MW，新型主体中标合计≤35%",
        "报量报价主体容量占比66.3%（燃煤72台3296万kW+新能源366站3213万kW）"
      ],
      anchors: [
        { label: "独立储能日均充放电价差", value: "0.4", unit: "元/kWh", view: "exec", box: "white", source: "国网陕西电力2026-09" }
      ]
    },
    "甘肃": {
      name: "甘肃", spotSince: "2024-09",
      dims: { spot:"green", mid:"green", anc:"green", cap:"gray", storage:"green", renew:"green" },
      mechPrice: { pv: "0.2447", wind: "0.2440" },
      highlights: [
        "行政分时峰谷差0.1399元 vs 现货350元/MWh（剪刀差典型）",
        "100MW储能调频年实测收入约170万元（广发证券2025）",
        "2026Q2策略价差250~400元/MWh区间",
        "2027上半年机制电量翻倍至30亿kWh（风17/光13）"
      ],
      params: ["现货限价：随运营规则", "调频：实测约170万元/100MW·年", "2025年全部企业报最低限价，机制电量保障比例极低"],
      anchors: []
    },
    "青海": {
      name: "青海", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.2400", wind: "0.2400" },
      highlights: ["T=8h下2h储能容量电费仅拿38元（名义185元/kW·年）"],
      params: ["现货：申报/出清80~650元/MWh、二级限价300元/MWh", "中长期：月内D-2连续开市", "辅助服务：调峰/调频补偿制为主"],
      anchors: []
    },
    "宁夏": {
      name: "宁夏", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"green", cap:"gray", storage:"green", renew:"green" },
      mechPrice: { pv: "0.2595", wind: "0.2595" },
      highlights: [
        "100MW储能调频年实测约70万元",
        "2h→4h收益倍率1.87（全国最高）",
        "区内市场化规模约1020亿千瓦时，24时段分时签约",
        "独立储能正式准入：上下网电量独立分时计量，分别以发电/用户身份参与市场（2026年中长期交易通知）"
      ],
      params: ["现货：连续结算试运行V2.0（2026-04-01起）", "调频：5~15元/MW，日前+日内15分钟出清"],
      anchors: []
    },
    "新疆": {
      name: "新疆", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"amber", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.1500", wind: "0.2300", note: "2027H1批次：光伏0.259/风电0.23" },
      highlights: [
        "容量电价细则落地：煤电165元/kW·年为基础，储能按放电时长÷6h折算，2026-06-01执行",
        "光伏机制电价0.15元/kWh触及全国下限；2027H1批次光伏0.259（+73%，以价换量退潮）",
        "7月储能价差135元/MWh（最低样本）",
        "峰时段早于谷时段（光伏高占比特殊价差结构）"
      ],
      params: ["现货：连续结算试运行", "容量电价：165元×（放电时长÷6h），清单制", "辅助服务：西北区域调频", "监管：新疆能监办约谈12家违规储能企业（超计划充放电）"],
      anchors: []
    },
    "西藏": {
      name: "西藏", spotSince: "未开展",
      dims: { spot:"gray", mid:"amber", anc:"gray", cap:"gray", storage:"gray", renew:"amber" },
      mechPrice: { pv: "0.3500", wind: "0.3500" },
      highlights: ["全国唯一未开展现货的省级市场", "1-2月风电利用率67.5%/光伏60.8%（全国最低）"],
      params: [],
      anchors: []
    },
    "广东": {
      name: "广东", spotSince: "2023-12",
      dims: { spot:"green", mid:"green", anc:"green", cap:"amber", storage:"green", renew:"green" },
      mechPrice: { pv: "0.3600", wind: "不参与竞价（政策口径）" },
      highlights: [
        "南方区域核心市场，参与南方区域统一出清",
        "现货上限1899/下限-50元/MWh，设0.695元/kWh二级限价熔断",
        "2026H1储能/抽蓄现货平均价差约0.2元/kWh（广东电力交易中心半年报告）",
        "10-10启动2026年竞价：分布式0.20~0.40元/kWh、79.34亿kWh/年、12年"
      ],
      params: ["现货：上限1899/下限-50元/MWh", "二级限价熔断：0.695元/kWh", "陆上风电不参与机制电价竞价"],
      anchors: [
        { label: "储能/抽蓄现货平均价差", value: "0.2", unit: "元/kWh", view: "exec", box: "white", source: "广东电力交易中心2026H1" }
      ]
    },
    "广西": {
      name: "广西", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3100", wind: "0.3550" },
      highlights: ["南方区域市场成员，参与区域统一出清", "工商业分布式光伏2027年起不纳入机制电价（竞价新规）"],
      params: [],
      anchors: []
    },
    "云南": {
      name: "云南", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3290", wind: "0.3350" },
      highlights: ["南方区域市场成员；绿电经闽粤联网送长三角"],
      params: [],
      anchors: []
    },
    "贵州": {
      name: "贵州", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3450", wind: "0.3350" },
      highlights: ["南方区域市场成员"],
      params: [],
      anchors: []
    },
    "海南": {
      name: "海南", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3998", wind: "0.3998" },
      highlights: ["2026Q2策略价差437.48元/MWh（披露精确值）", "Q2储能收益230.78万元/站"],
      params: [],
      anchors: []
    },
    "四川": {
      name: "四川", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3730", wind: "0.3930" },
      highlights: ["水电大省，丰枯价差结构特殊"],
      params: [],
      anchors: []
    },
    "重庆": {
      name: "重庆", spotSince: "试运行",
      dims: { spot:"amber", mid:"green", anc:"amber", cap:"gray", storage:"amber", renew:"green" },
      mechPrice: { pv: "0.3963", wind: "0.3961" },
      highlights: ["机制电价0.3963元/kWh接近上限（风/光竞价上限0.3964）"],
      params: [],
      anchors: []
    }
  },

  // ----------------------------------------------------------
  // 四、现货市场与运行实效
  // ----------------------------------------------------------
  spot: {
    intro: "价差是储能最直接的收益来源。以下均为实测/测算锚点，注意「策略价差（全知视角理论最大）」≠「到手价差（五层收窄后净口径）」。2026年Q3数据持续更新中。",

    q2strategy: {
      title: "2026Q2 各省策略价差（2h储能，全知视角，元/MWh）",
      source: "源：飔合科技《2026年Q2独立储能电站各省收益测算》（北极星电力网2026-08-10转载）。海南437.48、黑龙江421.48为披露精确值；250~400档6省（山西/山东/吉林/蒙东/河北南网/陕西）以区间带呈现；低于250档20省不逐一点绘。",
      data: [
        { province: "海南", value: 437.48, exact: true },
        { province: "黑龙江", value: 421.48, exact: true },
        { province: "山西", range: "250~400" },
        { province: "山东", range: "250~400" },
        { province: "吉林", range: "250~400" },
        { province: "蒙东", range: "250~400" },
        { province: "河北南网", range: "250~400" },
        { province: "陕西", range: "250~400" }
      ]
    },

    q3monthly: {
      title: "2026年Q3 各省储能价差月度数据（2h，元/MWh）",
      source: "源：广东电力交易中心月报（2026-08/09）、新浪财经·电力现货市场价格周报（2026.9.14-9.27）、甘肃能源监管办（2026-05）、山东发改委（2026-09）。Q3全国月均价差环比Q2小幅回升，但甘肃仍仅130元/MWh、广东8月日前232元/MWh。",
      items: [
        { province: "广东", period: "8月日前", value: "232", unit: "元/MWh", view: "exec", box: "白", note: "日前市场放电-充电平均价差0.2318元/kWh" },
        { province: "广东", period: "8月实时", value: "204", unit: "元/MWh", view: "exec", box: "白", note: "实时市场放电-充电平均价差0.2037元/kWh" },
        { province: "广东", period: "H1结算", value: "130", unit: "元/MWh", view: "exec", box: "白", note: "半年报总结算价差0.1301元/kWh；充电0.3455/放电0.4756" },
        { province: "青海", period: "8月", value: "170", unit: "元/MWh", view: "exec", box: "白", note: "储能充电82元/放电252元，价差0.17元/kWh（青海电力交易中心）" },
        { province: "青海", period: "7月", value: "190", unit: "元/MWh", view: "exec", box: "白", note: "充放电价差0.19元/kWh（7月结算通报）" },
        { province: "山西", period: "9月(9.14-9.20)", value: "260~656", unit: "元/MWh", view: "exec", box: "白", note: "日前出清260~498/实时出清276~656元/MWh" },
        { province: "山西", period: "9月(9.21-9.27)", value: "308~609", unit: "元/MWh", view: "exec", box: "白", note: "日前出清308~451/实时出清328~609元/MWh" },
        { province: "山西", period: "2024年抽蓄", value: "194", unit: "元/MWh", view: "exec", box: "白", note: "抽水蓄能年抽发电价差194元/MWh（晋能源议函29号）" },
        { province: "辽宁", period: "9月(9.21-9.27)", value: "-47~398", unit: "元/MWh", view: "exec", box: "白", note: "日前-47~390/实时-42~398，出现负电价" },
        { province: "辽宁", period: "日前/实时均价", value: "314/259", unit: "元/MWh", view: "exec", box: "白", note: "日前0.314/实时0.259元/kWh（辽宁省发改委）" },
        { province: "蒙西", period: "9月(9.14-9.20)", value: "145~586", unit: "元/MWh", view: "exec", box: "白", note: "发电侧实时加权均价区间" },
        { province: "蒙西", period: "9月(9.21-9.27)", value: "315~472", unit: "元/MWh", view: "exec", box: "白", note: "发电侧实时加权均价区间" },
        { province: "山东", period: "9月(9.21-9.27)", value: "349~477", unit: "元/MWh", view: "exec", box: "白", note: "实时发电侧算术均价区间" },
        { province: "甘肃", period: "2026年度", value: "约130", unit: "元/MWh", view: "exec", box: "白", note: "充放电价差仅130元/MWh（甘肃能源监管办）" },
        { province: "陕西", period: "日均", value: "约400", unit: "元/MWh", view: "exec", box: "白", note: "独立储能日均充放电价差约0.4元/kWh" },
        { province: "浙江", period: "调峰补偿", value: "160", unit: "元/MWh", view: "exec", box: "白", note: "华东两个细则：新型储能调峰补偿160元/MWh" }
      ]
    },

    julTheory: {
      title: "2026年7月 储能价差理论收益实测（2h，元/MWh）",
      source: "源：行业测算（雪球转载，2026-08-25）。全国月均262.5元/MWh（同比-14.4%）；蒙东587、山西452为全国前二；新疆135为最低样本。8月上半月环比持平未见回升。9月最新：蒙西发电侧实时145~586元/MWh（周报），山东349~477元/MWh。",
      national: { value: "262.5", view: "god", yoy: "-14.4%", mom: "-9.0%" },
      top: [
        { province: "蒙东", value: 587 },
        { province: "山西", value: 452 }
      ],
      low: [
        { province: "新疆", value: 135 }
      ]
    },

    peakValley: {
      title: "现货分时均价峰谷差 vs 行政分时峰谷差（元/MWh）",
      source: "源：落基山研究所《2026电力市场化改革与电价体系洞察》（2026-05）+山东省发改委9月新规。山东10月起深谷下浮90%/尖峰上浮100%，最大行政峰谷价差近1000元/MWh；全国峰谷价差>0.7元/kWh的省份达12个。多数省份行政分时峰谷差大于现货均价峰谷差——行政/现货剪刀差是测算第一大误判源（甘肃行政0.1399元 vs 现货350元/MWh）。"
    },

    priceLimit: {
      title: "现货市场出清价格上下限（元/MWh）",
      source: "源：RMI同报告+南方区域2026方案+山东2026征求意见稿。蒙西上下限差5206元/MWh（深度负电价空间）；南方区域广东上限1899/下限-50元/MWh，另设0.695元/kWh二级限价熔断；山东拟将出清下限降至-140元/MWh（较现行降40元），上限保持1500元/MWh。",
      items: [
        { province: "蒙西", upper: "—", lower: "—", diff: 5206, note: "深度负电价空间" },
        { province: "广东（南方区域）", upper: 1899, lower: -50, note: "另设0.695元/kWh二级限价熔断" },
        { province: "山东（征求意见）", upper: 1500, lower: -140, note: "出清下限拟降40元；申报下限-120元/MWh" }
      ]
    }
  },

  // ----------------------------------------------------------
  // 运行实效专项
  // ----------------------------------------------------------
  performance: {
    title: "运行实效专项（v3.5）",
    intro: "储能侧实测：策略价差（全知视角理论最大）→循环次数→收益→倍率；新能源侧：利用率与弃电。收益口径=电能量毛收入，不含输配电费/系统运行费/政府性基金（充电侧成本另计）。Q3数据含8月月报+9月现货周报。",

    q2income: {
      title: "2026Q2 2h储能季度收益均值（万元/站，100MW口径）",
      source: "源：飔合科技Q2报告。全国区间30~312万元：黑龙江311.75居首（4月单月352.86为Q2峰值，5-6月维持290万以上）、海南230.78、山东215.54；四川30.19为全国尾部（现货曲线平稳）。",
      top: [
        { province: "黑龙江", value: 311.75 },
        { province: "海南", value: 230.78 },
        { province: "山东", value: 215.54 }
      ],
      low: [
        { province: "四川", value: 30.19 }
      ]
    },

    q3income: {
      title: "2026年Q3 储能收益月度锚点（100MW口径）",
      source: "源：广东电力交易中心8月月报、新浪财经现货周报（2026.9.14-9.27）、甘肃能源监管办、陕西日报。Q3全国价差环比Q2小幅回升，但甘肃仍仅130元/MWh；广东8月日前价差232元/MWh高于H1均值130元/MWh，储能收益环比改善。甘肃100MW/200MWh储能年化：容量1800万+电能量1500万+调频500~1000万。",
      items: [
        { province: "广东", period: "8月日前", value: "232元/MWh", detail: "日前市场放电-充电均价差0.2318元/kWh", box: "白" },
        { province: "广东", period: "8月实时", value: "204元/MWh", detail: "实时市场放电-充电均价差0.2037元/kWh", box: "白" },
        { province: "广东", period: "H1结算", value: "130元/MWh", detail: "半年报总结算价差0.1301元/kWh；充电0.3455/放电0.4756", box: "白" },
        { province: "青海", period: "8月", value: "170元/MWh", detail: "储能充电82元/放电252元，价差0.17元/kWh（青海电力交易中心）", box: "白" },
        { province: "青海", period: "7月", value: "190元/MWh", detail: "充放电价差0.19元/kWh（7月结算通报）", box: "白" },
        { province: "山西", period: "9月(9.14-9.20)", value: "260~656元/MWh", detail: "日前出清260~498/实时出清276~656元/MWh（新浪财经周报）", box: "白" },
        { province: "山西", period: "9月(9.21-9.27)", value: "308~609元/MWh", detail: "日前出清308~451/实时出清328~609元/MWh（新浪财经周报）", box: "白" },
        { province: "山西", period: "2024年抽蓄", value: "194元/MWh", detail: "抽水蓄能年抽发电价差194元/MWh（晋能源议函29号）", box: "白" },
        { province: "辽宁", period: "9月(9.21-9.27)", value: "-47~398元/MWh", detail: "日前-47~390/实时-42~398，出现负电价（新浪财经周报）", box: "白" },
        { province: "辽宁", period: "日前/实时均价", value: "314/259元/MWh", detail: "日前0.314/实时0.259元/kWh（辽宁省发改委）", box: "白" },
        { province: "甘肃", period: "2026年度", value: "130元/MWh", detail: "充放电价差仅130元/MWh（能源监管办确认）", box: "白" },
        { province: "甘肃", period: "年化收益", value: "约3800万元", detail: "容量1800万+电能量1500万+调频500~1000万（100MW口径）", box: "白" },
        { province: "陕西", period: "日均", value: "约400元/MWh", detail: "独立储能日均充放电价差约0.4元/kWh", box: "白" },
        { province: "山东", period: "9月下旬", value: "349~477元/MWh", detail: "实时发电侧算术均价区间（9.21-9.27周报）", box: "白" },
        { province: "蒙西", period: "9月中旬", value: "145~586元/MWh", detail: "发电侧实时加权均价区间（9.14-9.20周报）", box: "白" },
        { province: "蒙西", period: "9月下旬", value: "315~472元/MWh", detail: "发电侧实时加权均价区间（9.21-9.27周报）", box: "白" },
        { province: "浙江", period: "调峰补偿", value: "160元/MWh", detail: "华东两个细则：新型储能调峰补偿160元/MWh（浙江能源监管办）", box: "白" }
      ]
    },

    durationMultiplier: {
      title: "2h→4h收益倍率（Q2月均，倍率提升最高省份）",
      source: "全国多数省份倍率集中1.50~1.87区间；宁夏1.87最高，安徽/山东/蒙西/河北南网/青海均超1.80——4h系统在中西部高波动省份的增益最显著。",
      top: [
        { province: "宁夏", value: 1.87 },
        { province: "安徽", value: ">1.80" },
        { province: "山东", value: ">1.80" },
        { province: "蒙西", value: ">1.80" },
        { province: "河北南网", value: ">1.80" },
        { province: "青海", value: ">1.80" }
      ]
    },

    renewUtil: {
      title: "新能源利用率与装机数据（2026年1-8月）",
      source: "源：国家能源局发布会（2026-07-30）+9月调度会（2026-10-08）。1-8月风光累计装机19.92亿千瓦（风电6.93亿/光伏12.97亿），发电量1.71万亿kWh占比23.8%；H1风电利用率90.9%/光伏91.4%，三年连降趋势持续。光伏装机历史性超过煤电。",
      items: [
        { metric: "1-8月风光累计装机", value: "19.92亿千瓦", detail: "风电6.93亿+光伏12.97亿", box: "白" },
        { metric: "1-8月风光发电量", value: "1.71万亿kWh", detail: "占全社会用电量23.8%", box: "白" },
        { metric: "H1风电利用率", value: "90.9%", detail: "同比-2.3pct，三年连降", box: "白" },
        { metric: "H1光伏利用率", value: "91.4%", detail: "同比-2.6pct，三年连降", box: "白" },
        { metric: "光伏装机", value: "12.97亿千瓦", detail: "历史性超过煤电，成装机最大电源", box: "白" }
      ]
    },

    gridPriceNote: "输配电价背景：第四监管周期（发改价格〔2026〕1077号）自2026-08-01执行，单一制口径「电量电价及容需量电价微涨」，各省分化——充电成本结构将随8月账单落地而变动。山东10月起执行新分时电价：深谷下浮90%/尖峰上浮100%，最大峰谷价差近1元/kWh。"
  },

  // ----------------------------------------------------------
  // 五、容量电价机制
  // ----------------------------------------------------------
  capacity: {
    intro: "发改价格〔2026〕114号（2026-01-30）：首次在国家层面确立电网侧独立储能容量电价机制——以煤电容量电价标准为基础，按顶峰能力折算，清单制管理。实得=名义标准×Min(t/T,1)×(1−厂用电率)×供需系数×考核清算系数。",
    formula: "实得容量电费 ＝ 名义标准 × Min(放电时长t ÷ T值, 1) × (1−厂用电率) × 供需系数 × 考核清算系数",
    formulaNote: "名义≠实得：每一层都可能打折。最优时长≈本省T值，超过T后容量电费封顶。",
    status: {
      title: "各省容量机制状态表（截至2026-10，共13省出台政策）",
      source: "源：各省发改委正式文件+中国储能网/北极星储能网梳理（2026-10复核）。13省完整名单：鲁晋粤冀鄂青皖陕新吉辽豫琼。其中安徽（526号正式文）、陕西/新疆（细则落地）、吉林（330元对标煤电）、青海（185元可靠容量补偿）、湖北（2026-02-01执行）、海南（高质量发展通知）；辽宁370元与河南330元仍为征求意见稿——灰箱管理。",
      provinces: [
        { name: "山东", nominal: "—", T: "—", status: "鲁发改能源〔2023〕877号+鲁监能市场规〔2026〕27号；独立储能按月度可用容量获得容量补偿（非114号文固定电价模式）；充放电损耗比例18%；另设运行成本补偿（另行制定）；容量补偿费从用户侧收取按可用容量占比分配" },
        { name: "山西", nominal: "—", T: "—", status: "承接114号文框架，独立储能容量电价=煤电标准×Min(t÷T,1)×考核系数；省级清单与T值以省能源局正式通知为准（细则待披露）" },
        { name: "广东", nominal: "—", T: "—", status: "南方区域容量补偿机制；独立储能参与市场交易实施方案已发；充电视作用户缴纳线损+系统运行费，放电退减输配电费；容量补偿按可用容量分配（非固定标准模式）" },
        { name: "河北南网", nominal: "—", T: "—", status: "承接114号文；独立储能容量电价=煤电标准×Min(放电时长÷净负荷高峰时长,1)；T值与清单以省发改委正式通知为准（细则待披露）" },
        { name: "湖北", nominal: "—", T: "—", status: "鄂发改价格〔2026〕文件·2026-02-01执行（期限1年）；建立新型储能价格机制：充电按单一电量制执行输配电价，放电退减输配电费；容量电价具体标准待清单明确" },
        { name: "青海", nominal: 185, T: "8h", status: "可靠容量补偿机制；公式：实得=185×Min(t÷8,1)×(1−厂用电率)×供需系数×考核系数；2h储能实得≈38元（折算25%）" },
        { name: "安徽", nominal: 165, T: "6h", status: "正式文·皖发改价格〔2026〕526号·2027-01-01执行；公式：实得=165×Min(t÷6,1)×(1−厂用电率)×考核系数；月内2次未达标扣10%、3次扣50%、4次+扣100%；清单制管理" },
        { name: "陕西", nominal: 165, T: "6h", status: "细则落地·2026-08-01执行；公式：实得=165×Min(t÷6,1)×(1−厂用电率)×考核系数；2h储能实得≈55元（折算33%）；月内2次未达标扣50%、3次扣100%；清单制管理" },
        { name: "新疆", nominal: 165, T: "6h", status: "细则落地·2026-06-01执行；公式：实得=165×Min(t÷6,1)×(1−厂用电率)×供需系数×考核系数；峰时段早于谷时段（光伏高占比）；充电按单一电量制、放电退减输配电费" },
        { name: "吉林", nominal: 330, T: "8h", status: "已出台·对标煤电定价；公式：实得=330×Min(t÷8,1)×(1−厂用电率)×考核系数；T=8h，2h储能折算比=2/8=25%；充电按单一电量制执行输配电价（220kV暂按110kV标准）" },
        { name: "辽宁", nominal: 370, T: "—", status: "征求意见稿·可靠容量补偿；拟公式：实得=370×Min(t÷T,1)×考核系数（T值待定）；执行期限1年；充电按单一电量制、放电退减输配电费" },
        { name: "河南", nominal: 330, T: "—", status: "征求意见稿（灰箱）；拟公式：实得=330×Min(t÷T,1)×考核系数（T值未披露）；容量收入按灰箱管理；2026-01-01新能源全面入市" },
        { name: "海南", nominal: "—", T: "—", status: "琼发改·2026-06-30高质量发展通知；规范电网侧独立储能开发秩序；承接114号文框架，容量电价=煤电标准×Min(t÷T,1)，T值与考核细则待清单明确" }
      ]
    },
    duration2h: {
      title: "2h储能的黄昏：折算比例与实得（元/kW·年）",
      source: "机构测算：青海T=8h下2h系统仅拿38元（名义185）；陕西T=6h下2h拿55元（名义165）。4小时是及格线，6~8小时是优等生。",
      items: [
        { province: "青海", nominal: 185, actual2h: 38, T: "8h" },
        { province: "陕西", nominal: 165, actual2h: 55, T: "6h" }
      ]
    }
  },

  // ----------------------------------------------------------
  // 六、辅助服务市场
  // ----------------------------------------------------------
  ancillary: {
    intro: "196号文（发改价格〔2024〕196号）确立调频里程单一制价格机制：费用=出清价×调频里程×性能系数，性能系数≤2，里程出清价上限0.015元/kW（15元/MW）。411号文（发改能源规〔2025〕411号）为辅助服务市场基本规则，明确调频/备用/爬坡/调峰等品种。调频=高单价×小蛋糕×先到先得，需求天花板≈统调负荷1~2%。",
    centralDocs: {
      title: "中央文件框架",
      items: [
        { name: "发改价格〔2024〕196号", content: "调频里程单一制；性能系数≤2；出清价上限15元/MW；费用由发电侧和用户侧共同分摊", link: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/202402/t20240208_1364053_ext.html" },
        { name: "发改能源规〔2025〕411号", content: "电力辅助服务市场基本规则：调频/备用/爬坡/调峰等品种；谁提供谁获利、谁受益谁承担", link: "https://www.gov.cn/gongbao/2025/issue_12046/202505/content_7023967.html" },
        { name: "国办发〔2026〕4号", content: "加快建设辅助服务市场；调频/备用与现货联合出清；谁受益谁承担", link: "https://www.gov.cn/zhengce/zhengceku/202602/content_7057745.htm" }
      ]
    },
    provinceTable: {
      title: "各省辅助服务市场政策汇总（截至2026-10，共21省/区域出台规则）",
      source: "源：各省级能源监管局/发改委正式文件+国家能源局网站（2026-10复核）。所有数据均来自官方文件，征求意见稿标注。",
      headers: ["省份", "市场品种", "调频里程报价上限(元/MW)", "调频里程报价下限(元/MW)", "关键规则", "文件依据", "链接"],
      items: [
        { province: "山东", varieties: "调频(二次)+爬坡", priceCap: "12", priceFloor: "0.1", keyRule: "暂仅开展调频+爬坡;分时出清;独立储能≥5MW;65座储能站已参与调频", doc: "鲁监能市场规〔2026〕27号", link: "https://sdb.nea.gov.cn/dtyw/jgdt/202608/t20260813_306666.html" },
        { province: "山西", varieties: "一次调频+二次调频", priceCap: "10", priceFloor: "5", keyRule: "一次调频6元/MW固定补偿+二次5~10元竞价;性能结算系数多级化;日级调整", doc: "山西辅助服务管理实施细则(2025修订版)", link: "https://sxb.nea.gov.cn/dtyw/jggg/202607/P020260717578288458823.pdf" },
        { province: "广东(南方区域)", varieties: "调频+备用+调峰", priceCap: "15", priceFloor: "3", keyRule: "南方区域统一出清;申报3~15元/MW;未报价者默认缺省价", doc: "南方区域电力辅助服务管理实施细则", link: "https://nfj.nea.gov.cn/nfjdoc/094364aa-4189-4425-9070-25721e8e7ed7.pdf" },
        { province: "蒙西", varieties: "调频+备用", priceCap: "15", priceFloor: "2", keyRule: "分时段报价(00-04时2~15元);储能中标容量20~100MW;与现货联合出清", doc: "蒙西电力市场调频辅助服务交易实施细则", link: "https://hbj.nea.gov.cn/hdhy/dczj/202603/P020260306570347717550.pdf" },
        { province: "甘肃", varieties: "调频+调峰", priceCap: "15", priceFloor: "0", keyRule: "周前申报96点调频里程报价;水电参与需考虑水位;储能优先出清调峰", doc: "甘肃省电力辅助服务市场运营规则", link: "https://gsb.nea.gov.cn/dtyw/tzgg/202512/P020251230719917589465.pdf" },
        { province: "宁夏", varieties: "调频", priceCap: "15", priceFloor: "0", keyRule: "征求意见稿;出清价≤15元/MW;性能指标高者优先出清", doc: "宁夏电力调频辅助服务市场实施细则(征求意见稿)", link: "https://xbj.nea.gov.cn/dtyw/tzgg/202606/P020260610323688884140.pdf" },
        { province: "青海", varieties: "调频+调峰", priceCap: "10", priceFloor: "0", keyRule: "里程报价0~10元/MW;综合调频性能<0.5不予补偿;储能中标容量≤总需求50%", doc: "青海调频辅助服务市场规则", link: "https://finance.sina.com.cn/roll/2026-10-10/doc-iniutqmf6010808.shtml.md" },
        { province: "新疆", varieties: "调峰+调频", priceCap: "—", priceFloor: "—", keyRule: "调峰报价0~0.262元/kWh;独立储能优先出清调峰;容量电价165元/T=6h", doc: "新疆电力辅助服务市场实施细则", link: "https://xjb.nea.gov.cn/dtyw/tzgg/202507/P020250711373969759217.pdf" },
        { province: "陕西", varieties: "调频", priceCap: "15", priceFloor: "0", keyRule: "0~15元/MW;特殊时段动态调减/释放调频备用容量;与现货市场衔接", doc: "陕西电力调频辅助服务市场实施细则", link: "https://xbj.nea.gov.cn/xxgk/zcjd/202605/t20260529_302139.html" },
        { province: "安徽", varieties: "调频", priceCap: "15", priceFloor: "—", keyRule: "试行;调频里程单一制;AGC/APC跟踪指令;与现货市场衔接", doc: "安徽电力调频辅助服务市场实施细则(试行)", link: "https://hdj.nea.gov.cn/xxgk/zcjd/202609/t20260915_308772.html" },
        { province: "上海", varieties: "调频", priceCap: "—", priceFloor: "—", keyRule: "征求意见稿;华东局管辖;适应新型电力系统需要", doc: "上海电力调频辅助服务市场实施细则(征求意见稿)", link: "https://hdj.nea.gov.cn/dtyw/tzgg/202609/t20260930_309757.html" },
        { province: "江苏", varieties: "调频", priceCap: "15", priceFloor: "—", keyRule: "新版细则2026-05-01正式施行;与现货市场有序衔接;模拟试运行后转正式", doc: "江苏调频辅助服务市场工作指引", link: "https://jsb.nea.gov.cn/dtyw/jgdt/202605/t20260508_300757.html" },
        { province: "浙江", varieties: "调频", priceCap: "15", priceFloor: "—", keyRule: "调频容量需求100万kW;性能指标准入门槛0.4;3.0版细则", doc: "浙江电力调频辅助服务市场交易实施细则(3.0版)", link: "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2792/site/attach/0/57e089330fe94909889e06b06057d20f.pdf" },
        { province: "福建", varieties: "调频+备用+调相", priceCap: "6", priceFloor: "—", keyRule: "快速/慢速分区;报价上限6元/MW;储能出清容量≤总需求30%;取消深度调峰补偿", doc: "福建省电力调频辅助服务市场交易实施细则(2026修订版)", link: "https://www.nea.gov.cn/20260403/9decdfbf9c38443d9ab8ffb080dd377c/c.html" },
        { province: "湖北", varieties: "调频", priceCap: "15", priceFloor: "6", keyRule: "征求意见稿(与江西/重庆联合发布);申报15/6元/MW;未申报默认6元", doc: "湖北/江西/重庆电力调频辅助服务市场运行规则(征求意见稿)", link: "https://hzj.nea.gov.cn/dtyw/tzgg/202411/P020241120517351562242.pdf" },
        { province: "江西", varieties: "调频", priceCap: "15", priceFloor: "5", keyRule: "征求意见稿;申报15/5元/MW;水电/火电/储能均可参与", doc: "江西电力调频辅助服务市场交易规则(征求意见稿)", link: "https://hzj.nea.gov.cn/UploadFiles/2022/59061656069746019_1c2f061e-2485-4fbd-9439-e128db317279.pdf" },
        { province: "重庆", varieties: "调频", priceCap: "15", priceFloor: "6", keyRule: "征求意见稿(与湖北/江西联合发布);申报15/6元/MW", doc: "湖北/江西/重庆电力调频辅助服务市场运行规则(征求意见稿)", link: "https://hzj.nea.gov.cn/dtyw/tzgg/202411/P020241120517351562242.pdf" },
        { province: "湖南", varieties: "调频+备用", priceCap: "—", priceFloor: "—", keyRule: "V2.0版;调频与现货单独出清;储能≥15MW/1h;费用分摊与传导", doc: "湖南省电力调频辅助服务市场交易实施细则(V2.0)", link: "https://hunb.nea.gov.cn/xxgk/zcjd/202607/t20260724_305341.html" },
        { province: "河南", varieties: "调频+备用+爬坡", priceCap: "—", priceFloor: "—", keyRule: "征求意见稿;调频/备用/爬坡/黑启动品种;适用于现货运行后", doc: "河南省电力辅助服务市场实施细则(征求意见稿)", link: "https://xcoss.henan.gov.cn/typtfile/20260805/666ee4a2ded14c73b026f622d4add60d.pdf" },
        { province: "四川", varieties: "调频+调峰", priceCap: "—", priceFloor: "—", keyRule: "2026-05-01执行;水电为主的调频/调峰管理;储能可参与", doc: "四川省电力辅助服务管理实施细则", link: "https://scb.nea.gov.cn/dtyw/tzgg/202604/P020260413395067315497.pdf" },
        { province: "吉林", varieties: "调频", priceCap: "—", priceFloor: "—", keyRule: "试行4.1版;集中竞价;辅助服务品种总需求确定后出清", doc: "吉林省电力辅助服务(调频)市场实施细则(试行4.1版)", link: "https://nyj.jl.gov.cn/hdjl/dczj/202603/P020260317567581880021.pdf" }
      ]
    },
    incomeAnchors: {
      title: "100MW独立储能站年调频收入实测锚点（万元/年）",
      source: "源：广发证券2025实测（甘肃170万/宁夏70万）、山西2026Q1总收益反推约1000万（全国最高）、蒙西12亿盘子×35%份额摊薄约300万。反高估纪律：禁止「价格上限×理论调用频次」外推（国能日新甘肃38次/天→3745万 vs 实测170万，高估22倍）。",
      items: [
        { province: "甘肃", value: 170, box: "white" },
        { province: "宁夏", value: 70, box: "white" },
        { province: "山西", value: 1000, box: "gray", note: "Q1总收益反推" },
        { province: "蒙西", value: 300, box: "gray", note: "盘子份额摊薄" }
      ]
    }
  },

  // ----------------------------------------------------------
  // 七、新能源入市
  // ----------------------------------------------------------
  renewable: {
    intro: "发改价格〔2025〕136号（2025-01-27印发）：新能源原则上全部电量入市，存量/增量项目机制电价差价结算。截至2026-10，31省级行政区机制电价全覆盖（蒙东/蒙西为政策口径不设）。据《中国新能源发电分析报告2026》：全国参与竞价装机2.2亿千瓦——风电申报1.2亿/中标6850万千瓦，光伏申报1亿/中标6521万千瓦；2026年实际参与竞价的分布式光伏仅430万千瓦、中标250万千瓦（约为全年预计新增5%）。2026-10-10广东启动新一轮机制电价竞价（分布式光伏79.34亿kWh/年，区间0.20~0.40元/kWh，期限12年）。",
    mechanismPrice: {
      title: "各省机制电价竞价结果·光伏vs风电（元/kWh，截至2026-10，白箱标源/灰箱标注）",
      note: "全国区间：光伏0.15~0.4155、风电0.1954~0.4155（《中国新能源发电分析报告2026》）；上海0.4155触顶（燃煤基准价最高）、重庆0.3963、广东首轮分布式0.36；新疆光伏0.259/风电0.23、甘肃风电触及下限；东北风电集体修复：黑龙江0.2845(+24.7%)。机制执行年限普遍10~12年，部分海上风电延至14~15年。蒙西/蒙东政策口径不设机制电价；广东陆上风电不参与竞价。引用前务必复核最新批次。"
    },
    utilization: {
      title: "消纳实况：利用率逐年回落",
      source: "源：国家能源局（2026-04-27一季度发布会、2026-07-30上半年发布会、2026-10-08月度调度会）。2026Q1风电91.4%、光伏90.6%；2026H1风电90.9%、光伏91.4%（同比-2.3/-2.6pct，连续三年回落）；1-8月风光累计装机19.92亿千瓦（风6.93亿/光12.97亿），占总装机48.5%，光伏装机历史性超过煤电；风光发电量1.71万亿kWh，占全社会用电量23.8%。注：①Q2单季利用率国家能源局未单独披露，Q2≈H1（累计口径）；②官方Q3（1-9月）利用率数据待三季度新闻发布会发布（预计2026年10月下旬）。",
      history: [
        { period: "2024全年", wind: "95.9%", solar: "96.8%" },
        { period: "2025全年", wind: "94.3%", solar: "94.8%" },
        { period: "2026Q1",   wind: "91.4%", solar: "90.6%" },
        { period: "2026Q2(累计)", wind: "90.9%", solar: "91.4%", yoy: "-2.3/-2.6pct" },
        { period: "2026H1",   wind: "90.9%", solar: "91.4%", yoy: "-2.3/-2.6pct" }
      ]
    }
  },

  // ----------------------------------------------------------
  // 八、省间与全国统一市场
  // ----------------------------------------------------------
  interprovincial: {
    intro: "省间现货+省间中长期+区域市场是全国统一市场的三根支柱。2026年主线索：省间现货规则获批、南方区域转入正式运行方案、京津冀模拟试运行启动。",
    blocks: {
      title: "三大省间/区域板块",
      items: [
        { name: "南方区域市场", desc: "五省区统一出清，转入正式运行方案" },
        { name: "省间现货市场", desc: "规则获批，跨省资源配置" },
        { name: "京津冀市场",   desc: "模拟试运行启动" }
      ]
    },
    roadmap: {
      title: "全国统一市场建设路标（394号文+国办发4号文+蓝皮书）",
      milestones: [
        { time: "2025底", event: "现货市场全覆盖" },
        { time: "2026-02", event: "国办发〔2026〕4号：完善全国统一电力市场体系实施意见" },
        { time: "2026-08", event: "河北南网转正" },
        { time: "2026-09", event: "安徽(09-09)、陕西(09-29)、福建(09-30)密集转正，共11家" },
        { time: "2027前", event: "现货市场基本实现正式运行（4号文目标）" },
        { time: "2030", event: "基本建成全国统一电力市场体系，市场化交易电量占比约70%" }
      ]
    }
  },

  // ----------------------------------------------------------
  // 九、数据台账
  // ----------------------------------------------------------
  ledger: {
    intro: "本台所有关键数字的溯源登记。白箱=官方一手或≥2独立权威信源；灰箱=单一二手/行业通行推断；黑箱=待核实。v2.7起增列「视角×分母口径」两列：上帝=理论上限/规则边界、执行=含摩擦的真实结算、经评=年化均值坐标；非价差类标\"—\"，分母无公开口径的标[口径待核实]。",
    entries: [
      { metric: "7月2h储能价差理论收益", value: "262.5元/MWh", view: "上帝", denom: "7月均值", box: "灰", source: "行业测算（雪球转载2026-08-25）；9月最新周报见蒙西条目" },
      { metric: "蒙西9月现货发电侧实时均价区间", value: "145~586元/MWh", view: "执行", denom: "9.14-9.20周", box: "白", source: "新浪财经·电力现货市场价格周报(2026.9.14-9.20)" },
      { metric: "蒙西9月下旬现货发电侧均价区间", value: "315~472元/MWh", view: "执行", denom: "9.21-9.27周", box: "白", source: "新浪财经·电力现货市场价格周报(2026.9.21-9.27)" },
      { metric: "甘肃2026年储能充放电价差", value: "约130元/MWh", view: "执行", denom: "年度均值", box: "白", source: "甘肃能源监管办（2026-05-15）" },
      { metric: "广东2026H1储能/抽蓄现货平均价差", value: "约0.2元/kWh", view: "执行", denom: "2026H1均值", box: "白", source: "广东电力交易中心《2026广东电力市场半年报告》" },
      { metric: "广东2025年储能/抽蓄现货平均价差", value: "约0.15元/kWh", view: "执行", denom: "2025全年均值", box: "白", source: "南网储能投资者关系活动记录(2026-09-04)" },
      { metric: "陕西独立储能日均充放电价差", value: "约0.4元/kWh", view: "执行", denom: "日均", box: "白", source: "国网陕西电力（陕西日报2026-10-06）" },
      { metric: "2026H1风电利用率", value: "90.9%", view: "执行", denom: "上半年累计", box: "白", source: "国家能源局（2026-07-30发布会）" },
      { metric: "2026H1光伏利用率", value: "91.4%", view: "执行", denom: "上半年累计", box: "白", source: "国家能源局（2026-07-30发布会）" },
      { metric: "2026年1-8月风光累计装机", value: "19.92亿千瓦", view: "执行", denom: "1-8月累计", box: "白", source: "国家能源局9月调度会（2026-10-08）" },
      { metric: "2026年1-8月风光发电量占比", value: "23.8%", view: "执行", denom: "1-8月累计/全社会用电量", box: "白", source: "国家能源局9月调度会（2026-10-08）" },
      { metric: "2026年1-8月电力市场交易电量增速", value: "+19.2%", view: "执行", denom: "1-8月同比", box: "白", source: "国家能源局（2026-10-09）" },
      { metric: "机制电价竞价参与规模", value: "2.2亿千瓦", view: "执行", denom: "累计", box: "白", source: "《中国新能源发电分析报告2026》" },
      { metric: "山东10月起分时电价最大峰谷价差", value: "约1.0元/kWh", view: "执行", denom: "尖峰vs深谷", box: "白", source: "山东省发改委（2026-09-07）；深谷下浮90%/尖峰上浮100%" },
      { metric: "山西2h储能价差", value: "452元/MWh", view: "上帝", denom: "7月均值", box: "灰", source: "行业测算" },
      { metric: "蒙东2h储能价差", value: "587元/MWh", view: "上帝", denom: "7月均值", box: "灰", source: "行业测算" },
      { metric: "甘肃100MW储能调频年收入", value: "170万元", view: "执行", denom: "年", box: "白", source: "广发证券2025实测" },
      { metric: "宁夏100MW储能调频年收入", value: "70万元", view: "执行", denom: "年", box: "白", source: "广发证券2025实测" },
      { metric: "山西储能调频年收入", value: "约1000万元", view: "执行", denom: "年", box: "灰", source: "2026Q1总收益反推" },
      { metric: "青海2h储能容量电费实得", value: "38元/kW·年", view: "执行", denom: "年", box: "灰", source: "机构测算（185元×25%折算）" },
      { metric: "陕西2h储能容量电费实得", value: "55元/kW·年", view: "执行", denom: "年", box: "灰", source: "机构测算（165元×33%折算）" },
      { metric: "安徽储能容量电价", value: "165元/kW·年(T=6h)", view: "执行", denom: "年", box: "白", source: "皖发改价格〔2026〕526号" },
      { metric: "黑龙江Q2储能收益", value: "311.75万元/站", view: "执行", denom: "Q2·100MW", box: "白", source: "飔合科技Q2报告" }
    ]
  },

  // ----------------------------------------------------------
  // 版本路标
  // ----------------------------------------------------------
  versions: [
    { version: "v4.2", date: "2026-10-13", changes: "消纳实况补充2026Q2（累计口径）行；注明Q2单季利用率官方未单独披露，Q2≈H1。" },
    { version: "v4.0", date: "2026-10-13", changes: "消纳实况板块补充2026Q1官方利用率数据（风电91.4%/光伏90.6%），数据来源补充一季度发布会（2026-04-27）；注：官方Q3（1-9月）利用率数据待国家能源局三季度新闻发布会发布（预计2026年10月下旬）。" },
    { version: "v3.9", date: "2026-10-13", changes: "储能准入维度核实更新：浙江（电网侧独立储能入市通知，商业运营储能参与现货+调频）、辽宁（支持新型储能健康发展通知，全电量报量报价/报量不报价双模式）、宁夏（2026年中长期通知，发电/用户双身份准入）由琥珀升绿；修正上海矩阵与详情不一致（现货/储能准入统一为试运行琥珀）；口径说明补充储能准入三色判定标准（475号文+114号文框架）。" },
    { version: "v3.7", date: "2026-10-12", changes: "现货实效Q3数据省份数量翻倍：Q3月度价差从8条增至16条，新增青海8月170/7月190、山西9月260~656/308~609/2024抽蓄194、辽宁9月-47~398/314/259均价、浙江调峰补偿160；Q3收益锚点同步扩至17条（含广东H1结算130）。覆盖省份从5个增至9个（粤青晋辽蒙鲁甘陕浙）。" },
    { version: "v3.6", date: "2026-10-12", changes: "现货实效板块全面更新：新增Q3月度价差数据表（广东8月日前232/实时204、蒙西9月145~586/315~472、山东9月349~477、甘肃130、陕西400）；新增Q3收益月度锚点（甘肃年化3800万=容量1800+电能量1500+调频500~1000）；新增新能源利用率区块（1-8月装机19.92亿kW/发电量1.71万亿kWh占比23.8%）；出清上下限新增山东征求意见稿（下限拟降至-140元/MWh）。" },
    { version: "v3.5", date: "2026-10-12", changes: "数据台账扩容：从15条增至23条；新增蒙西9月现货周报(白箱)、甘肃储能年度价差130元(白箱)、广东2025年价差0.15元(白箱)、1-8月风光装机/发电量/交易电量增速(白箱)、山东10月分时电价最大价差约1元(白箱)；补充利用率/装机数据的视角和分母口径。" },
    { version: "v3.4", date: "2026-10-12", changes: "辅助服务板块全面重构：新增中央文件框架（196/411/4号文）；省份政策表从4条扩至21省/区域全量，每省含品种/报价上下限/关键规则/文件依据/链接7列。" },
    { version: "v3.3", date: "2026-10-12", changes: "表头'政策详情'改为'储能政策详情'；山东政策详情全面更正（鲁发改能源877号+鲁监能市场规27号，月度可用容量补偿模式非114号固定电价）；13省政策详情补充充放电价机制、清单管理、考核规则等细节。" },
    { version: "v3.2", date: "2026-10-12", changes: "容量机制表表头'状态'改为'政策详情'；每省列出具体容量电价计算公式（含名义标准、T值、折算比例、考核规则）。" },
    { version: "v3.1", date: "2026-10-12", changes: "容量机制状态表补齐至13省全量（新增湖北/吉林/辽宁/海南4省）；省份排序调整为先出台先列。" },
    { version: "v3.0", date: "2026-10-12", changes: "省份详情扩容至33省全量：每省含六维规则卡+机制电价锚点（光伏/风电，对齐原系统数值）+参数加深（现货限价/调频/容量标准）+规则要点+价差锚点；卡片与弹窗展示机制电价。" },
    { version: "v2.9", date: "2026-10-12", changes: "数据时点改为动态显示当天日期；新增陕西(第10家)、福建(第11家)现货转正，共11家；政策链新增国办发〔2026〕4号文（五大文件）；安徽容量电价转正式文（皖发改价格〔2026〕526号）；新疆容量电价细则落地；更新机制电价竞价全国数据（2.2亿千瓦）及1-8月新能源装机数据；系统更名为「全国电力市场规则分析」。" },
    { version: "v2.8", date: "2026-09-19", changes: "新增福建转正（全国第10）、河北南网转正信息；更新7月价差数据；容量机制增至13省。" },
    { version: "v2.7", date: "2026-08", changes: "数据台账增列「视角×分母口径」两列；价差锚点按三色徽章打标。" },
    { version: "v2.0", date: "2026-07", changes: "重构六维红绿灯矩阵；新增运行实效专项板块。" },
    { version: "v1.2", date: "2026-06", changes: "运行实效专项上线。" },
    { version: "v1.0", date: "2026-05", changes: "首版上线。" }
  ]

};
