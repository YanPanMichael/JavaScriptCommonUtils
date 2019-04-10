const colors = ['blue','yellow','green','white','yellow','blue','red','red','blue','red'];

const distinctColor = colors.reduce(
  (resArr, colorElem) => {
    if([...resArr].includes(colorElem)) {
      return [...resArr];
    } else {
      return [...resArr, colorElem];
    }
  }, []);

  console.log(distinctColor);
  