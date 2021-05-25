// 滑动窗口
function lengthOfLagestSubString(list) {
  const set = new Set();
  let i = 0, j = 0, maxLength = 0;
  if(!list.length) return maxLength;
  for (i; i < list.length; i++) {
    const elem = list[i];
    if(!set.has(elem)){
      set.add(elem);
      maxLength = Math.max(set.size, maxLength);
    } else {
      while(set.has(elem)){
        set.delete(list[j]);
        j++;
      }
      set.add(elem);
    }
  }
  return maxLength;
}

var test = 'abcdacbbddca';
lengthOfLagestSubString(test); // 4