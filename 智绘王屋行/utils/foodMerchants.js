/**
 * 王屋山美食商家 mock 数据 + 问答/评价存储层
 * 所有问答与评价均存储在 Storage（key: food_merchant_QA_{id} / food_reviews_{id}）
 */

const MERCHANT_LIST = [
  {
    id: 1,
    nameFull: '愚公正味（王屋老街店）',
    nameShort: '愚公正味',
    address: '王屋山风景区王屋老街内',
    addressShort: '王屋老街内',
    signatureDishes: '红烧黄河大鲤鱼、鸡头参炖土鸡、葱扒山羊肉',
    priceText: '¥60起',
    highlight:
      '主打官方主推的「王屋山珍宴」系列，食材多取自本地山野鲜货，招牌黄河大鲤鱼鲜嫩入味，是景区内少有的口碑正餐店，逛老街时用餐极为方便。',
    tags: ['官方推荐', '山野鲜货', '口碑正餐', '老街旁'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E6%84%9A%E5%85%AC%E6%AD%A3%E5%91%B3.jpeg',
    experienceCount: 2680,
    experienceText: '2680人已体验'
  },
  {
    id: 2,
    nameFull: '阳台宫素斋馆',
    nameShort: '阳台宫素斋',
    address: '王屋山风景区阳台宫内',
    addressShort: '阳台宫内',
    signatureDishes: '道家豆腐宴、山野菌菇煲、山野菜素斋拼盘',
    priceText: '¥40起',
    highlight:
      '道教文化特色素斋，食材均为本地山野原生食材，口味清淡养生，逛完千年道观阳台宫可顺路体验，氛围感与文化感拉满。',
    tags: ['道家素斋', '山野食材', '养生清淡', '文化体验'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E9%98%B3%E5%8F%B0%E5%AE%AB%E7%B4%A0%E6%96%8B.jpeg',
    experienceCount: 1520,
    experienceText: '1520人已体验'
  },
  {
    id: 3,
    nameFull: '老愚公山珍饭店',
    nameShort: '老愚公山珍',
    address: '王屋山风景区大门口西20米',
    addressShort: '景区大门西',
    signatureDishes: '山野菜炖土鸡、野生木耳炒肉、王屋山杂面条',
    priceText: '¥40起',
    highlight:
      '距离景区入口极近，是本地人常去的老牌农家菜馆，食材新鲜、明码标价，主打地道山野农家菜，性价比极高，适合登山前后的简餐或正餐。',
    tags: ['近入口', '农家菜', '明码标价', '高性价比'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E8%80%81%E6%84%9A%E5%85%AC%E5%B1%B1%E7%8F%8D.jpeg',
    experienceCount: 3210,
    experienceText: '3210人已体验'
  },
  {
    id: 4,
    nameFull: '愚公人家农家乐',
    nameShort: '愚公人家',
    address: '王屋山风景区入口愚公村',
    addressShort: '愚公村',
    signatureDishes: '鸡头参炖土鸡、炖野兔、山野菜炒鸡蛋',
    priceText: '¥45起',
    highlight:
      '景区周边口碑稳定的农家乐，招牌炖土鸡肉质紧实不柴，搭配现熬玉米粥解腻，分量充足，适合家庭、朋友多人聚餐。',
    tags: ['农家风味', '家庭聚餐', '炖土鸡', '分量足'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E6%84%9A%E5%85%AC%E4%BA%BA%E5%AE%B6.jpeg',
    experienceCount: 2890,
    experienceText: '2890人已体验'
  },
  {
    id: 5,
    nameFull: '王屋山风味居（阳台宫店）',
    nameShort: '王屋山风味居',
    address: '王屋山风景区阳台宫正对面（距售票点不足10米）',
    addressShort: '阳台宫对面',
    signatureDishes: '黄河大鲤鱼、山野菜拼盘、农家烩菜',
    priceText: '¥40起',
    highlight:
      '位置绝佳，出门即达景区入口，设有独立包间，可承接团队餐，菜品分量足、口味地道，兼顾散客简餐与团队聚餐需求。',
    tags: ['位置绝佳', '团队包间', '地道豫菜', '分量足'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E7%8E%8B%E5%B1%8B%E5%B1%B1%E9%A3%8E%E5%91%B3%E5%B1%85.jpeg',
    experienceCount: 1980,
    experienceText: '1980人已体验'
  },
  {
    id: 6,
    nameFull: '王屋山居餐厅',
    nameShort: '王屋山居',
    address: '王屋山风景区入口旁山居酒店内',
    addressShort: '山居酒店内',
    signatureDishes: '葱扒山羊肉、清炒山野菜、济源羊肉烩面',
    priceText: '¥45起',
    highlight:
      '环境清幽、装修有格调，比普通农家乐用餐环境更好，菜品兼顾山野风味与精致度，适合对用餐环境有要求的游客。',
    tags: ['环境清幽', '山野风味', '精致出品', '山居酒店'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E7%8E%8B%E5%B1%8B%E5%B1%B1%E5%B1%85.jpeg',
    experienceCount: 1120,
    experienceText: '1120人已体验'
  },
  {
    id: 7,
    nameFull: '老李家不翻儿',
    nameShort: '老李家不翻儿',
    address: '王屋镇主街',
    addressShort: '王屋镇主街',
    signatureDishes: '鸡蛋不翻儿、非遗济源土馍、韩彦红果汤',
    priceText: '¥10起',
    highlight:
      '济源非遗小吃标杆店，是本地人从小吃到大的老字号，鸡蛋不翻儿软糯咸香，是王屋山必尝的特色早餐与街头小吃。',
    tags: ['非遗小吃', '老字号', '早餐必选', '济源味道'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E8%80%81%E6%9D%8E%E5%AE%B6%E4%B8%8D%E7%BF%BB%E5%84%BF.jpg',
    experienceCount: 4560,
    experienceText: '4560人已体验'
  },
  {
    id: 8,
    nameFull: '永盛餐厅（王屋大街店）',
    nameShort: '永盛餐厅',
    address: '王屋镇政府东南侧约50米',
    addressShort: '镇政府旁',
    signatureDishes: '本地扣碗、农家烩菜、羊肉烩面',
    priceText: '¥30起',
    highlight:
      '镇里经营多年的家常菜馆，是本地人日常聚餐首选，价格亲民、分量超大，能吃到最地道的豫北农家家常风味。',
    tags: ['家常菜', '本地人聚', '分量足', '豫北风味'],
    imageUrl: 'https://wang-img-bed.oss-cn-beijing.aliyuncs.com/img/%E6%B0%B8%E7%9B%9B%E9%A5%AD%E5%BA%97.jpeg',
    experienceCount: 2340,
    experienceText: '2340人已体验'
  }
];

// ─────────────────────────────────────────
//  Storage Keys
// ─────────────────────────────────────────
const _qaKey = (id) => `food_merchant_QA_${id}`;
const _revKey = (id) => `food_reviews_${id}`;
const _allRevKey = 'food_all_reviews';   // 全局评论列表（我的评论页用）

function _getStorage(key) {
  try {
    const v = wx.getStorageSync(key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function _setStorage(key, val) {
  try {
    wx.setStorageSync(key, JSON.stringify(val));
  } catch {}
}

// ─────────────────────────────────────────
//  列表查询
// ─────────────────────────────────────────
function getMerchantById(id) {
  const n = Number(id);
  if (Number.isNaN(n)) return null;
  return MERCHANT_LIST.find((m) => m.id === n) || null;
}

// ─────────────────────────────────────────
//  星级工具
// ─────────────────────────────────────────
function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

function starStates(rating) {
  const r = Math.min(5, Math.max(0, Number(rating) || 0));
  const list = [];
  for (let i = 0; i < 5; i++) {
    if (r >= i + 1) list.push('full');
    else if (r > i + 0.25) list.push('half');
    else list.push('empty');
  }
  return list;
}

// ─────────────────────────────────────────
//  问大家 CRUD
// ─────────────────────────────────────────
const DEFAULT_QA = [
  {
    id: 'q1',
    question: '需要提前预约吗？',
    userNick: '系统',
    date: '2025年9月1日',
    answers: [
      { id: 'a1', user: '商家回复', isOwner: true, content: '建议提前一天预约，节假日需提前 3 天。', date: '2025年10月1日' }
    ]
  },
  {
    id: 'q2',
    question: '有包间吗？',
    userNick: '系统',
    date: '2025年9月1日',
    answers: [
      { id: 'a2', user: '商家回复', isOwner: true, content: '有独立包间 2 间，可坐 6-10 人，请提前告知。', date: '2025年9月20日' },
      { id: 'a3', user: '王屋游客', isOwner: false, content: '我上次去要了包间，挺干净的。', date: '2025年11月5日' }
    ]
  }
];

function getQAForMerchant(merchantId) {
  const raw = _getStorage(_qaKey(merchantId));
  return raw ? raw : JSON.parse(JSON.stringify(DEFAULT_QA));
}

function addQuestion(merchantId, questionText, userNick) {
  const list = getQAForMerchant(merchantId);
  const newQ = {
    id: 'q' + Date.now(),
    question: questionText.trim(),
    answers: [],
    userNick: userNick || '游客',
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).replace(/\//g, '年').replace(/(\d+)年(\d+)年(\d+)日/, '$1年$2月$3日').replace(/(\d+)年0(\d+)月/, '$1年$2月')
  };
  list.unshift(newQ);
  _setStorage(_qaKey(merchantId), list);
  return newQ;
}

function addAnswer(merchantId, questionId, content, userNick) {
  const list = getQAForMerchant(merchantId);
  const q = list.find((x) => x.id === questionId);
  if (!q) return null;
  const newA = {
    id: 'a' + Date.now(),
    user: userNick || '热心游客',
    isOwner: false,
    content: content.trim(),
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  };
  q.answers.push(newA);
  _setStorage(_qaKey(merchantId), list);
  return newA;
}

// ─────────────────────────────────────────
//  评价 CRUD
// ─────────────────────────────────────────
function getReviewsForMerchant(merchantId) {
  const stored = _getStorage(_revKey(merchantId)) || [];
  const base = stored;
  const m = getMerchantById(merchantId);
  const img = m ? m.imageUrl : '';
  // 固定 mock 评价（展示用）
  const mock = [
    {
      id: 'r_m1',
      user: '王屋山游客',
      level: 'Lv6',
      date: '2025年11月18日',
      mood: '很棒',
      rating: 4.5,
      badge: '景区内消费',
      content: `口味：山野菜新鲜，鲤鱼入味；环境：在${m ? m.nameShort : '本店'}很方便；服务：上菜快，明码标价。`,
      images: [img, img, img],
      imageMore: 4,
      helpful: 12,
      isMock: true
    },
    {
      id: 'r_m2',
      user: '豫北吃货',
      level: 'Lv5',
      date: '2025年10月6日',
      mood: '不错',
      rating: 4,
      badge: `¥${Math.round(40 + ((merchantId || 1) % 5) * 5)}/人`,
      content: `分量足，适合爬山下来吃一顿。推荐${m ? (m.signatureDishes.split('、')[0] || '招牌菜') : '招牌菜'}。`,
      images: [img, img],
      imageMore: 0,
      helpful: 5,
      isMock: true
    }
  ].map((rev) => ({ ...rev, starStates: starStates(rev.rating) }));
  return [...base, ...mock];
}

function getAllReviews() {
  return _getStorage(_allRevKey) || [];
}

/** 提交新评价（含更新商家专属 + 全局） */
function submitReview(merchantId, reviewData) {
  const newReview = {
    id: 'r_' + Date.now(),
    user: reviewData.nick || '游客',
    avatarUrl: reviewData.avatarUrl || '',
    level: 'Lv1',
    date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    mood: reviewData.mood || '不错',
    rating: reviewData.rating || 5,
    badge: '',
    content: reviewData.content || '',
    images: reviewData.images || [],
    imageMore: 0,
    helpful: 0,
    isMock: false,
    merchantId: merchantId,
    merchantName: reviewData.merchantName || '',
    merchantImageUrl: reviewData.merchantImageUrl || ''
  };
  newReview.starStates = starStates(newReview.rating);

  // 写入商家专属
  const stored = _getStorage(_revKey(merchantId)) || [];
  stored.unshift(newReview);
  _setStorage(_revKey(merchantId), stored);

  // 写入全局
  const all = _getStorage(_allRevKey) || [];
  all.unshift(newReview);
  _setStorage(_allRevKey, all);

  return newReview;
}

/** 删除评价 */
function deleteReview(merchantId, reviewId) {
  // 从商家专属中移除
  const stored = _getStorage(_revKey(merchantId)) || [];
  const filtered = stored.filter((r) => r.id !== reviewId);
  _setStorage(_revKey(merchantId), filtered);

  // 从全局中移除
  const all = _getStorage(_allRevKey) || [];
  const allFiltered = all.filter((r) => r.id !== reviewId);
  _setStorage(_allRevKey, allFiltered);
}

// ─────────────────────────────────────────
//  菜品点赞
// ─────────────────────────────────────────
const _dishLikeKey = (merchantId) => `dish_likes_${merchantId}`;

function getDishLikes(merchantId) {
  return _getStorage(_dishLikeKey(merchantId)) || {};
}

function toggleDishLike(merchantId, dishName) {
  const likes = getDishLikes(merchantId);
  const key = dishName;
  if (likes[key]) {
    delete likes[key];
  } else {
    likes[key] = true;
  }
  _setStorage(_dishLikeKey(merchantId), likes);
  return likes;
}

function isDishLiked(merchantId, dishName) {
  const likes = getDishLikes(merchantId);
  return !!likes[dishName];
}

// ─────────────────────────────────────────
//  详情页 enrich
// ─────────────────────────────────────────

/** 根据当前展示的评价列表，对各条 star 分做算术平均，得到店铺综合分 */
function aggregateRatingFromReviews(reviews) {
  const nums = reviews
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n) && n >= 0 && n <= 5);
  if (!nums.length) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return round1(avg);
}

function enrichMerchantForDetail(m) {
  if (!m) return null;
  const reviews = getReviewsForMerchant(m.id);
  const fromReviews = aggregateRatingFromReviews(reviews);
  const fallbackRating = round1(3.9 + (m.id % 12) / 10);
  const rating = fromReviews != null ? fromReviews : fallbackRating;
  const reviewCount = reviews.length;
  const tasteScore = round1(Math.min(5, Math.max(1, rating - 0.02)));
  const envScore = round1(Math.min(5, Math.max(1, rating + 0.03)));
  const serviceScore = round1(Math.min(5, Math.max(1, rating + 0.01)));
  const dishes = m.signatureDishes.split('、').map((name, i) => ({
    name: name.trim(),
    likes: 2 + ((m.id + i * 7) % 35)
  }));
  const deals = [
    {
      title: `【口碑优选】双人·${m.nameShort}招牌套餐`,
      rule: '全周可用 | 免预约',
      price: 78 + (m.id % 6) * 8,
      origPrice: 138 + (m.id % 5) * 10,
      discount: '',
      sales: `半年售 ${(m.experienceCount % 8) + 1}.${(m.experienceCount % 9) || 1}万+`,
      tag: m.id % 2 === 0 ? '商家推荐' : '联名推荐',
      imageUrl: m.imageUrl
    },
    {
      title: `【实惠】三人·山珍宴尝鲜`,
      rule: '周一至周日可用 | 可电话预定',
      price: 118 + (m.id % 4) * 12,
      origPrice: 208,
      discount: '',
      sales: `已售 ${600 + m.id * 120}+`,
      tag: '',
      imageUrl: m.imageUrl
    }
  ];
  deals.forEach((d) => {
    if (d.origPrice > 0) {
      d.discount = `${(Math.round((d.price / d.origPrice) * 100) / 10).toFixed(1)}折`;
    }
  });
  const facilities = [...m.tags, '免费停车', '可电话预定'].slice(0, 6);
  const avgPerPerson = m.priceText.replace('起', '').replace('¥', '') || '50';

  return {
    ...m,
    rating,
    ratingStr: Number(rating).toFixed(1),
    reviewCount,
    reviewCountText: `${Math.min(9999, reviewCount)}条`,
    avgPerPersonText: `¥${avgPerPerson}/人`,
    tasteScore,
    envScore,
    serviceScore,
    category: m.id === 7 ? '小吃快餐' : m.id === 1 ? '豫菜·山珍' : '农家菜',
    area: m.addressShort,
    chainTag: m.id === 7 || m.id === 2 ? '老字号' : '',
    rankingLine: '王屋山风景区 · 口碑推荐',
    bizStatus: '营业中',
    hours: '周一至周日 09:30-21:30',
    facilities,
    addressLine: m.address,
    distanceText: '距景区核心游览区步行约 8 分钟',
    phone: '0391-66' + String(1000 + m.id * 111).slice(-4),
    deals,
    dishes,
    dishSectionTitle: `网友推荐菜 (${dishes.length})`,
    starStates: starStates(rating)
  };
}

function getMerchantDetailById(id) {
  const base = getMerchantById(id);
  return enrichMerchantForDetail(base);
}

// ─────────────────────────────────────────
//  心情标签选项（评价时用）
// ─────────────────────────────────────────
const MOOD_OPTIONS = ['很棒', '不错', '一般', '失望', '踩坑'];

module.exports = {
  MERCHANT_LIST,
  getMerchantById,
  getMerchantDetailById,
  getQAForMerchant,
  addQuestion,
  addAnswer,
  getReviewsForMerchant,
  getAllReviews,
  submitReview,
  deleteReview,
  starStates,
  round1,
  MOOD_OPTIONS,
  getDishLikes,
  toggleDishLike,
  isDishLiked
};
