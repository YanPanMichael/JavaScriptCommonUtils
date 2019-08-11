(function(){
  document.body.appendChild(
    (!!window.ActiveXObject || 'ActiveXObject' in window) ?
    <p>Work in IE browser</p> : ''
  )
})()