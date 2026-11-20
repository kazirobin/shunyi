/**
  Bilingual content for the public site (English + Simplified Chinese).

  Facts come from the company's own site, https://www.shunyigarment.com/ (company profile,
  quality control, certificate, products, FAQ and contact pages). Headlines are new; facts are
  not invented. Shared, non-language data (images, contacts, partners, figures) lives in `base`.

  Note for the owners: the official Chinese company name, the Chinese characters for
  "Shunyi" / "Shunyang", and the Chinese postal address were not published on the original
  site, so they are kept in Latin script here. Replace them in `zh` when available.
*/

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

const IMG = "/images/shunyi";

export const base = {
  legal: "Zhongshan Shunyi Intelligent Protective Equipment Technology Co., Ltd",
  contact: {
    emails: ["leo@shunjiazhiyi.com", "charlson@shunjiazhiyi.com"],
    phone: "+86 153 8273 1556",
    phoneHref: "tel:+8615382731556",
    tel: "+86 760 8612 7856",
    whatsapp: "https://api.whatsapp.com/send?phone=8615382731556",
    wechat: "WX2828QT",
    address: "2nd Floor, Building 5, Zhongnan High-Tech Industrial Park, Banfu Town, Zhongshan, Guangdong, China",
  },
  social: [
    // `zh` overrides the label on the Chinese page where the platform has a Chinese name.
    { label: "LinkedIn", href: "https://www.linkedin.com/in/leo-shunyi" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100091578530583" },
    { label: "VK", href: "https://vk.com/id872020234" },
    { label: "Xiaohongshu", zh: "小红书", href: "https://www.xiaohongshu.com/user/profile/603c2c97000000000100a0d7" },
  ],
  showcase: [
    { img: `${IMG}/products/cycling-jacket.png`, tint: "#dde6ee" },
    { img: `${IMG}/products/windbreaker.jpg`, tint: "#f3ead6" },
    { img: `${IMG}/products/heated.jpg`, tint: "#f1e3dc" },
    { img: `${IMG}/products/softshell.jpg`, tint: "#e8e9e0" },
    { img: `${IMG}/products/ski-gloves.jpg`, tint: "#e3e8ee" },
  ],
  stats: [20, 10000, 210, 200],
  partners: [
    { name: "LEATT", file: "leatt", dark: true },
    { name: "Klim", file: "klim", dark: false },
    { name: "IXON", file: "ixon", dark: false },
    { name: "Yamaha", file: "yamaha", dark: true },
    { name: "100%", file: "100percent", dark: false },
    { name: "Kawasaki", file: "kawasaki", dark: true },
    { name: "Canyon", file: "canyon", dark: false },
    { name: "Scoyco", file: "scoyco", dark: true },
    { name: "SMFK", file: "smfk", dark: false },
    { name: "Motowolf", file: "motowolf", dark: true },
  ].map((p) => ({ ...p, src: `${IMG}/partners/${p.file}.jpg` })),
  range: [
    { img: `${IMG}/products/moto-pants.jpg`, size: "tall" },
    { img: `${IMG}/products/ski-wear.jpg`, size: "tall" },
    { img: `${IMG}/products/cycling-jacket.png`, size: "" },
    { img: `${IMG}/products/heated.jpg`, size: "" },
    { img: `${IMG}/products/windbreaker.jpg`, size: "" },
    { img: `${IMG}/products/cotton-gloves.jpg`, size: "" },
    { img: "", size: "text" },
    { img: "", size: "text" },
    { img: "", size: "text" },
    { img: `${IMG}/products/softshell.jpg`, size: "" },
  ],
  story: [`${IMG}/factory/ws2.jpg`, `${IMG}/factory/exh1.jpg`, `${IMG}/factory/about.jpg`],
  years: ["2004", "2014", "2021"],
  floor: [
    `${IMG}/factory/pr-tailor.jpg`,
    `${IMG}/factory/pr-prod2.jpg`,
    `${IMG}/factory/pr-insp.jpg`,
    `${IMG}/factory/pr-pack.jpg`,
    `${IMG}/factory/pr-ware.jpg`,
  ],
  quality: [`${IMG}/factory/qc-raw.jpg`, `${IMG}/factory/qc-prod.jpg`, `${IMG}/factory/qc-fin.jpg`],
  certs: ["ISO 9001", "ISO 14001", "ISO 45001", "CE"],
  links: { products: "/products", admin: "/admin/login" },
};

const en = {
  locale: "en" as Locale,
  htmlLang: "en",
  meta: {
    title: "Shunyi | Cycling, Ski, Motocross & Outdoor Apparel Manufacturer",
    description:
      "Shunyi designs and manufactures cycling, ski, motocross and outdoor apparel for brands like LEATT, FOX and Klim. OEM or ODM, from 500 pieces a style.",
  },
  nav: {
    tagline: "Sportswear manufacturer",
    links: ["What we make", "Our story", "Factory", "Quality", "FAQ"],
    products: "Products",
    cta: "Request a quote",
    open: "Open menu",
    close: "Close menu",
    home: "Shunyi, home",
  },
  hero: {
    chip: "OEM & ODM apparel manufacturer since 2004",
    title: ["Built for mud, snow", "and open road."],
    body: "Shunyi designs and manufactures cycling, ski, motocross and outdoor apparel for brands like LEATT, FOX and Klim. OEM or ODM, from 500 pieces a style.",
    cta: "Request a quote",
    secondary: "See what we make",
    showLabel: "Featured products",
    show: [
      { tab: "Riding", name: "Cycling jacket", specs: ["Abrasion-resistant elbow guards", "Water-resistant, dirt-repellent", "Removable arms"] },
      { tab: "Outdoor", name: "Waterproof windbreaker", specs: ["95% polyester, 5% spandex", "Colorfastness grade 4", "S–2XL, customizable"] },
      { tab: "Heated", name: "Women's heated jacket", specs: ["Integrated heating panels", "Hooded, windproof shell"] },
      { tab: "Softshell", name: "Softshell jacket", specs: ["Fully taped seams", "Reverse waterproof zip", "S–4XL"] },
      { tab: "Gloves", name: "Ski gloves with fingers", specs: ["Touchscreen fingertips", "Colorful choices"] },
    ],
    stats: [
      { suffix: "", label: "years making sportswear" },
      { suffix: " m²", label: "of factory floor" },
      { suffix: "", label: "people on the team" },
      { suffix: "", label: "partner brands" },
    ],
  },
  partners: "Our partners include",
  range: {
    eyebrow: "What we make",
    title: "Gear for every season and every surface.",
    body: "We're at our best on complicated garments: ultra-thin packables, softshells, fully seam-taped and laser-cut waterproof jackets.",
    items: [
      { name: "Motocross riding suits", note: "Jerseys, pants and full race kits" },
      { name: "Ski wear", note: "Ski jackets, ski pants and snowboard wear" },
      { name: "Cycling clothing", note: "Road and MTB jackets and pants" },
      { name: "Heated clothes", note: "Jackets with integrated heating" },
      { name: "Outdoor wear", note: "Outdoor jackets and pants" },
      { name: "Gloves", note: "Riding gloves and ski gloves" },
      { name: "Motorcycling apparel", note: "Riding jackets and pants" },
      { name: "Hunting wear", note: "Hunting jackets and pants" },
      { name: "Protective gear", note: "Including airbag suits and vests" },
      { name: "Jackets & padded clothes", note: "Softshells, windbreakers, cotton-padded" },
    ],
  },
  story: {
    eyebrow: "Our story",
    title: "Twenty years, three companies, one direction.",
    tablist: "Our history",
    chapters: [
      {
        title: "The first factory, in Shenzhen.",
        body: "Our founder opened his first clothing factory in the Shenzhen special economic zone, making outdoor sports, ski, motorcycle and cycling apparel.",
      },
      {
        title: "Shunjia Clothing, in Zhongshan.",
        body: "We moved to Zhongshan, Guangdong, brought R&D and production together, filed our own patents, and began making for European and American brands including LEATT, 100%, FOX, CANYON, IXON and Klim.",
      },
      {
        title: "Shunyi, and smarter protective gear.",
        body: "Shunyi Intelligent Protective Equipment was founded to take clothing toward electronics and safety: motorcycle airbag suits, airbag vests and electrically heated clothing.",
      },
    ],
    facts: [
      { k: "Factories", v: "Shunyang & Shunjia" },
      { k: "Production base", v: "Sichuan Province" },
      { k: "Floor space", v: "10,000 m²+" },
    ],
  },
  floor: {
    eyebrow: "Inside the factory",
    title: "Walk the floor.",
    body: "Five stops on our floor, from fabric to carton.",
    alt: "at the Shunyi factory",
    stops: [
      { name: "Cutting", note: "Automated cutting tables keep every panel to size and shape." },
      { name: "Sewing", note: "Long sewing lines for jackets, pants, suits and gloves." },
      { name: "Inspection", note: "Seams, tension and stitch density are checked as work moves along." },
      { name: "Packing", note: "Each finished piece is folded, bagged and labelled." },
      { name: "Warehouse", note: "Fabric in, cartons out, sorted by order." },
    ],
  },
  quality: {
    eyebrow: "Quality control",
    title: "Checked before it's cut, while it's sewn, and before it ships.",
    certsLabel: "Certifications",
    tablist: "Inspection stages",
    alt: "inspection at Shunyi",
    stages: [
      {
        tab: "Raw materials",
        checks: [
          "Fabric composition, strength and wear resistance",
          "Air permeability and water resistance",
          "Anti-static and flame-retardant functions for riding wear",
          "Zippers, buttons and sewing thread to standard",
        ],
      },
      {
        tab: "In production",
        checks: [
          "Cutting: accurate size and shape, no missed or wrong cuts",
          "Sewing: seam size, skipped stitches, tension and stitch density",
          "Adhesive lining: no peeling, bleed-through or hardening",
          "Random checks on semi-finished pieces",
        ],
      },
      {
        tab: "Finished product",
        checks: [
          "Colour and style match the drawings, with no defects",
          "Impact, water, wind and dust protection tested",
          "Reflective strips, seams, pockets, cuffs and collars",
          "Dimensions within tolerance, symmetrical parts matched",
        ],
      },
    ],
  },
  faq: {
    eyebrow: "Working with us",
    title: "Before you ask.",
    moq: ["pieces per style", "minimum order"],
    items: [
      {
        q: "What's the minimum order?",
        a: "500 pieces per style, across 2 colourways and a range of sizes. It varies by garment and project, and we can adjust it against your total volume.",
      },
      {
        q: "How quickly will you reply?",
        a: "Within 48 hours for simple inquiries, excluding weekends and holidays. Complex work like cut-and-sew or dye-sublimation printing can take up to three days.",
      },
      {
        q: "How do you price a garment?",
        a: "It depends on fabric weight, consumption, quantity and construction. Send us your spec or the fabric and we'll quote from that.",
      },
      {
        q: "Can I get samples?",
        a: "Once an order is committed we make a first pattern and a pre-production sample, and the first pattern is free above the MOQ. Before that, we can make one proto sample at a charge, which is refunded or deducted from your bulk order.",
      },
    ],
  },
  close: {
    title: "Want to learn more? Let's talk.",
    body: "Send us a spec, a sketch or a sample. We'll come back with a plan and a price.",
    email: "Email us",
    subject: "Quote request",
    whatsapp: "WhatsApp",
    labels: { email: "Email", phone: "Phone & WhatsApp", tel: "Tel", wechat: "WeChat", office: "Factory office" },
  },
  footer: {
    about: "OEM and ODM cycling, ski, motocross and outdoor apparel, made in China since 2004.",
    company: "Company",
    products: "Products",
    contact: "Contact",
    companyLinks: ["Our story", "Factory", "Quality", "FAQ"],
    productLinks: ["Cycling clothing", "Ski wear", "Motocross suits", "Heated clothes", "Gloves"],
    philosophy: "Quality, service, integrity, efficiency.",
    admin: "Admin",
  },
};

export type Dict = typeof en;

const zh: Dict = {
  locale: "zh",
  htmlLang: "zh-CN",
  meta: {
    title: "Shunyi | 骑行、滑雪、越野摩托与户外服装制造商",
    description: "Shunyi 为 LEATT、FOX、Klim 等品牌设计并生产骑行、滑雪、越野摩托及户外服装。支持 OEM 与 ODM，每款 500 件起订。",
  },
  nav: {
    tagline: "运动服装制造商",
    links: ["产品品类", "发展历程", "工厂", "质量", "常见问题"],
    products: "产品",
    cta: "获取报价",
    open: "打开菜单",
    close: "关闭菜单",
    home: "Shunyi 首页",
  },
  hero: {
    chip: "2004 年起专注 OEM / ODM 运动服装制造",
    title: ["为泥地、雪道", "与公路而生。"],
    body: "Shunyi 为 LEATT、FOX、Klim 等品牌设计并生产骑行、滑雪、越野摩托及户外服装。支持 OEM 与 ODM，每款 500 件起订。",
    cta: "获取报价",
    secondary: "查看产品品类",
    showLabel: "主打产品",
    show: [
      { tab: "骑行", name: "骑行夹克", specs: ["肘部耐磨防护膜", "防泼水、防污", "袖子可拆卸"] },
      { tab: "户外", name: "防水风衣", specs: ["95% 涤纶 / 5% 氨纶", "色牢度 4 级", "S–2XL，可定制"] },
      { tab: "发热", name: "女士发热夹克", specs: ["内置发热片", "连帽防风外壳"] },
      { tab: "软壳", name: "软壳夹克", specs: ["全压胶防水", "反向防水拉链", "S–4XL"] },
      { tab: "手套", name: "分指滑雪手套", specs: ["指尖可触屏", "多色可选"] },
    ],
    stats: [
      { suffix: "", label: "年运动服装经验" },
      { suffix: " m²", label: "厂房面积" },
      { suffix: "", label: "名专业员工" },
      { suffix: "", label: "个合作品牌" },
    ],
  },
  partners: "合作品牌包括",
  range: {
    eyebrow: "产品品类",
    title: "覆盖每个季节、每种路面的装备。",
    body: "我们最擅长复杂工艺服装：超薄可收纳款、软壳、全压胶及激光切割防水夹克。",
    items: [
      { name: "越野摩托骑行服", note: "骑行衫、骑行裤及全套赛服" },
      { name: "滑雪服", note: "滑雪夹克、滑雪裤及单板服" },
      { name: "骑行服", note: "公路与山地骑行夹克、骑行裤" },
      { name: "发热服", note: "内置发热系统的夹克" },
      { name: "户外服装", note: "户外夹克与户外裤" },
      { name: "手套", note: "骑行手套与滑雪手套" },
      { name: "摩托车骑行服", note: "摩托骑行夹克与骑行裤" },
      { name: "狩猎服", note: "狩猎夹克与狩猎裤" },
      { name: "防护装备", note: "含安全气囊服与气囊背心" },
      { name: "夹克与棉服", note: "软壳、风衣与棉服" },
    ],
  },
  story: {
    eyebrow: "发展历程",
    title: "二十年，三家公司，一个方向。",
    tablist: "发展历程",
    chapters: [
      {
        title: "在深圳创办第一家工厂。",
        body: "创始人在深圳经济特区创办了第一家服装厂，专注户外运动、滑雪、摩托车及骑行服装。",
      },
      {
        title: "在中山成立顺嘉制衣。",
        body: "我们迁至广东中山，整合研发与生产，申请自主知识产权与专利，并开始为 LEATT、100%、FOX、CANYON、IXON、Klim 等欧美品牌生产。",
      },
      {
        title: "成立 Shunyi，迈向智能防护。",
        body: "Shunyi 智能防护用品科技公司成立，推动服装向智能化、电子化与安全防护发展：摩托车安全气囊服、气囊背心与电加热服装。",
      },
    ],
    facts: [
      { k: "生产工厂", v: "Shunyang、顺嘉" },
      { k: "生产基地", v: "四川省" },
      { k: "厂房面积", v: "10,000 m² 以上" },
    ],
  },
  floor: {
    eyebrow: "走进工厂",
    title: "带你走一遍车间。",
    body: "从面料到装箱，车间里的五个环节。",
    alt: "Shunyi 工厂",
    stops: [
      { name: "裁剪", note: "自动裁床确保每一片裁片尺寸与形状准确。" },
      { name: "缝制", note: "长流水线生产夹克、裤装、套装与手套。" },
      { name: "检验", note: "生产过程中检查线迹、张力与针距密度。" },
      { name: "包装", note: "每件成品折叠、入袋并贴标。" },
      { name: "仓储", note: "面料入库，纸箱出库，按订单分拣。" },
    ],
  },
  quality: {
    eyebrow: "质量控制",
    title: "裁剪前、缝制中、出货前，层层把关。",
    certsLabel: "认证",
    tablist: "检验环节",
    alt: "Shunyi 质量检验",
    stages: [
      {
        tab: "原材料",
        checks: ["面料成分、强度与耐磨性", "透气性与防水性", "骑行服的防静电与阻燃性能", "拉链、纽扣与缝纫线符合标准"],
      },
      {
        tab: "生产过程",
        checks: ["裁剪：尺寸与形状准确，无漏裁、错裁", "缝制：线迹规格、跳针、张力与针距密度", "粘衬：无脱胶、渗胶或发硬", "半成品随机抽检"],
      },
      {
        tab: "成品",
        checks: ["颜色与款式与图纸一致，无瑕疵", "测试抗冲击、防水、防风与防尘性能", "检查反光条、线缝、口袋、袖口与领口", "尺寸在公差范围内，对称部位一致"],
      },
    ],
  },
  faq: {
    eyebrow: "合作须知",
    title: "你可能想问。",
    moq: ["件 / 款", "起订量"],
    items: [
      {
        q: "最小起订量是多少？",
        a: "每款 500 件，可分 2 个颜色及不同尺码。具体视服装与项目而定，也可根据您的总订单量调整。",
      },
      {
        q: "多久能回复？",
        a: "简单询价 48 小时内回复（周末及节假日除外）。裁剪缝制或热升华印花等复杂需求最多需要三天。",
      },
      {
        q: "如何报价？",
        a: "价格取决于面料克重、用量、数量与工艺。请发送您的规格书或面料，我们据此报价。",
      },
      {
        q: "可以打样吗？",
        a: "订单确认后，我们会制作首版与产前样；订单超过起订量时首版免费。确认订单前，可付费制作一件原型样，费用可退还或在大货中抵扣。",
      },
    ],
  },
  close: {
    title: "想了解更多？我们聊聊。",
    body: "发来您的规格书、草图或样衣，我们会给出方案与报价。",
    email: "发送邮件",
    subject: "询价",
    whatsapp: "WhatsApp",
    labels: { email: "邮箱", phone: "电话与 WhatsApp", tel: "座机", wechat: "微信", office: "工厂办公室" },
  },
  footer: {
    about: "OEM / ODM 骑行、滑雪、越野摩托及户外服装制造商，2004 年创立于中国。",
    company: "公司",
    products: "产品",
    contact: "联系我们",
    companyLinks: ["发展历程", "工厂", "质量控制", "常见问题"],
    productLinks: ["骑行服", "滑雪服", "越野摩托服", "发热服", "手套"],
    philosophy: "品质、服务、诚信、高效。",
    admin: "管理后台",
  },
};

const DICTS: Record<Locale, Dict> = { en, zh };

export const getDict = (locale: Locale): Dict => DICTS[locale];

/** Path for the home page in a locale. English is the default and lives at "/". */
export const homePath = (locale: Locale) => (locale === "en" ? "/" : `/${locale}`);
