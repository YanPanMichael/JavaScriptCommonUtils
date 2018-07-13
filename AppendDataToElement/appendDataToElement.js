var appendDataToElement = function(appendToElement, data) {
    var a, li;
    for (var i=0, max=data.length; i< max; i++) {
        a = document.createElement('a');
        a.href = data[i].url;
        a.appendChild(document.createTextNode(data[i].name));
        li = document.createElement('li');
        li.appendChild(a);
        appendToElement.appendChild(li);
    }
}

// module.exports = appendDataToElement;