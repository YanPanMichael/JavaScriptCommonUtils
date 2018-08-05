// Supported to Chrome but not supported by Safari
const getParamsValueByName = function(paramsName) {
    var url = new URL(window.location.href);
    return url.searchParams.get(paramsName+"");
}

export default getParamsValueByName;