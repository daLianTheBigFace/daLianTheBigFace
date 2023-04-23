import React, { useState, useEffect, useRef, useMemo } from "react";
import { Strong } from "./utils";
const ReactBase = () => {
  const renderNumRef = useRef(1);
  const [num, updateNum] = useState(1);
  const [counter, setCounter] = useState(1);
  const fixNum = useMemo(() => {
    return num.toFixed(2);
  }, [num]);
  // useEffect(()=>{

  // },[num])
  const isOdd = renderNumRef.current % 2 !== 0;
  console.log(`渲染次数${renderNumRef.current}`, isOdd, fixNum);
  renderNumRef.current += 1;
  return (
    <div>
      <p
        onClick={() => {
          updateNum(num + 1);
        }}
      >
        <span>值为</span>
        {isOdd ? <Strong text={fixNum} /> : null}
      </p>
      <p>
        <span
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          {`渲染${counter}`}
        </span>
      </p>
    </div>
  );
};

export default ReactBase;
