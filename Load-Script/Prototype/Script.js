
new Element("script", {src: "myBigCodeLibrary.js", type: "text/javascript"});

if (iNeedSomeMore) {
    Script.load("myBigCodeLibrary.js"); // includes code for myFancyMethod();
    myFancyMethod(); // cool, no need for callbacks!
}

var Script = {
    _loadedScripts: [],
    include: function(script) {
        // include script only once
        if (this._loadedScripts.include(script)) {
            return false;
        }
        // request file synchronous
        var code = new Ajax.Request(script, {
            asynchronous: false,
            method: "GET",
            evalJS: false,
            evalJSON: false
        }).transport.responseText;
        // eval code on global level
        if (Prototype.Browser.IE) {
            window.execScript(code);
        } else if (Prototype.Browser.WebKit) {
            $$("head").first().insert(Object.extend(
                new Element("script", {
                    type: "text/javascript"
                }), {
                    text: code
                }
            ));
        } else {
            window.eval(code);
        }
        // remember included script
        this._loadedScripts.push(script);
    }
};