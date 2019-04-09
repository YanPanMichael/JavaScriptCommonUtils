const getFackMembers = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`;
  const request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = () => (request.status === 200) ?
    resolves(JSON.parse(request.response).results) :
    rejects(Error(request.responseText));
  request.onerror = (err) => rejects(err);
  request.send();
});

getFackMembers(5).then(
  resMenbers => console.log(resMenbers),
  err => console.error(new Error('Can not load members ', err))
);