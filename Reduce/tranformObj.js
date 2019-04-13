const types = ["component", "research"];

const data = [
  { type: "component", id: 111 },
  { type: "component", id: 222 },
  { type: "component", id: 333 },
  { type: "research", id: 444 },
  { type: "component", id: 555 },
  { type: "component", id: 666 },
  { type: "research", id: 777 },
  { type: "research", id: 888 },
  { type: "component", id: 999 },
  { type: "research", id: 000 }
];

const target = {
  component: [
    { type: "component", id: 111 },
    { type: "component", id: 222 },
    { type: "component", id: 333 },
    { type: "component", id: 555 },
    { type: "component", id: 666 },
    { type: "component", id: 999 }
  ],
  research: [
    { type: "research", id: 444 },
    { type: "research", id: 777 },
    { type: "research", id: 888 },
    { type: "research", id: 000 }
  ]
};

const transform = (types, data) => {
  return types.reduce(
    (arrObj, nextType) => ({
      ...arrObj,
      [nextType]: data.filter(dataItem => dataItem.type === nextType)
    }), {}
  );
};

console.log(transform(types, data));

