// pages/ai/ai.js - 王屋山 AI 助手（可真实交互）
//
// ========== 如何接入真实 AI ==========
// 方式一：微信云开发云函数（推荐，API 密钥不暴露）
//   1. 在微信开发者工具中开通云开发，创建云函数如 chat
//   2. 下方设置 USE_CLOUD = true，CLOUD_FUNC_NAME = 'chat'
//   3. 在 app.js 的 onLaunch 里加：wx.cloud && wx.cloud.init({ traceUser: true })
//   4. 云函数内用 Node 调用大模型 API（智谱/通义/OpenAI 等），把密钥放在云环境变量
//   5. 云函数返回格式：{ content: '助手回复文字' } 或 { reply: '...' }
//
// 方式二：自建后端
//   1. 用 Node/Python 等写一个接口，接收 POST { messages: [{role, content}, ...] }
//   2. 后端调用大模型 API 后返回 { content: '...' } 或 { reply: '...' }
//   3. 下方设置 API_BASE = 'https://你的域名.com/api'（注意必须 HTTPS）
//   4. 在小程序后台 开发-开发管理-开发设置-服务器域名 里把该域名加入 request 合法域名
//
const SUGGESTIONS_POOL = [
  '请给我介绍一下王屋老街。',
  '王屋山有哪些美食呀?',
  '传说王屋山是个有灵气的地方,有什么神话故事嘛?',
  '天坛极顶怎么玩？大概要多久？',
  '王屋山周边有什么推荐的民宿？',
  '景区门票和索道多少钱？',
  '王屋山最适合什么季节去？',
  '愚公移山的故事和王屋山有什么关系？'
];

// 接入方式：二选一
const USE_CLOUD = false;          // true = 用云函数；false = 用 API_BASE 或本地回复
const CLOUD_FUNC_NAME = 'chat';   // 云函数名称（文字对话）
const API_BASE = '';               // 自建后端时填，如 'https://your-domain.com/api'

// 图像识别：拍照讲解时是否调用真实视觉 API（需配合云函数 chatImage 或后端 /chatImage）
const USE_IMAGE_RECOGNITION = false; // true = 上传图片并请求识别/讲解；false = 仅占位文案
const IMAGE_CLOUD_FUNC = 'chatImage'; // 云函数方式时的函数名（需自行创建，见 AI图像识别接入说明.md）

// 王屋山知识库：关键词 -> 回复内容（用于本地智能回复）
const KNOWLEDGE = {
  王屋老街: '王屋老街位于王屋山景区入口附近，是一条融合了古风与民俗的商业街。街上有特色小吃、手工艺品和民宿，适合逛吃拍照。建议傍晚去，夜景更有氛围。',
  美食: '王屋山一带有不少特色美食：野菜水饺、裤带面、柿子饼、土鸡、山野菜等。王屋老街和愚公村都有农家乐，推荐尝尝当地的野菜和手工面。',
  民宿: '王屋山周边民宿很多，如老家精品民宿、山里人家、老乡亲精品民宿等，价格大约 100～200 元/晚。多数含农家菜，可提前在小程序里查看预订。',
  路线: '常见路线有三条：①步行登山（约 4～5 小时，挑战级）从道境广场经愚公移山像到天坛极顶；②索道+步行（约 2～3 小时）；③索道游览（约 1.5～2 小时，最轻松）。可在攻略页查看详细站点。',
  门票: '景区门票约 50～65 元/人，索道往返约 80～120 元，具体以景区公示为准。建议提前在官方或合作渠道购票。',
  天坛极顶: '天坛极顶即总仙宫，海拔约 1715 米，是王屋山主峰。轩辕黄帝曾在此设坛祭天，是道教圣地。登顶可俯瞰王屋山全貌，建议预留 3～4 小时（含索道或登山时间）。',
  愚公: '愚公移山的故事就发生在王屋山一带。《列子·汤问》里愚公带领子孙挖山不止，王屋山因此成为坚韧精神的象征。景区内有愚公移山群雕、愚公故居等景点可参观。',
  神话: '王屋山自古被视为有灵气之地。除愚公移山外，相传轩辕黄帝在此设坛祭天，李白、杜甫曾游历并留下《上阳台帖》等名篇，道教在此也有深厚渊源。',
  季节: '王屋山四季皆可游玩：春赏花、夏避暑、秋观叶、冬可赏雪。春秋两季气候最宜人；夏季山上凉爽；冬季若遇雪景也很美。',
  介绍: '王屋山在河南省济源市，属太行山脉，主峰天坛山海拔 1715 米，是道教名山和愚公移山故事发源地。景区包含道境广场、王屋老街、愚公移山群雕、阳台宫、天坛极顶等，适合 1～2 日游。'
};

