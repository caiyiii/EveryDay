### **ES6**
- `ECMAScript 6`是`JavaScript`的第二个主要修订版
- `ECMAScript 6`也称为`ES6`或`ECMAScript 2015`
### **新特性**
#### 1. `let`和`const`关键字
- `let`用于声明变量，`const`用于声明常量
```
  let x = 3
  x = 4
  console.log(x) // 4

  const num = 0
  num = 1 // !error: Assignment to constant variable.(常量变量赋值报错)
```
- 均会在`JavaScript`中提供块作用域
```
  var x = 10
  {
    let x = 2
  }
  console.log(x) // 10
  
  var y = 10
  {
    const y = 2
  }
  console.log(y) // 10
```

#### 2. 箭头函数(Arrow Functions)
> 箭头函数可以通过简短的语法来编写函数表达式，不需要`function`关键字、`return`关键字和花括号。
```
  // ES5
  var x = function(x, y) {
    return x * y
  }

  // ES6
  const x = (x, y) => x * y
```
- 箭头函数没有自己的`this`值，它所使用的`this`来自于函数作用域链
```
  // ES6
  this.nums.forEach(v => {
    if (v % 5 === 0)
        this.fives.push(v)
  })

  // ES5-方式一
  var self = this
  this.nums.forEach(function (v) {
    if (v % 5 === 0)
        self.fives.push(v)
  })

  // ES5-方式二
  this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v)
  }, this)

  // ES5-方式三
  this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v)
  }).bind(this)
```

#### 3. `For/of`循环
> 讲到`For/of`循环，就不得不介绍`For/in`循环。`For/of`循环只循环集合本身的元素，`For/in`循环遍历的实际上是对象的属性名称，`Array`实际也是一个对象，它的每个元素索引被视为一个属性，因此在使用`For/in`循环遍历数组时会将数组的所有属性遍历出来却不包括`length`属性
```
  var arr = ['a', 'b', 'c'];
  arr.fourth = 'd';
  for (var i in arr) {
    console.log(i); // '0', '1', '2', 'fourth'
  }

  for (var i of arr) {
    console.log(i); // 'a', 'b', 'c'
  }
```
> 数组`Array`具有下标，可以通过下标循环遍历集合本身元素，但是`Map`和`Set`这类集合就无法使用下标，因此`Es6`标准引入了新的类型`iterable`类型，`Array Map Set`都属于`iterable`类型，可通过`For/of`循环遍历集合。ps: 亦可通过`iterable`内置方法`forEach`遍历(这是ES5.1标准引入的)

#### 4. `class`关键字
> [关于`class`](https://juejin.cn/post/6945257821986357261)

#### 5. `Promise`
#### ***I Promise a Result!!!***
#### `Promise`对象支持两个属性：`state`和`result`
- 当`Promise`对象处于`pending`状态时，结果是`undefined`。
- 当`Promise`对象处于`fulfilled`状态时，结果是一个值。
- 当`Promise`对象处于`rejected`状态时，结果是一个`error`对象。
```
  // Example
  let myPromise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('hello world!')
    }, 3000)
  })

  myPromise.then(function(val) {
    alert(val)
  })
```