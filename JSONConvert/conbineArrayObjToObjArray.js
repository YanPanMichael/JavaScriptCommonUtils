const conbineArrayObjToObjArray = function(subArray) {
    let newSubObj = {};
    newSubObj = subArray.reduce((result, currentObj) => {
        return Object.keys(currentObj).forEach((key) => {
            if(!result[key])
                result[key] = [...new Set([].concat(currentObj[key]))]
            else 
                result[key] = [...new Set(result[key].concat(currentObj[key]))]
        }), result
    }, {});
    return newSubObj;
}

export default conbineArrayObjToObjArray;