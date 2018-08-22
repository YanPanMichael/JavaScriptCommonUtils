// Supported to Chrome but not supported by Safari
const getParamsValueByNameOnlyInChrome = function(paramsName) {
    var url = new URL(window.location.href);
    return url.searchParams.get(paramsName+"");
}

export default getParamsValueByNameOnlyInChrome;