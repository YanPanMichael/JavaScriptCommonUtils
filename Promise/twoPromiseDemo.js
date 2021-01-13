const handleFormSubmit = async (isEdit, finishThenDone) => {
  if (isEdit) {
    modifyContent().then((res) => {
      if (res.success) {
        modifyVideo(res.data).then((result) => {
          if (result.success) {
            finishThenDone();
          }
        });
      }
    });
  }
  // else {
  //   createContent().then((res) => {
  //     if (res.success) {
  //       batchAddVideo(res.data).then((result) => {
  //         if (result.success) {
  //           finishThenDone();
  //         }
  //       });
  //     }
  //   });
  // }
}

const modifyContent = (params) => {
  return new Promise((resolve, reject) => {
    const obj = {
      resolve,
      reject,
      params,
    };
    modifyContentFunc(obj);
  });
}

async function modifyContentFunc(obj) {
  const {resolve, reject, params} = obj;
  try {
    const data = await fetchDataFunc1(params);
    if (data && data.status === 'succeed') {
      console.log('成功');
      resolve(data);
    } else {
      console.log('异常');
      reject(data);
    }
  } catch (e) {
    console.log(`报错：${e.message}` || '网络异常');
    reject(e);
  }
}

function fetchDataFunc1(params) {
  return fetch('');
}

const modifyVideo = (params) => {
  return new Promise((resolve, reject) => {
    const obj = {
      resolve,
      reject,
      params,
    };
    modifyVideoFunc(obj);
  });
}

async function modifyVideoFunc(obj) {
  const {resolve, reject, params} = obj;
  try {
    const data = await fetchDataFunc2(params);
    if (data && data.status === 'succeed') {
      console.log('成功');
      resolve(data);
    } else {
      console.log('异常');
      reject(data);
    }
  } catch (e) {
    console.log(`报错：${e.message}` || '网络异常');
    reject(e);
  }
}

function fetchDataFunc2(params) {
  return fetch('');
}

handleFormSubmit(true, console.log('a'))