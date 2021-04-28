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