import React from "react";
import { useHistory } from "react-router-dom";
import { Space, Button } from "antd";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            history.push("/algorithm");
          }}
        >
          算法相关
        </Button>
        <Button
          onClick={() => {
            history.push("/data-construct");
          }}
        >
          数据结构相关
        </Button>
        <Button
          onClick={() => {
            history.push("/react-base");
          }}
        >
          React相关
        </Button>
      </Space>
    </div>
  );
};
export default HomePage;
