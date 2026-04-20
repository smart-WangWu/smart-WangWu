/**
 * 王屋山民宿 mock 数据 + 问答/评价/点赞存储层
 * 参考 foodMerchants.js 结构，为民宿详情页提供数据支持
 */

const HOMESTAY_LIST = [
  {
    id: 6,
    nameFull: '老家精品民宿',
    nameShort: '老家精品民宿',
    address: '王屋山景区入口愚公村新小区四排8号',
    addressShort: '愚公村新小区',
    price: 100,
    highlight:
      '整洁卫生，农家菜推荐，有自助烧烤。民宿位于景区入口旁愚公村，出行极为便利，是登顶王屋山前后的理想落脚点。',
    tags: ['景区入口', '整洁卫生', '自助烧烤', '农家风味'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822143424842.jpg',
    experienceCount: 860,
    experienceText: '860人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e769e375.webp',
    wechat: 'chunli903510',
    roomTypes: [
      { name: '单人间', price: 100, desc: '1.5m大床 · 独立卫浴' },
      { name: '双人间', price: 130, desc: '1.8m大床 · 独立卫浴' },
      { name: '家庭房', price: 180, desc: '1.5m+1.2m床 · 独立卫浴' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '自助烧烤', '农家早餐'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 7,
    nameFull: '山里人家精品民宿',
    nameShort: '山里人家',
    address: '王屋山风景区入口愚公村',
    addressShort: '愚公村',
    price: 100,
    highlight:
      '性价比较高，含带黄河三峡门票。农家菜地道，住宿体验温馨，是学生党与家庭出游的高性价比之选。',
    tags: ['高性价比', '含景区门票', '农家风味', '家庭首选'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20250822143443043.jpg',
    experienceCount: 720,
    experienceText: '720人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e88a048f.webp',
    wechat: 'longge461059',
    roomTypes: [
      { name: '标准间', price: 100, desc: '1.5m双床 · 独立卫浴' },
      { name: '大床房', price: 120, desc: '1.8m大床 · 独立卫浴' },
      { name: '套房', price: 200, desc: '1.8m大床+客厅 · 独立卫浴' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '含早餐', '黄河三峡门票'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 15,
    nameFull: '老乡亲精品民宿',
    nameShort: '老乡亲民宿',
    address: '济源市王屋镇愚公新社区南1排4号',
    addressShort: '愚公新社区',
    price: 200,
    highlight:
      '王屋山特色风格的建筑，旅店配有活动场所，方便休闲娱乐，具有非常强的适居性，是休闲度假的理想选择。',
    tags: ['特色建筑', '活动场所', '休闲度假', '高适居性'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20251115233435844.png',
    experienceCount: 340,
    experienceText: '340人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e76e2313.webp',
    wechat: 'wxid_g6m80xinwujk22',
    roomTypes: [
      { name: '山景大床房', price: 200, desc: '1.8m大床 · 观景阳台 · 独立卫浴' },
      { name: '亲子房', price: 260, desc: '1.5m+1.2m床 · 独立卫浴' },
      { name: '家庭套房', price: 320, desc: '1.8m+1.5m床 · 独立卫浴 · 客厅' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '活动室', '山景阳台'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 16,
    nameFull: '老房东民宿馆',
    nameShort: '老房东民宿',
    address: '济源市王屋镇王屋山停车场东50米愚公新社区南一排三号',
    addressShort: '景区停车场旁',
    price: 135,
    highlight:
      '房屋整洁干净，具有较多绿植，是以中国传统式建筑为基调的具有现代化特色的旅店，位置极佳，距景区停车场仅50米。',
    tags: ['传统中式', '绿植环绕', '近停车场', '干净整洁'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20251115233412125.png',
    experienceCount: 520,
    experienceText: '520人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e75a5d1d.webp',
    wechat: 'lfd15539116763',
    roomTypes: [
      { name: '中式大床房', price: 135, desc: '1.8m大床 · 独立卫浴' },
      { name: '双床标准间', price: 155, desc: '1.2m+1.2m床 · 独立卫浴' },
      { name: '庭院套房', price: 240, desc: '1.8m大床 · 庭院景观 · 独立卫浴' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '中式庭院', '绿植环绕'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 17,
    nameFull: '秋缘农家乐',
    nameShort: '秋缘农家乐',
    address: '河南省济源市王屋山景区南侧约300米',
    addressShort: '景区南侧300米',
    price: 100,
    highlight:
      '饭菜可口，房主热情，价格实惠，临近街道。用餐方便、性价比极高，是学生党与背包客的首选。',
    tags: ['经济实惠', '房主热情', '用餐便利', '近街道'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20251115233449543.png',
    experienceCount: 980,
    experienceText: '980人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e7754e13.webp',
    wechat: 'wxid_4bdv3i8obgx422',
    roomTypes: [
      { name: '经济单间', price: 80, desc: '1.2m床 · 公共卫浴' },
      { name: '标准双人间', price: 100, desc: '1.5m双床 · 独立卫浴' },
      { name: '舒适大床房', price: 120, desc: '1.8m大床 · 独立卫浴' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '农家餐饮', '近景区'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 18,
    nameFull: '常相聚农家乐',
    nameShort: '常相聚农家乐',
    address: '河南省济源市愚公村一排2号',
    addressShort: '愚公村',
    price: 100,
    highlight:
      '靠近王屋老街和王屋山景区入口，房间干净，布草整洁。位置优越，是逛老街、品美食、登山的绝佳中转站。',
    tags: ['近老街', '布草整洁', '景区入口', '交通便利'],
    imageUrl: 'https://gitee.com/ty-4895/picture/raw/master/20251115233353798.png',
    experienceCount: 1150,
    experienceText: '1150人已体验',
    qrCode: 'https://picui.ogmua.cn/s1/2026/03/13/69b39e74b6407.webp',
    wechat: 'wxid_ljj074vmrexr12',
    roomTypes: [
      { name: '经济双人间', price: 100, desc: '1.5m双床 · 独立卫浴' },
      { name: '舒适大床房', price: 120, desc: '1.8m大床 · 独立卫浴' },
      { name: '家庭套房', price: 180, desc: '1.5m+1.2m床 · 独立卫浴' }
    ],
    amenities: ['免费WiFi', '24h热水', '空调', '免费停车', '近老街', '布草干净'],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  }
];

// ─────────────────────────────────────────
//  Storage Keys
// ─────────────────────────────────────────
const _qaKey = (id) => `homestay_QA_${id}`;
const _revKey = (id) => `homestay_reviews_${id}`;
const _allRevKey = 'homestay_all_reviews';

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
function getHomestayById(id) {
  const n = Number(id);
  if (Number.isNaN(n)) return null;
  return HOMESTAY_LIST.find((h) => h.id === n) || null;
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
//  评价聚合：综合分
// ─────────────────────────────────────────
function aggregateRatingFromReviews(reviews) {
  const nums = reviews
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n) && n >= 0 && n <= 5);
  if (!nums.length) return null;
  return round1(nums.reduce((a, b) => a + b, 0) / nums.length);
}

// ─────────────────────────────────────────
//  评价 CRUD
// ─────────────────────────────────────────
function getReviewsForHomestay(homestayId) {
  const stored = _getStorage(_revKey(homestayId)) || [];
  const base = stored;
  const h = getHomestayById(homestayId);
  const img = h ? h.imageUrl : '';
  const mock = [
    {
      id: 'r_m1',
      user: '山野游客',
      level: 'Lv6',
      date: '2025年11月18日',
      mood: '很棒',
      rating: 4.8,
      badge: '景区周边优选',
      content: `房间很干净，老板热情好客，早餐的农家小米粥特别香。距离景区入口很近，第二天一早出发爬山非常方便。下次来王屋山还住这里！`,
      images: [img, img, img],
      imageMore: 4,
      helpful: 18,
      isMock: true
    },
    {
      id: 'r_m2',
      user: '背包旅行客',
      level: 'Lv4',
      date: '2025年10月6日',
      mood: '不错',
      rating: 4.2,
      badge: '高性价比',
      content: `价格实惠，房间虽小但五脏俱全。老板还给推荐了当地特色的农家菜，人均不到40元吃得很满足。`,
      images: [img, img],
      imageMore: 0,
      helpful: 9,
      isMock: true
    }
  ].map((rev) => ({ ...rev, starStates: starStates(rev.rating) }));
  return [...base, ...mock];
}

function getAllReviews() {
  return _getStorage(_allRevKey) || [];
}

function submitReview(homestayId, reviewData) {
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
    homestayId: homestayId,
    homestayName: reviewData.homestayName || '',
    homestayImageUrl: reviewData.homestayImageUrl || ''
  };
  newReview.starStates = starStates(newReview.rating);

  const stored = _getStorage(_revKey(homestayId)) || [];
  stored.unshift(newReview);
  _setStorage(_revKey(homestayId), stored);

  const all = _getStorage(_allRevKey) || [];
  all.unshift(newReview);
  _setStorage(_allRevKey, all);

  return newReview;
}

function deleteReview(homestayId, reviewId) {
  const stored = _getStorage(_revKey(homestayId)) || [];
  _setStorage(_revKey(homestayId), stored.filter((r) => r.id !== reviewId));
  const all = _getStorage(_allRevKey) || [];
  _setStorage(_allRevKey, all.filter((r) => r.id !== reviewId));
}

// ─────────────────────────────────────────
//  问大家 CRUD
// ─────────────────────────────────────────
const DEFAULT_QA = [
  {
    id: 'q1',
    question: '可以接站吗？',
    userNick: '系统',
    date: '2025年9月1日',
    answers: [
      { id: 'a1', user: '商家回复', isOwner: true, content: '济源火车站可安排接站，费用50元/次，请提前联系。', date: '2025年10月1日' }
    ]
  },
  {
    id: 'q2',
    question: '含早餐吗？',
    userNick: '系统',
    date: '2025年9月1日',
    answers: [
      { id: 'a2', user: '商家回复', isOwner: true, content: '含早餐，用餐时间7:00-9:00，本地特色小米粥、馒头、炒菜均有。', date: '2025年9月20日' }
    ]
  }
];

function getQAForHomestay(homestayId) {
  const raw = _getStorage(_qaKey(homestayId));
  return raw ? raw : JSON.parse(JSON.stringify(DEFAULT_QA));
}

function addQuestion(homestayId, questionText, userNick) {
  const list = getQAForHomestay(homestayId);
  const dateStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).replace(/\//g, '年').replace(/(\d+)年0(\d+)月/, '$1年$2月');
  const newQ = {
    id: 'q' + Date.now(),
    question: questionText.trim(),
    answers: [],
    userNick: userNick || '游客',
    date: dateStr
  };
  list.unshift(newQ);
  _setStorage(_qaKey(homestayId), list);
  return newQ;
}

function addAnswer(homestayId, questionId, content, userNick) {
  const list = getQAForHomestay(homestayId);
  const q = list.find((x) => x.id === questionId);
  if (!q) return null;
  const dateStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  q.answers.push({
    id: 'a' + Date.now(),
    user: userNick || '热心游客',
    isOwner: false,
    content: content.trim(),
    date: dateStr
  });
  _setStorage(_qaKey(homestayId), list);
  return true;
}

// ─────────────────────────────────────────
//  点赞
// ─────────────────────────────────────────
const _dishLikeKey = (id) => `homestay_likes_${id}`;

function getAmenityLikes(homestayId) {
  return _getStorage(_dishLikeKey(homestayId)) || {};
}

function toggleAmenityLike(homestayId, amenityName) {
  const likes = getAmenityLikes(homestayId);
  if (likes[amenityName]) {
    delete likes[amenityName];
  } else {
    likes[amenityName] = true;
  }
  _setStorage(_dishLikeKey(homestayId), likes);
  return likes;
}

// ─────────────────────────────────────────
//  详情页 enrich
// ─────────────────────────────────────────
function enrichHomestayForDetail(h) {
  if (!h) return null;
  const reviews = getReviewsForHomestay(h.id);
  const fromReviews = aggregateRatingFromReviews(reviews);
  const fallbackRating = round1(4.0 + (h.id % 10) / 10);
  const rating = fromReviews != null ? fromReviews : fallbackRating;
  const reviewCount = reviews.length;
  const cleanlinessScore = round1(Math.min(5, Math.max(1, rating - 0.02)));
  const envScore = round1(Math.min(5, Math.max(1, rating + 0.03)));
  const serviceScore = round1(Math.min(5, Math.max(1, rating + 0.01)));

  return {
    ...h,
    rating,
    ratingStr: Number(rating).toFixed(1),
    reviewCount,
    reviewCountText: `${Math.min(9999, reviewCount)}条`,
    category: h.id === 17 || h.id === 18 ? '农家乐' : '精品民宿',
    rankingLine: '王屋山风景区 · 住宿推荐',
    bizStatus: '营业中',
    facilities: h.amenities,
    addressLine: h.address,
    distanceText: '距景区入口步行约 5-10 分钟',
    starStates: starStates(rating),
    cleanlinessScore,
    envScore,
    serviceScore
  };
}

function getHomestayDetailById(id) {
  const base = getHomestayById(id);
  return enrichHomestayForDetail(base);
}

// ─────────────────────────────────────────
//  心情标签选项
// ─────────────────────────────────────────
const MOOD_OPTIONS = ['很棒', '不错', '一般', '失望', '踩坑'];

module.exports = {
  HOMESTAY_LIST,
  getHomestayById,
  getHomestayDetailById,
  getQAForHomestay,
  addQuestion,
  addAnswer,
  getReviewsForHomestay,
  getAllReviews,
  submitReview,
  deleteReview,
  getAmenityLikes,
  toggleAmenityLike,
  starStates,
  round1,
  MOOD_OPTIONS
};
