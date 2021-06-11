什么是伪元素？
CSS 伪元素用于设置元素指定部分的样式。

例如，它可用于：

设置元素的首字母、首行的样式
在元素的内容之前或之后插入内容
语法
伪元素的语法：

selector::pseudo-element {
  property: value;
}
::first-line 伪元素
::first-line 伪元素用于向文本的首行添加特殊样式。

下面的例子为所有 <p> 元素中的首行添加样式：

实例
p::first-line {
  color: #ff0000;
  font-variant: small-caps;
}
亲自试一试
注意：::first-line 伪元素只能应用于块级元素。

以下属性适用于 ::first-line 伪元素：

字体属性
颜色属性
背景属性
word-spacing
letter-spacing
text-decoration
vertical-align
text-transform
line-height
clear
请注意双冒号表示法 - ::first-line 对比 :first-line

在 CSS3 中，双冒号取代了伪元素的单冒号表示法。这是 W3C 试图区分伪类和伪元素的尝试。

在 CSS2 和 CSS1 中，伪类和伪元素都使用了单冒号语法。

为了向后兼容，CSS2 和 CSS1 伪元素可接受单冒号语法。

::first-letter 伪元素
::first-letter 伪元素用于向文本的首字母添加特殊样式。

下面的例子设置所有 <p> 元素中文本的首字母格式：

实例
p::first-letter {
  color: #ff0000;
  font-size: xx-large;
}
亲自试一试
注意：::first-letter 伪元素只适用于块级元素。

下面的属性适用于 ::first-letter 伪元素：

字体属性
颜色属性
背景属性
外边距属性
内边距属性
边框属性
text-decoration
vertical-align（仅当 "float" 为 "none"）
text-transform
line-height
float
clear
伪元素和 CSS 类
伪元素可以与 CSS 类结合使用：

实例
p.intro::first-letter {
  color: #ff0000;
  font-size: 200%;
}
亲自试一试
上面的例子将以红色和较大的字体显示 class="intro" 的段落的首字母。

多个伪元素
也可以组合几个伪元素。

在下面的例子中，段落的第一个字母将是红色，字体大小为 xx-large。第一行的其余部分将变为蓝色，并使用小型大写字母。该段的其余部分将是默认的字体大小和颜色：

实例
p::first-letter {
  color: #ff0000;
  font-size: xx-large;
}

p::first-line {
  color: #0000ff;
  font-variant: small-caps;
}
亲自试一试
CSS - ::before 伪元素
::before 伪元素可用于在元素内容之前插入一些内容。

下面的例子在每个 <h1> 元素的内容之前插入一幅图像：

实例
h1::before {
  content: url(smiley.gif);
}
亲自试一试
CSS - ::after 伪元素
::after 伪元素可用于在元素内容之后插入一些内容。

下面的例子在每个 <h1> 元素的内容之后插入一幅图像：

实例
h1::after {
  content: url(smiley.gif);
}
亲自试一试
CSS - ::selection 伪元素
::selection 伪元素匹配用户选择的元素部分。

以下 CSS 属性可以应用于 ::selection：

color
background
cursor
outline
下例使所选文本在黄色背景上显示为红色：

实例
::selection {
  color: red; 
  background: yellow;
}


所有 CSS 伪元素
选择器	例子	例子描述
::after	p::after	在每个 <p> 元素之后插入内容。
::before	p::before	在每个 <p> 元素之前插入内容。
::first-letter	p::first-letter	选择每个 <p> 元素的首字母。
::first-line	p::first-line	选择每个 <p> 元素的首行。
::selection	p::selection	选择用户选择的元素部分。


所有 CSS 伪类
选择器	例子	例子描述
:active	a:active	选择活动的链接。
:checked	input:checked	选择每个被选中的 <input> 元素。
:disabled	input:disabled	选择每个被禁用的 <input> 元素。
:empty	p:empty	选择没有子元素的每个 <p> 元素。
:enabled	input:enabled	选择每个已启用的 <input> 元素。
:first-child	p:first-child	选择作为其父的首个子元素的每个 <p> 元素。
:first-of-type	p:first-of-type	选择作为其父的首个 <p> 元素的每个 <p> 元素。
:focus	input:focus	选择获得焦点的 <input> 元素。
:hover	a:hover	选择鼠标悬停其上的链接。
:in-range	input:in-range	选择具有指定范围内的值的 <input> 元素。
:invalid	input:invalid	选择所有具有无效值的 <input> 元素。
:lang(language)	p:lang(it)	选择每个 lang 属性值以 "it" 开头的 <p> 元素。
:last-child	p:last-child	选择作为其父的最后一个子元素的每个 <p> 元素。
:last-of-type	p:last-of-type	选择作为其父的最后一个 <p> 元素的每个 <p> 元素。
:link	a:link	选择所有未被访问的链接。
:not(selector)	:not(p)	选择每个非 <p> 元素的元素。
:nth-child(n)	p:nth-child(2)	选择作为其父的第二个子元素的每个 <p> 元素。
:nth-last-child(n)	p:nth-last-child(2)	选择作为父的第二个子元素的每个<p>元素，从最后一个子元素计数。
:nth-last-of-type(n)	p:nth-last-of-type(2)	选择作为父的第二个<p>元素的每个<p>元素，从最后一个子元素计数
:nth-of-type(n)	p:nth-of-type(2)	选择作为其父的第二个 <p> 元素的每个 <p> 元素。
:only-of-type	p:only-of-type	选择作为其父的唯一 <p> 元素的每个 <p> 元素。
:only-child	p:only-child	选择作为其父的唯一子元素的 <p> 元素。
:optional	input:optional	选择不带 "required" 属性的 <input> 元素。
:out-of-range	input:out-of-range	选择值在指定范围之外的 <input> 元素。
:read-only	input:read-only	选择指定了 "readonly" 属性的 <input> 元素。
:read-write	input:read-write	选择不带 "readonly" 属性的 <input> 元素。
:required	input:required	选择指定了 "required" 属性的 <input> 元素。
:root	root	选择元素的根元素。
:target	#news:target	选择当前活动的 #news 元素（单击包含该锚名称的 URL）。
:valid	input:valid	选择所有具有有效值的 <input> 元素。
:visited	a:visited	选择所有已访问的链接。