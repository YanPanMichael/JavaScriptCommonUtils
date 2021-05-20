// 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
getBoundingClientRect()

var box=document.getElementById('box');         // 获取元素

alert(box.getBoundingClientRect().top);         // 元素上边距离页面上边的距离

alert(box.getBoundingClientRect().right);       // 元素右边距离页面左边的距离

alert(box.getBoundingClientRect().bottom);      // 元素下边距离页面上边的距离

alert(box.getBoundingClientRect().left);        // 元素左边距离页面左边的距离