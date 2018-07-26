var Timer = require('../../Timer/Timer');

Timer.start("createElement");
var timRef = null;
for (let index = 0; index < 10; index++) {
    // let element = document.createElement('div')
    if(timRef) {
        clearTimeout(timRef);
    }
    timRef = setTimeout(function(){}, 100);
}
Timer.stop("createElement");
console.log('time spend on create div element: '+Timer.getTime("createElement"));