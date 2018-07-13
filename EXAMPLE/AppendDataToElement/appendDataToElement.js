var data = [
    {
        url: "../",
        name: "data1"
    },
    {
        url: "../../",
        name: "data2"
    }
]

var fragment = document.createDocumentFragment();
appendDataToElement(fragment, data);
document.getElementById('mylist').appendChild(fragment);