function localReply(userText) {
  const t = (userText || '').trim();
  if (!t) return '你可以问我王屋山的景点、美食、民宿、路线或门票等信息哦～';
  for (const [key, answer] of Object.entries(KNOWLEDGE)) {
    if (t.includes(key)) return answer;
  }
  return '您可以问问王屋山景点、美食、民宿、路线或门票等信息，愚仔会尽力解答～';
}

Page({
  data: {
    suggestions: [],
    inputVal: '',
    messages: [],
    loading: false,
    scrollToId: '',
    statusBarHeight: 20,
    navBarHeight: 40
  },

  onLoad() {
    const sys = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: sys.statusBarHeight || 20,
      navBarHeight: 40
    });
    this.refreshSuggestions();
  },

  refreshSuggestions() {
    const pool = [...SUGGESTIONS_POOL];
    const suggestions = [];
    for (let i = 0; i < 3 && pool.length; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      suggestions.push(pool.splice(idx, 1)[0]);
    }
    this.setData({ suggestions });
  },

  onBack() {
    wx.switchTab({ url: '/pages/home/home' });
  },

  onClearChat() {
    if (this.data.messages.length === 0) return;
    wx.showModal({
      title: '清空对话',
      content: '确定要清空当前对话吗？',
      success: (res) => {
        if (res.confirm) this.setData({ messages: [] });
      }
    });
  },

  onInput(e) {
    this.setData({ inputVal: e.detail.value });
  },

  onSend() {
    const { inputVal, messages, loading } = this.data;
    const text = (inputVal || '').trim();
    if (!text || loading) return;

    const id = Date.now();
    const userMsg = { id: 'u' + id, role: 'user', content: text };
    const nextMessages = [...messages, userMsg];

    this.setData({
      inputVal: '',
      messages: nextMessages,
      loading: true,
      scrollToId: 'chat-bottom'
    });

    const scrollClear = () => {
      setTimeout(() => this.setData({ scrollToId: '' }), 300);
    };

    if (USE_CLOUD && wx.cloud) {
      this.callCloudAI(nextMessages, scrollClear);
    } else if (API_BASE) {
      this.requestAI(nextMessages, scrollClear);
    } else {
      setTimeout(() => {
        const reply = localReply(text);
        this.setData({
          messages: [...nextMessages, { id: 'a' + (id + 1), role: 'assistant', content: reply }],
          loading: false,
          scrollToId: 'chat-bottom'
        });
        scrollClear();
      }, 600);
    }
  },

  callCloudAI(messages, scrollClear) {
    wx.cloud.callFunction({
      name: CLOUD_FUNC_NAME,
      data: { messages: messages.map(m => ({ role: m.role, content: m.content })) }
    }).then(res => {
      const data = res.result || {};
      const content = data.content || data.reply || '服务暂时无法回复，请稍后再试。';
      const next = [...this.data.messages, { id: 'a' + Date.now(), role: 'assistant', content }];
      this.setData({ messages: next, loading: false, scrollToId: 'chat-bottom' });
      scrollClear();
    }).catch(() => {
      const fallback = localReply(this.data.messages[this.data.messages.length - 1].content);
      const next = [...this.data.messages, { id: 'a' + Date.now(), role: 'assistant', content: fallback }];
      this.setData({ messages: next, loading: false, scrollToId: 'chat-bottom' });
      scrollClear();
      wx.showToast({ title: '已用本地回复', icon: 'none' });
    });
  },

  requestAI(messages, scrollClear) {
    wx.request({
      url: API_BASE + '/chat',
      method: 'POST',
      data: {
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      },
      success: (res) => {
        const data = res.data || {};
        let content = data.content || data.reply;
        if (!content && data.choices && data.choices[0]) content = data.choices[0].message?.content || data.choices[0].text;
        if (!content) content = '服务暂时无法回复，请稍后再试。';
        const next = [...this.data.messages, { id: 'a' + Date.now(), role: 'assistant', content }];
        this.setData({ messages: next, loading: false, scrollToId: 'chat-bottom' });
        scrollClear();
      },
      fail: () => {
        const fallback = localReply(this.data.messages[this.data.messages.length - 1].content);
        const next = [...this.data.messages, { id: 'a' + Date.now(), role: 'assistant', content: fallback }];
        this.setData({ messages: next, loading: false, scrollToId: 'chat-bottom' });
        scrollClear();
        wx.showToast({ title: '已用本地回复', icon: 'none' });
      }
    });
  },

  onSuggestionTap(e) {
    const text = e.currentTarget.dataset.text;
    this.setData({ inputVal: text });
  },

  onPhotoExplain() {
    if (this.data.loading) return;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: (res) => {
        const tempPath = res.tempFiles[0].tempFilePath;
        const id = Date.now();
        const userMsg = { id: 'u' + id, role: 'user', content: '拍照讲解景区', tempPath };
        const nextMessages = [...this.data.messages, userMsg];
        this.setData({
          messages: nextMessages,
          loading: true,
          scrollToId: 'chat-bottom'
        });
        const scrollClear = () => setTimeout(() => this.setData({ scrollToId: '' }), 300);
        const addAssistantReply = (content) => {
          this.setData({
            messages: [...nextMessages, { id: 'a' + (id + 1), role: 'assistant', content }],
            loading: false,
            scrollToId: 'chat-bottom'
          });
          scrollClear();
        };
        const fallbackReply = '已收到您拍摄的景区图片～拍照讲解功能正在完善中，您也可以直接输入问题向愚仔提问，例如：「天坛极顶怎么玩」「王屋山有哪些美食」。';

        if (USE_IMAGE_RECOGNITION && USE_CLOUD && wx.cloud) {
          this._recognizeImageByCloud(tempPath, addAssistantReply, fallbackReply);
        } else if (USE_IMAGE_RECOGNITION && API_BASE) {
          this._recognizeImageByAPI(tempPath, addAssistantReply, fallbackReply);
        } else {
          setTimeout(() => addAssistantReply(fallbackReply), 800);
        }
      },
      fail: (err) => {
        if (err.errMsg && !err.errMsg.includes('cancel')) wx.showToast({ title: '选择图片失败', icon: 'none' });
      }
    });
  },

  // 云函数方式：上传到云存储后调 chatImage，云函数同步返回 content 作为讲解（无需数据库轮询）
  _recognizeImageByCloud(tempPath, onSuccess, onFallback) {
    const cloudPath = 'ai-images/' + Date.now() + '.jpg';
    const doUpload = (filePath) => {
      wx.cloud.uploadFile({
        cloudPath,
        filePath
      }).then(res => {
        return wx.cloud.callFunction({
          name: IMAGE_CLOUD_FUNC,
          data: { fileID: res.fileID }
        });
      }).then(res => {
        const data = res.result || {};
        const content = data.content || data.reply;
        onSuccess(content && content.trim() ? content : onFallback);
      }).catch(err => {
        console.error('识别失败：', err);
        onSuccess(onFallback);
        wx.showToast({ title: '识别失败，请重试', icon: 'none' });
      });
    };
    wx.compressImage({
      src: tempPath,
      quality: 80,
      success: (r) => doUpload(r.tempFilePath),
      fail: () => doUpload(tempPath)
    });
  },

  // 自建后端方式：读 base64 后 POST /chatImage（建议图片 < 1MB，后端可先压缩）
  _recognizeImageByAPI(tempPath, onSuccess, onFallback) {
    wx.getFileSystemManager().readFile({
      filePath: tempPath,
      encoding: 'base64',
      success: (res) => {
        wx.request({
          url: API_BASE + '/chatImage',
          method: 'POST',
          data: { imageBase64: res.data },
          success: (reqRes) => {
            const data = reqRes.data || {};
            const content = data.content || data.reply;
            onSuccess(content && content.trim() ? content : onFallback);
          },
          fail: () => {
            onSuccess(onFallback);
            wx.showToast({ title: '识别失败，已用默认回复', icon: 'none' });
          }
        });
      },
      fail: () => {
        onSuccess(onFallback);
        wx.showToast({ title: '读取图片失败', icon: 'none' });
      }
    });
  }
});
