//Search object array item entires values which includes target text
export default filterArrayData = (inputArray, searchTarget) => {
  const copyedArray = [...inputArray];
  if (!searchTarget) {
    return copyedArray;
  }
  return copyedArray.filter((item) => {
    return Object.keys(item).some(key => {
      return item[key].toString().toLowerCase().includes(searchTarget.toLowerCase())
    })
  })
}