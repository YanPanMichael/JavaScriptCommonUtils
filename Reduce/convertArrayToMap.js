const color = [
  {
    id: '1',
    type: 'red'
  },
  {
    id: '2',
    type: 'blue'
  },
  {
    id: '3',
    type: 'green'
  },
  {
    id: '4',
    type: 'grey'
  },
  {
    id: '5',
    type: 'purple'
  },
]

//{id: {id: type}}
const hashColor = color.reduce(
  (hash, {id, type}) => {
    hash[id] = {id,type}
    return hash;
  }, {});

  console.log(hashColor);
  