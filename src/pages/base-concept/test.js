async function fun1() {
  await fun2();
  console.log("await阻塞后的");
}

function fun2() {
  new Promise((res1) => {
    console.log("执行了内部promise");
    res1("promise内部");
  })
    .then((res) => {
      console.log(res);
      return 123456789;
    })
    .then((res) => {
      console.log("内部promise结束", res);
      return "end";
    });
}

fun1();
setTimeout(() => {
  console.log("宏任务");
}, 0);

new Promise((reslove) => {
  reslove(2);
}).then((res) => {
  console.log(res, "第二个 promise");
});
