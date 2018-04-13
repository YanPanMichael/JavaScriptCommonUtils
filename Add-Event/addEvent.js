/* 
object: the element or window object
type: resize, scroll (event type)
callback: the function reference 
*/

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

// Example
addEvent(window, "resize", function(event) {
  console.log('resized');
});