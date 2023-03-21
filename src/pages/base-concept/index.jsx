import { useCallback, useState } from "react";
import { Space, Button, Input } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ReactJson from "react-json-view";
import "./Calendar.less";
let example = [
  {
    id: 1,
    name: "0",
    children: [
      {
        id: 2,
        name: "0-1",
      },
    ],
  },
  {
    id: 3,
    name: "1",
    children: [
      {
        id: 4,
        name: "1-1",
      },
      {
        id: 5,
        name: "1-2",
      },
    ],
  },
  {
    id: 6,
    name: "2",
    children: [
      {
        id: 7,
        name: "2-1",
      },
      {
        id: 8,
        name: "2-2",
        children: [
          {
            id: 9,
            name: "2-2-1",
          },
          {
            id: 10,
            name: "2-2-2",
          },
        ],
      },
    ],
  },
];
const Index = () => {
  const [date, setDate] = useState(moment());
  const [node, setNode] = useState(example);
  function myFn(e) {
    console.log(e || "防抖成功");
  }
  function debounce(fn, delay) {
    let timeout = null;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  const fn = useCallback(debounce(myFn, 500), []);
  const prevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };
  const nextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };
  const renderCalendarHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>Prev</button>
        <div className="calendar-title">{date.format("MMMM YYYY")}</div>
        <button onClick={nextMonth}>Next</button>
      </div>
    );
  };
  const renderCalendarDays = () => {
    const weekdays = moment.weekdays();
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-header" key={`${i}`}>
          {weekdays[i]}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };
  const renderCalendarCells = () => {
    const monthStart = date.clone().startOf("month");
    const monthEnd = date.clone().endOf("month");
    const currentDay = moment();
    const startDiff = monthStart.weekday();
    const endDiff = 6 - monthEnd.weekday();
    const totalDays = monthEnd.diff(monthStart, "days") + 1;
    const days = [];
    for (let i = 0; i < startDiff; i++) {
      days.push(
        <div className="calendar-cell-empty" key={`startDiff${i}`}></div>
      );
    }
    for (let i = 1; i <= totalDays; i++) {
      const day = monthStart.clone().add(i - 1, "days");
      const isCurrentMonth = day.month() === date.month();
      const isToday = day.isSame(currentDay, "day");
      const classNames = [
        "calendar-cell",
        isCurrentMonth ? "current-month" : "other-month",
        isToday ? "today" : "",
      ].join(" ");
      days.push(
        <div className={classNames} key={`totalDays${i}`}>
          {i}
        </div>
      );
    }
    for (let i = 0; i < endDiff; i++) {
      days.push(
        <div className="calendar-cell-empty" key={`endDiff${i}`}></div>
      );
    }
    return <div className="calendar-cells">{days}</div>;
  };
  const history = useHistory();
  const deepFirstSearch = (nodes) => {
    let reasult = [];
    nodes.forEach((item) => {
      if (!item) return;
      const map = (arr) => {
        if (!arr.name) return;
        reasult.push(arr.name);
        arr.children && arr.children.forEach((itm) => map(itm));
      };
      map(item);
    });
    if (!reasult.length) return;
    return setNode(reasult);
  };
  const whildFirstSearch = (nodes) => {
    let arr = [];
    let newNodes = JSON.parse(JSON.stringify(nodes));
    while (newNodes.length) {
      let nod = newNodes.shift();
      if (!nod.name) return;
      arr.push(nod.name);
      nod.children && newNodes.push(...nod.children);
    }
    return setNode(arr);
  };
  return (
    <div className="container">
      <div className="box-1">
        <div className="calendar">
          {renderCalendarHeader()}
          {renderCalendarDays()}
          {renderCalendarCells()}
        </div>
        <Input
          style={{
            width: "150px",
          }}
          type="text"
          onChange={(e) => fn(e.target.value)}
        />
        <Button
          onClick={() => {
            history.push("./game");
          }}
        >
          game
        </Button>
        <br />
        <span>例子</span>
        <ReactJson src={node} enableClipboard={false} />
        <br />
        <Space>
          <Button
            onClick={() => {
              deepFirstSearch(node);
            }}
            type="primary"
          >
            深度优先遍历
          </Button>
          <Button
            onClick={() => {
              whildFirstSearch(node);
            }}
            type="primary"
          >
            广度优先遍历
          </Button>
          <Button
            onClick={() => {
              setNode(example);
            }}
            type="primary"
            danger
          >
            还原
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default Index;
