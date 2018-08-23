  // parseUri 1.2.2
  // (c) Steven Levithan <stevenlevithan.com>
  // MIT License
  function parseUri(str) {
    var o = parseUri.options;
    var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str);
    var uri = {};
    var i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
      if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
  };

  parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host",
      "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
      name: "queryKey",
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };


  // Get all the information you possibly can about the URI given by name and
  // return it as a suitable object.
  function getHost(name) {
    // If the given name contains "http:"
    if (/http(s?):/.test(name)) {
      // Prase the URI into all its little bits
      var uri = parseUri(name);

      // Store the fact that it is a remote URI
      uri.remote = true;

      // Store the user and password as a separate auth object
      uri.auth = { username: uri.user, password: uri.password };

      // Split the path part of the URI into parts using '/' as the delimiter
      // after removing any leading '/' and any trailing '/'
      var parts = uri.path.replace(/(^\/|\/$)/g, '').split('/');

      // Store the first part as the database name and remove it from the parts
      // array
      uri.db = parts.pop();

      // Restore the path by joining all the remaining parts (all the parts
      // except for the database name) with '/'s
      uri.path = parts.join('/');

      return uri;
    }

    // If the given name does not contain 'http:' then return a very basic object
    // with no host, the current path, the given name as the database name and no
    // username/password
    return { host: '', path: '/', db: name, auth: false };
  }

  // Generate a URL with the host data given by opts and the given path
  function genUrl(opts, path) {
    // If the host is remote
    if (opts.remote) {
      // If the host already has a path, then we need to have a path delimiter
      // Otherwise, the path delimiter is the empty string
      var pathDel = !opts.path ? '' : '/';

      // Return the URL made up of all the host's information and the given path
      return opts.protocol + '://' + opts.host + ':' + opts.port + '/' + opts.path
        + pathDel + opts.db + '/' + path;
    }

    // If the host is not remote, then return the URL made up of just the
    // database name and the given path
    return '/' + opts.db + '/' + path;
  };

  var url = window.location.href;
  var user = parseUri(url)['user'];
  console.log('user' + user);
