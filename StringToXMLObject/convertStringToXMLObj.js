// No utilize JQuery
var parseXml;
if (window.DOMParser) {
    parseXml = function (xmlStr) {
        return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
    };
} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
    parseXml = function (xmlStr) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    };
} else {
    parseXml = function () { return null; }
}
// example
// var xmlDoc = parseXml("<foo>Stuff</foo>");
// if (xmlDoc) {
//     window.alert(xmlDoc.documentElement.nodeName);
// }

// Utilize JQuery
var parseXmlWithJquery = function (xmlStr) {
    return jQuery.parseXml(xmlStr);
}
// example
// var xmlDoc = parseXmlWithJquery("<foo>Stuff</foo>");
// if (xmlDoc) {
//     window.alert(xmlDoc.documentElement.nodeName);
// }

var strToXMLObj = {
    parseXml: parseXml,
    parseXmlWithJquery: parseXmlWithJquery
}

module.exports = strToXMLObj