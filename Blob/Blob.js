// Blob
// Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。 

// Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。

// 要从其他非blob对象和数据构造一个 Blob，请使用 Blob() 构造函数。要创建一个 blob 数据的子集 blob，请使用 slice() 方法。要获取用户文件系统上的文件对应的 Blob 对象，请参阅 File 文档。

// 接受 Blob 对象的API也被列在 File 文档中。
// 注意：slice() 方法原本接受 length 作为第二个参数，以表示复制到新 Blob 对象的字节数。如果设置的参数使 start + length 超出了源 Blob 对象的大小，则返回从开始到结尾的所有数据。
// 注意：slice() 方法在某些浏览器和版本上带有浏览器引擎前缀：比如 Firefox 12 及更早版本的blob.mozSlice() 和 Safari 中的blob.webkitSlice()。 没有浏览器引擎前缀的老版本 slice() 方法有不同的语义，并且已过时。Firefox 30 取消了对 blob.mozSlice() 的支持。

var typedArray = GetTheTypedArraySomehow();
var blob = new Blob([typedArray.buffer], {type: 'application/octet-stream'}); // 传入一个合适的 MIME 类型
var url = URL.createObjectURL(blob);
// 会产生一个类似 blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串
// 你可以像使用普通 URL 那样使用它，比如用在 img.src 上。

//一种从Blob中读取内容的方法是使用 FileReader。以下代码将 Blob 的内容作为类型数组读取：
var reader = new FileReader();
reader.addEventListener("loadend", function() {
   // reader.result 包含被转化为类型数组 typed array 的 blob
});
reader.readAsArrayBuffer(blob);
// Copy to Clipboard
// 另一种读取Blob中内容的方式是使用Response对象。下述代码将Blob中的内容读取为文本：

var text = await (new Response(blob)).text();
// Copy to Clipboard
// 通过使用 FileReader 的其它方法可以把 Blob 读取为字符串或者数据URL。