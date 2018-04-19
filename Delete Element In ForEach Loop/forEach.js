var review = ['a', 'b', 'c', 'b', 'a'];

review.forEach((item, index, arrayObj) => {
  if (item === 'a') {
    arrayObj.splice(index, 1);
  }
});

console.log(review);