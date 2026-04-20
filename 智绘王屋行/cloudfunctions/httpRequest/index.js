// 云函数：HTTP请求
const cloud = require('wx-server-sdk');
const axios = require('axios');
cloud.init();

exports.main = async (event, context) => {
  const { url, method = 'GET', data = {} } = event;
  
  if (!url) {
    return { success: false, error: '缺少URL参数' };
  }
  
  try {
    const response = await axios({
      url,
      method,
      data: method !== 'GET' ? data : undefined,
      params: method === 'GET' ? data : undefined,
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (e) {
    return {
      success: false,
      error: e.message || '请求失败'
    };
  }
};
