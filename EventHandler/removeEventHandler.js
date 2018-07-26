/* 
object: the element or window object
type: resize, scroll (event type)
callback: the function reference 
*/

var removeEveHandler = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.removeEveHandler) {
        object.removeEveHandler(type, callback, false);
    } else if (object.attachEvent) { // IE
        object.detachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

// Example
removeEveHandler(window, "resize", function(event) {
  console.log('unresized');
});