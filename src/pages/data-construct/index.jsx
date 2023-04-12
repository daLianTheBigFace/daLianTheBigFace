import React from "react";
import { useHistory } from "react-router-dom";
import { Space, Button } from "antd";

const DataConstruct = () => {
  const history = useHistory();
  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            history.push("stack");
          }}
        >
          栈
        </Button>
        <Button
          onClick={() => {
            history.push("queue");
          }}
        >
          队
        </Button>
      </Space>
    </div>
  );
};
export default DataConstruct;
