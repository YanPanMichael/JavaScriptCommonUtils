var errs = document.querySelectorAll('div.warning, div.notice');

var erros = [],
    divs = document.getElementsByTagName('div'),
    classname = '';
for (var i = 0, len=divs.length; i<len; i++) {
    classname = divs[i].className;
    if (classname === 'notice' || classname === 'warning') {
        errs.push(divs[i]);
    }
}