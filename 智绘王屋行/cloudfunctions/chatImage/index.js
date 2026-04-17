const cloud = require('wx-server-sdk');
const https = require('https');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

/**
 * 同步版：直接返回 { content }，小程序端无需轮询数据库。
 * 这样你拿到同学代码后，只要部署本云函数并配置自己的 API Key 即可用，不依赖数据库和权限。
 */
exports.main = async (event, context) => {
  const { fileID } = event;
  if (!fileID) {
    return { content: '未获取到图片，请重新上传。' };
  }

  // API Key：优先用云函数环境变量 ZHIPU_API_KEY，否则用下面这行（请换成你自己的 Key）
  let API_KEY = process.env.ZHIPU_API_KEY || "14c1655e6a704ad3a385960ade5bb0e2.DvzITFZktuVH4VDl";
  API_KEY = (API_KEY || '').trim().replace(/\s+/g, '').replace(/["']/g, '');
  if (!API_KEY) {
    return { content: '请配置有效的智谱 API Key（云函数环境变量 ZHIPU_API_KEY 或代码内）。' };
  }

  let resultContent = '';
  try {
    const downloadRes = await cloud.downloadFile({ fileID });
    const buffer = downloadRes.fileContent;
    if (buffer.length > 2 * 1024 * 1024) {
      return { content: '图片超过 2MB，请压缩后重试。' };
    }
    const base64Image = buffer.toString('base64');

    const postData = JSON.stringify({
      model: "glm-4v",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: "你是王屋山导游，100-200字讲解图片内容，非王屋山则礼貌说明" },
          { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }],
      max_tokens: 500,
      temperature: 0.7
    });

    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'open.bigmodel.cn',
        path: '/api/paas/v4/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
        timeout: 20000
      };
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve(body));
      });
      req.on('error', (e) => reject(e));
      req.on('timeout', () => reject(new Error('请求超时')));
      req.write(postData);
      req.end();
    });

    const result = JSON.parse(response);
    if (result.error) {
      resultContent = `识别失败：${result.error.message}`;
    } else {
      resultContent = result.choices?.[0]?.message?.content || "未识别出内容";
    }
  } catch (err) {
    resultContent = `处理失败：${err.message || '未知错误'}`;
  }

  return { content: resultContent };
};
