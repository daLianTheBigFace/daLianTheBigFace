import React, { useState } from "react";
import { Button, Input } from "antd";
import ReactJson from "react-json-view";
import { Stack } from "./untils";

const newList = new Stack();

const Mystack = () => {
  const [showList, setShowList] = useState({});
  const [item, setItem] = useState();
  const [result, setRsult] = useState();
  const onInputChange = (e) => {
    const value = e.target.value;
    setItem(value);
  };
  const deepClone = (obj) => {
    let newObj = {};
    for (let key in obj) {
      let value = obj[key];
      newObj[key] =
        typeof obj[key] === "object" && value !== null
          ? deepClone(value)
          : value;
    }
    return newObj;
  };
  const handlePush = () => {
    newList.push(item);
    setShowList(deepClone(newList.list));
  };
  const handlePop = () => {
    setRsult(newList.pop());
    setShowList(deepClone(newList.list));
  };
  const handlePeek = () => {
    setRsult(newList.peek());
  };
  const handleClear = () => {
    newList.clear();
    setShowList(newList.list);
    setRsult();
    setItem();
  };
  const toResult = JSON.parse(JSON.stringify(result) || null);
  return (
    <div>
      <Input
        style={{
          width: "150px",
        }}
        type="text"
        value={item}
        onChange={onInputChange}
      />
      <Button onClick={handlePush}>入栈</Button>
      <Button onClick={handlePop}>出栈</Button>
      <Button onClick={handlePeek}>访问栈顶</Button>
      <Button onClick={handleClear}>清空栈</Button>
      <ReactJson src={showList} enableClipboard={false} />
      {toResult}
    </div>
  );
};
export default Mystack;
