// <a href="/static/xxxxx.csv" download="fileName">绝对路径写法</a> href文件的绝对/相对地址
// ./代表当前目录（可以省略）../代表上一级目录 /代表根目录属于绝对路径
// download 属性规定被下载的超链接目标。
// filename 规定作为文件名来使用的文本。一般在项目中不使用相对路径，因为在本地用很能没问题，但是代码上传到线上时，路径可能就不对了；
// <a href="./static/xxxxx.csv" download="fileName">相对路径写法

fileDownload(content, name = 'fileName', suffix = 'csv') {
  // 添加字节序标识，避免乱码
  const data = `\uFEFF${content}`;
  const blob = new Blob([data], { type: 'text/csv,charset=UTF-8' });
  const downloadElement = document.createElement('a');
  // 创建下载链接
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载文件名
  downloadElement.download = `${name}.${suffix}`;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  // 移除元素
  document.body.removeChild(downloadElement);
  // 释放blob对象
  window.URL.revokeObjectURL(href);
}
/** 
 content 创建文件的内容 
 blob 类文件对象 
 name 创建的文件名 suffix 文件后缀 
 下面的就是创建一个a标签然后设置href以及download属性，并执行下载操作，然后移除a标签
 */