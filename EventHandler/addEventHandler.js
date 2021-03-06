/* 
object: the element or window object
type: resize, scroll (event type)
callback: the function reference 
*/

const addEveHandler = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) { // IE
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

// Example
addEveHandler(window, "resize", function(event) {
  console.log('resized');
});

export default addEveHandler;