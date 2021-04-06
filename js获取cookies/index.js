// w3cschool
export function getCookie(cName) {
  if (window.document.cookie.length > 0) {
    let cStart = window.document.cookie.indexOf(`${cName}=`);
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = window.document.cookie.indexOf(';', cStart);
      if (cEnd === -1) cEnd = window.document.cookie.length;
      return unescape(window.document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
}

// quirksmode
export function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}