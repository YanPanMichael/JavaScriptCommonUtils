import React, { useState, useEffect, useRef } from 'react';

export default () => {
 const [a, setA] = useState(0);
 const [b, setB] = useState(0);
 const ref = useRef({ a, b });
 useEffect(() => {
  let { a: prevA, b: prevB } = ref.current;
  console.log('更新前:', prevA, prevB);
  console.log('更新后:', a, b);
  if (prevA !== a && prevB !== b) { // 当a和b都发生变化时，才执行
    console.log('update!');
    alert("update!");
    ref.current = { a, b };
    }
  }, [a, b]);
  return (
    <div>
      <h1>{a + b}</h1>
      <button onClick={_ => setA(d => d + 1)}>Chang A</button>
      <button onClick={_ => setB(d => d + 1)}>Chang B</button>
    </div>
  )
}
