function maxSubArray(list) {
  if(!Array.isArray(list)) throw new Error('input error');
  const length = list.length;
  let memo = new Array(length);
  memo[0] = list[0];
  for(let i=1; i < length; i++) {
    const curr = list[i];
    memo[i] = Math.max(memo[i-1] + curr, curr);
  }
  let max = list[0];
  for(let j=1; j < memo.length; j++) {
    max = Math.max(max, memo[j]);
  }
  return max;
}

const test = [1,2-3,5,2,-1,9,3,2];

console.log('res', maxSubArray(test));