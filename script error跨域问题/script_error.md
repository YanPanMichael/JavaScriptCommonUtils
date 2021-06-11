、Script Error是如何产生的
跨域资源引用
如：wpk.ucweb.com 下的页面引用了属于 http://image.uc.cn(cdn服务) 的 demo.js 文件。若运行中demo.js内部报了一个异常，那么探针只会检测到一个 script error的异常。这是由于浏览器基于安全考虑故意隐藏了其它域JS文件抛出的具体错误信息

2、如何解决
给script标签增加 crossorigin 属性，如：

给静态资源服务器的HTTP响应头增加 Access-Control-Allow-Origin: * 或者 Access-Control-Allow-Origin: http://image.uc.cn