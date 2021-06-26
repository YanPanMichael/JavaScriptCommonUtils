// DFS
let source = [ // 待检索元数据
  {
      label: '江苏省',
      children: [
          {
              label: '南京市',
              children: [
                  {
                      label: 'a区',
                  },
                  {
                      label: 'b区',
                  },
              ],
          },
          {
              label: '无锡市',
              children: [
                  {
                      label: '南区',
                  },
                  {
                      label: 'c区',
                  },
              ],
          },
      ],
  },
  {
      label: '海南省',
      children: [
          {
              label: '海口市',
              children: [
                  {
                      label: 'd区',
                  },
                  {
                      label: 'e区',
                  },
              ],
          },
          {
              label: '三亚市',
              children: [
                  {
                      label: 'f区',
                  },
                  {
                      label: 'g区',
                  },
              ],
          },
      ],
  },
];

function dfs(node) {
   const res = [];
   if(node) {
       let stack = [];
       stack.push(node);
       while(stack.length) {
           const curr = stack.pop();
           res.push({strLabel: `${curr.strLabel || ''}-${curr.label}`});
           const childrenList = curr.children || [];
           for(let i=0; i<childrenList.length; i++) {
               console.log('curr ', curr.children[i])
               stack.push({...curr.children[i], strLabel: `${curr.strLabel || ''}-${curr.label}`});
           }
       }
   }
   return res;
}

function search(str) { 
   if(typeof str !== 'string') throw new Error('input error');
   let totalLabel = [];
   source.forEach((node) => {
       const nodeRes = dfs(node);
       console.log('array: ', nodeRes);
       totalLabel = totalLabel.concat(nodeRes);
   })
   // console.log('totalLabel: ', totalLabel)
   return totalLabel.map(node => node.strLabel).filter((strLabel) => {
       return strLabel.includes(str);
   })
}

console.log('res: ', search('南'));


source.reduce((sum, cur) => {
  const l = cur.children.length ? cur.label : cur
}, [])