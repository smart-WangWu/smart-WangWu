# AI 图像识别功能接入说明

「试试拍照讲解景区景点」需要把用户拍的图片发给**带视觉能力的 AI**，由 AI 识别场景/建筑并返回讲解。小程序端不能直接带 API Key 请求第三方，所以必须通过**云函数**或**自建后端**转发。

---

## 一、实现思路

1. 用户选择/拍摄图片 → 得到临时路径 `tempFilePath`
2. 把图片传到服务器：
   - **云开发**：上传到云存储，得到 `fileID`，云函数里用 `fileID` 取图并调视觉 API
   - **自建后端**：用 `wx.uploadFile` 上传到你的接口，或转 base64 用 `wx.request` 传（建议图片 < 1MB）
3. 服务端调用**多模态大模型**（能看图的那种），例如：
   - **智谱 GLM-4V**（智谱开放平台）
   - **通义千问 VL**（阿里云）
   - **百度文心一言 视觉**
   - **腾讯混元 多模态**
   - **OpenAI GPT-4V**（需能访问）
4. 把模型返回的「识别/讲解」文案返回给小程序，愚仔以助手身份回复

---

## 二、方式一：微信云开发 + 云函数（推荐）

### 1. 开通云开发

- 微信开发者工具 → 云开发 → 开通
- 创建环境（如 `wangwu-env`）
- 在 `app.js` 的 `onLaunch` 里已有或加上：  
  `wx.cloud && wx.cloud.init({ traceUser: true })`

### 2. 云函数：接收图片并调视觉 API

新建云函数（如 `chatImage`），入口示例（Node）：

```javascript
// 云函数 chatImage
const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const { fileID } = event;  // 小程序上传到云存储后的 fileID
  if (!fileID) return { err: 'missing fileID' };

  // 用 fileID 取临时链接（或下载到云函数内再转 base64，视 API 要求）
  const res = await cloud.downloadFile({ fileID });
  const buffer = res.fileContent;  // Buffer

  // 这里调用你选的视觉 API，例如智谱 GLM-4V：
  // 1. 把 buffer 转 base64
  // 2. 请求 https://open.bigmodel.cn/api/paas/v4/chat/completions
  //    body: { model: 'glm-4v', messages: [{ role: 'user', content: [{ type: 'image_url', image_url: { url: 'data:image/jpeg;base64,' + base64 } }, { type: 'text', text: '请识别图中场景，若是王屋山景区相关请简要讲解；否则简单描述画面。' }] }] }
  // 3. 把返回的 content 取出

  const content = '...'; // 从视觉 API 拿到的讲解文案
  return { content };
};
```

- 智谱 / 通义 / 百度等密钥放在**云函数环境变量**里，不要写在小程序端。
- 若 API 要求传「图片 URL」而不是 base64，可先 `cloud.uploadFile` 得到云存储 URL，再把这个 URL 传给视觉 API（需确认该 API 能访问微信云存储域名）。

### 3. 小程序端

- 在 `ai.js` 里已预留：选择图片后若 `USE_CLOUD === true` 且开启了图像识别，会先 `wx.cloud.uploadFile` 上传到云存储，再 `wx.cloud.callFunction({ name: 'chatImage', data: { fileID } })`，把返回的 `content` 当作助手回复。
- 在「接入开关」里打开 `USE_IMAGE_CLOUD: true`（或你项目里实际变量名），并确保云函数名为 `chatImage`（或与代码中一致）。

### 4. 配置

- 云存储：通常默认可用；若用云存储 URL 给外网 API 用，需确认该 API 的可访问域名包含云存储域名。
- 云函数若需访问外网（智谱/阿里等），在云开发控制台打开「云函数 Node 可访问外网」等网络设置。

---

## 三、方式二：自建后端

### 1. 接口约定

- **上传接口**（二选一）：
  - `POST /api/uploadImage`：`Content-Type: multipart/form-data`，字段名 `file`，返回 `{ url: '...' }` 或 `{ imageId: '...' }`。
  - 或 `POST /api/chatImage`：body 里带 `imageBase64: '...'`（建议图片压缩后 < 1MB）。

- **返回格式**：  
  `{ content: '识别/讲解文案' }`  
  与现有文字对话的 `content` 一致，便于前端直接展示。

### 2. 后端逻辑（示例思路）

- 收到图片（文件或 base64）后，调用多模态 API（智谱/通义/百度/腾讯等）。
- Prompt 示例：  
  「请识别图中场景或建筑。若与王屋山、天坛极顶、愚公移山、道境广场、王屋老街等景区相关，请用 2～3 句话简要讲解；否则请简单描述画面内容。」
- 把 API 返回的文本写入 `content` 返回给小程序。

### 3. 小程序端

- 若用上传接口：`wx.uploadFile({ url: API_BASE + '/uploadImage', filePath: tempFilePath, name: 'file' })`，再拿返回的 `url` 或 `imageId` 调 `POST /api/chatImage`（若需要）。
- 若用 base64：`wx.getFileSystemManager().readFile({ filePath: tempFilePath, encoding: 'base64' })`，再 `wx.request({ url: API_BASE + '/chatImage', method: 'POST', data: { imageBase64 } })`。
- 在 `ai.js` 里已预留 `API_IMAGE_BASE` 或统一用 `API_BASE` 的 `/chatImage`，成功则用返回的 `content` 作为助手回复。

### 4. 配置

- 小程序后台 → 开发 → 开发管理 → 开发设置 → 服务器域名：把你后端域名加入 **request 合法域名**；若用 `wx.uploadFile`，还要加入 **uploadFile 合法域名**。

---

## 四、可选：纯场景识别 API（不做「讲解」）

若暂时不用大模型，只要「识别是什么场景」：

- **百度智能云**：图像识别（场景、通用物体等）  
  https://cloud.baidu.com/product/image
- **腾讯云**：图像分析、万象优图  
  需在后端或云函数里调，拿到标签后再转成一句简短说明返回给小程序。

适合先做「识别 + 固定话术」，后续再换成多模态做「讲解」。

---

## 五、小结

| 方式       | 优点                 | 需要 |
|------------|----------------------|------|
| 云函数     | 密钥不暴露、免运维   | 开通云开发、写 chatImage 云函数 |
| 自建后端   | 灵活、可接任意 API   | 一台 HTTPS 服务器、配置域名 |

**推荐**：先用**云函数 + 智谱 GLM-4V / 通义千问 VL** 实现「拍照 → 上传云存储 → 云函数调视觉 API → 返回讲解」，再在云函数里加一点王屋山相关的 prompt，效果会更好。

当前 `ai.js` 中已实现：
- **开关**：`USE_IMAGE_RECOGNITION = true` 时才会请求真实识别；为 `false` 时仍为占位文案。
- **云函数**：`USE_CLOUD && USE_IMAGE_RECOGNITION` 时，先 `wx.cloud.uploadFile` 上传到云存储，再调云函数 `IMAGE_CLOUD_FUNC`（默认 `chatImage`），传入 `{ fileID }`，返回 `{ content: '...' }`。
- **自建后端**：`API_BASE && USE_IMAGE_RECOGNITION` 时，将图片读成 base64，`POST` 到 `API_BASE + '/chatImage'`，body `{ imageBase64 }`，返回 `{ content: '...' }`。

按上面任选一种实现服务端，在 `ai.js` 里把 `USE_IMAGE_RECOGNITION` 设为 `true` 即可实现图像识别讲解。
