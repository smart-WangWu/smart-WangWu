本目录用于存放刀隶体字体备份。

注意：微信小程序不支持通过本地路径（如 /fonts/xxx.woff）加载字体，
当前首页已改为使用网络 URL 加载，以保证「天坛极顶」「今日景区客流」正常显示刀隶体。

若需长期稳定，可将本目录中的 Daoli-Regular.woff 上传到自己的服务器或
云存储（需 HTTPS 且配置 CORS），然后在 home.wxss 与 home.js 中把
 at.alicdn.com 的地址替换为你的字体文件 URL。
