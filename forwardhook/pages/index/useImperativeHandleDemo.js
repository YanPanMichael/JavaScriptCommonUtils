import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const Input = (props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  useEffect(() => {
    inputRef.current.value = props.initialValue;
  }, []);
  return (
    <input ref={inputRef}
      onChange={e => props.onChange(e.target.value)} />
  );
};

const MInput = forwardRef(Input);

export default () => {

  const r1 = useRef();
  const r2 = useRef();

  return (
    <div>
      <MInput ref={r1}
        initialValue='100'
        onChange={(x) => console.log(`r1 ${x}`)}
      />
      <MInput ref={r2}
        initialValue='hello'
        onChange={(x) => console.log(`r2 ${x}`)}
      />
      <button onClick={() => {r1.current.focus()}}>focus r1</button>
      <button onClick={() => {r2.current.focus()}}>focus r2</button>
    </div>
  )
}