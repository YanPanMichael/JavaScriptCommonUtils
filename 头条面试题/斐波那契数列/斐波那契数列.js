function fabnaq(n) {
  if(n === 1) return 1
  return fabnaq(n-1) + n;
}

function fabnaq2(N) {
  // recursion + memoization
  if(N<=1) return N;

  let pre2 = 0, pre1 = 1, result = 0;
  for(let i=1; i<N; i++) {
    result = pre1 + pre2;
    pre2 = pre1;
    pre1 = result;
  }
  return result;
}

console.log('res: ', fabnaq2(5))