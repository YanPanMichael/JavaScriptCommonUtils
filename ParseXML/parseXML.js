const parseXML1 = function (responseXML) {
    var users = [];
    var userNodes = responseXML.getElementsByTagName('users');
    var node, usernameNodes, usernameNode, username, realnameNodes, realnameNode, realname, emailNodes, emailNode, email;
    for (var i = 0, len = userNodes.length; i < len; i++) {
        node = userNodes[i];
        username = realname = email = "";
        usernameNodes = node.getElementsByTagName('username');
        if (usernameNodes && usernameNodes[0]) {
            usernameNode = usernameNodes[0];
            username = (usernameNodes.firstChild) ? usernameNodes.firstChild.nodeValue : "";
        }
        realnameNodes = node.getElementsByTagName('realname');
        if (realnameNodes && realnameNodes[0]) {
            realnameNode = realnameNodes[0];
            username = (realnameNodes.firstChild) ? usernameNodes.firstChild.nodeValue : "";
        }
        emailNodes = node.getElementsByTagName('email');
        if (emailNodes && emailNodes[0]) {
            emailNode = emailNodes[0];
            email = (emailNodes.firstChild) ? emailNodes.firstChild.nodeValue : "";
        }
        user[i] = {
            id: node.getAttributte('id'),
            username: username,
            realname: realname,
            email: email
        };
    }
    return users;
}

const parseXML2 = function (responseXML) {
    var users = [];
    var userNodes = responseXML.getElementsByTagName_r('users');
    for (var i = 0, len = userNodes.length; i < len; i++) {
        users[i] = {
            id: userNodes[i].getAttribute('id'),
            username: userNodes[i].getAttribute('username'),
            realname: userNodes[i].getAttribute('realname'),
            email: userNodes[i].getAttribute('email')
        };
    }
    return users;
}

export {
    parseXML1,
    parseXML2
}