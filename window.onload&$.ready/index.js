// window.onload必须等待网页中所有内容加载完毕后(包括图片)才能执行,
// 而$(document).ready()是网页中所有DOM结构绘制完毕后执行,可能DOM元素关联的东西并没有加载完,
// 在DOM完全就绪时就可以被调用,此时,网页的所有元素对JQuery而言都是可以访问的,但是这并不意味着这些元素关联的文件都已经下载完毕

// 编写个数: window.onload不能同时编写多个,而$(document).ready()能同时编写多个
jQuery.fn = jQuery.prototype = {
  ready: function( fn ) {
      // Add the callback
      jQuery.ready.promise().done( fn );

      return this;
  },
};
jQuery.ready.promise = function( obj ) {
  if ( !readyList ) {
      
      readyList = jQuery.Deferred();

      // Catch cases where $(document).ready() is called after the browser event has already occurred.
      // we once tried to use readyState "interactive" here, but it caused issues like the one
      // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
      if ( document.readyState === "complete" ) {
          // Handle it asynchronously to allow scripts the opportunity to delay ready
          setTimeout( jQuery.ready, 1 );

      // Standards-based browsers support DOMContentLoaded
      } else if ( document.addEventListener ) {
          // Use the handy event callback
          document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

          // A fallback to window.onload, that will always work
          window.addEventListener( "load", jQuery.ready, false );

      // If IE event model is used
      } else {
          // Ensure firing before onload, maybe late but safe also for iframes
          document.attachEvent( "onreadystatechange", DOMContentLoaded );

          // A fallback to window.onload, that will always work
          window.attachEvent( "onload", jQuery.ready );

          // If IE and not a frame
          // continually check to see if the document is ready
          var top = false;

          try {
              top = window.frameElement == null && document.documentElement;
          } catch(e) {}

          if ( top && top.doScroll ) {
              (function doScrollCheck() {
                  if ( !jQuery.isReady ) {

                      try {
                          // Use the trick by Diego Perini
                          // http://javascript.nwbox.com/IEContentLoaded/
                          top.doScroll("left");
                      } catch(e) {
                          return setTimeout( doScrollCheck, 50 );
                      }

                      // and execute any waiting functions
                      jQuery.ready();
                  }
              })();
          }
      }
  }
  return readyList.promise( obj );
};