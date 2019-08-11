(function(){
  var node = document.createElement('div');
  node.innerText = (!!window.ActiveXObject || 'ActiveXObject' in window) ? 'Work in IE browser' : 'Not work in IE browser';
  document.body.appendChild(node)
})()