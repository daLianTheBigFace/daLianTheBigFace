import React, { useState, useEffect } from "react";
import { Input, Space, Button } from "antd";
import { Queue, Dqueue } from "./untils";

const newList = new Queue();
const newDbList = new Dqueue();

const MyQueue = () => {
  // 击鼓传花
  const hotPotato = (names = [], num) => {
    const eliminatedList = []; //被淘汰的
    for (let i = 0; i < names.length; i += 1) {
      newList.enqueue(names[i]); // 把参与者入队
    }
    while (newList.size() > 1) {
      for (let i = 0; i < num; i += 1) {
        newList.enqueue(newList.dequeue());
      }
      eliminatedList.push(newList.dequeue());
    }
    return {
      eliminated: eliminatedList,
      winner: newList.dequeue(),
    };
  };
  return (
    <div>
      <Button
        onClick={() => {
          const nameList = ["lily", "martin", "sam", "jack", "jake", "john"];
          const res = hotPotato(nameList, 100);
          console.log(res.eliminated, res.winner);
        }}
      >
        click
      </Button>
      <Button onClick={()=>{
        console.log(newDbList)
      }}>回文数</Button>
    </div>
  );
};

export default MyQueue;
