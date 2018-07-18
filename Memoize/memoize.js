function memoize(fundamental, cache) {
    cache = cache || {};
    var shell = function(arg) {
        if(!cache.hasOwnProperty(arg)) {
            cache[arg] = fundamental(arg);
        }
        return cache[arg];
    };
    return shell;
}