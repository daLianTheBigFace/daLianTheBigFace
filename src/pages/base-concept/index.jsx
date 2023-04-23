import { useCallback, useState } from "react";
import { Space, Button, Input } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ReactJson from "react-json-view";
import "./Calendar.less";
let tempArr = [];
let example = [
  {
    id: 1,
    name: "0",
    func: () => {
      console.log("我是对象里的方法");
    },
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
            func: () => {
              console.log("我是对象里的方法");
            },
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
  // 深度优先算法
  const deepFirstSearch = (nodes) => {
    let arr = [];
    let newNodes = deepCopy(nodes, true, "deep");
    while (newNodes.length) {
      let nod = newNodes.shift();
      console.log(nod);
      if (!nod.name) return;
      arr.push(nod.name);
      nod.children && newNodes.push(...nod.children);
    }
    return setNode(arr);
    // let reasult = [];
    // let newNodes = deepCopy(nodes, true, "deep");
    // newNodes.forEach((item) => {
    //   if (!item) return;
    //   const map = (arr) => {
    //     if (!arr.name) return;
    //     reasult.push(arr.name);
    //     arr.children && arr.children.forEach((itm) => map(itm));
    //   };
    //   map(item);
    // });
    // if (!reasult.length) return;
    // return setNode(reasult);
  };
  // 广度优先算法
  function recursion(list) {
    tempArr = [];
    list.forEach((item) => {
      if (item.children) {
        tempArr = tempArr.concat(item.children);
      }
    });
    console.log(tempArr);
    tempArr.length > 0 && recursion(tempArr);
  }
  function wideTraversal(node) {
    let newNodes = deepCopy(node, true, "deep");
    let nodes = [];
    newNodes.forEach((item) => {
      const map = (arr) => {
        if (arr.name) {
          nodes.push(arr.name);
        }
        if (arr.length) {
          arr.forEach((itm) => {
            if (itm.name) {
              nodes.push(itm.name);
            } else if (itm.children) {
              map(itm.children);
            }
          });
        }
        if (arr.children && arr.children.length) {
          map(arr.children);
        }
      };
      map(item);
    });
    console.log(nodes);
    // return setNode(nodes);
  }
  const whildFirstSearch = (nodes) => {
    let arr = [];
    let newNodes = deepCopy(nodes, true, "deep");
    while (newNodes.length) {
      let nod = newNodes.pop();
      console.log(nod);
      if (!nod.name) return;
      arr.push(nod.name);
      nod.children && newNodes.push(...nod.children);
    }
    return setNode(arr);
  };
  function getEmpty(obj) {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      return {};
    } else if (Object.prototype.toString.call(obj) === "[object Array]") {
      return [];
    }
    return obj; //基本数据类型处理
  }

  class Book {
    constructor(name) {
      this._name = name || 9;
    }
    test() {
      console.log(2333);
    }
    get name() {
      return this._name;
    }
    set name(val) {
      this._name = val;
    }
  }

  class ItBook extends Book {
    constructor(props) {
      super(props);
      this._title = props;
    }
    itBook() {
      console.log("itbook");
    }
    get name() {
      return this._title;
    }
    set name(val) {
      this._title = val;
    }
  }

  const exampleLei = new Book();
  const exampleLei2 = new ItBook("我是名字");

  const lei = () => {
    // console.log(exampleLei.name)
    // exampleLei.name = 'jiade'
    // console.log(exampleLei.name)
    // exampleLei._name = 'zhende'
    // console.log(exampleLei.name)
    let obj = {
      a: [1, 2, 3],
      get name() {
        return 233;
      },
    };
    console.log(exampleLei);
    console.log(obj);
  };

  // 深拷贝函数
  const deepCopy = (obj, deep, type) => {
    // obj 源对象
    // deep 是否深拷贝
    // type 哪种算法
    let newObj = {};
    if (deep) {
      if (Array.isArray(obj)) {
        newObj = [];
      }
      if (type === "deep") {
        for (let key in obj) {
          let value = obj[key];
          newObj[key] =
            deep && typeof value === "object" && value !== null
              ? deepCopy(value, true, "deep")
              : value;
        }
      } else if (type === "wild") {
        let newNodes = deepCopy(obj, true, "deep");
        while (newNodes.length) {
          let nod = newNodes.shift();
          if (!nod.name) return;
          newObj.push(nod.name);
          nod.children && newNodes.push(...nod.children);
        }
      }
    } else {
      newObj = Object.assign(obj, []);
    }
    return newObj;
  };
  return (
    <div className="container">
      <div className="box-1">
        {/* <div className="calendar">
          {renderCalendarHeader()}
          {renderCalendarDays()}
          {renderCalendarCells()}
        </div> */}
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
          <Button
            onClick={() => {
              let newA = deepCopy(example, false);
              if (newA[0]) {
                newA[0].name = "2333";
              }
              console.log(example);
            }}
          >
            浅拷贝
          </Button>
          <Button
            onClick={() => {
              let newA = deepCopy(example, true, "deep");
              if (newA[0]) {
                newA[0].name = "2333";
              }
              console.log(example);
            }}
          >
            深拷贝深度优先
          </Button>
          <Button
            onClick={() => {
              // let newA = deepCopy(example, true, "wild");
              // if (newA[0]) {
              //   newA[0].name = "2333";
              // }
              console.log(deepCopy(example, true, "wild"));
            }}
          >
            深拷贝广度优先
          </Button>
          <Button
            onClick={() => {
              lei();
            }}
          >
            类
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default Index;
