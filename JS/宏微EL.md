### **事件循环**
> 事件循环（`Event loop`）即循环去处理宏任务和微任务这些异步任务
#### **浏览器中的`Event loop`**
1. 首先执行`script`任务，这是全局任务，属于宏任务；
2. 宏任务执行完毕，开始执行所有的微任务；
3. 微任务执行完毕，再取任务队列中的一个宏任务执行。
```
  console.log(0);
  setTimeout(function() {
    console.log(1);
  }, 0);
  Promise.resolve().then(function() {
    console.log(2);
  });
  console.log(3);
```
#### 执行上述代码 
1. 首先执行`script`全局宏任务，输出0，3
2. 全局宏任务执行完，开始判断是否有微任务，存在微任务`Promise`，开始执行，输出2
3. 微任务执行完，微任务队列清空，重新渲染，之后再次判断任务队列是否有任务
4. 任务队列中存在`setTimeout`宏任务，开始执行，输出1
#### 这就是一个完整的过程
#### 一个`Event loop`有一个或多个任务队列，每一个`Event loop`只有一个微任务队列
#### 执行`JavaScript`代码具体流程
1. 执行全局`Script`同步代码，这些同步代码有一些是同步语句，有一些是异步语句；
2. 全局`Script`代码执行完毕后，调用栈`Stack`会清空；
3. 从微队列`microtask queue`中取出位于队首的回调任务，放入调用栈`Stack`中执行，执行完成后`microtask queue`长度减1；
4. 继续取出队首的任务，放入调用栈`Stack`中执行，以此类推，直到把`microtask queue`中的所有任务都执行完毕。**如果在执行`microtask`的过程中，又产生了`microtask`，那么会加入到队列的末尾，也会在这个周期被调用执行**；
5. `microtask queue`中的所有任务都执行完毕，此时`microtask queue`为空队列，调用栈`Stack`也为空；
6. 取出宏队列`macrotask queue`中位于队首的任务，放入`Stack`中执行；
7. 执行完毕后，调用栈`Stack`为空；
8. 重复3-7步骤......
- **宏队列`macrotask`一次只从队列中取出一个任务执行，执行完后就去执行微任务队列中的任务**
- **微任务队列中所有的任务都会被依次取出来执行，直到`microtask queue`为空**
### **JS中的异步任务**
#### 1. 宏任务
- `script`(全局任务)
- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`
- `UI rendering`
#### 2. 微任务
- `process.nextTick`
- `Promise`
- `Object.observer`
- `MutationObserver`
```
  console.log(1);

  setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
      console.log(3)
    });
  });

  new Promise((resolve, reject) => {
    console.log(4)
    resolve(5)
  }).then((data) => {
    console.log(data);
  })

  setTimeout(() => {
    console.log(6);
  })

  console.log(7);
```
打印结果 1475236