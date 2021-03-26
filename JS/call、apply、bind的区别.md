# call、apply、bind
1. 共同点：为了改变this 的指向，第一个参数表示替换this 指向的对象，不传则默认为window 对象。
2. 区别：
- call、apply 是立即执行的，bind 不会立即执行，会返回一个函数；
- apply 最多只能传两个参数（替换this 指向的对象, 参数数组arr），call、bind可以传递多个参数（替换this 指向的对象, ...参数列表）
### 如何自定义实现call()、apply()、bind()函数?
> 思路：
>- 这个函数接收参数，第一个参数不传，则默认为`window`;
>- 这个函数需要改变调用它的函数的this 指向，并执行返回结果或者函数。思路可以是给替换this 指向的对象新增一个函数，执行之后删除。

1. 实现call() 函数
```
  // 1. 将这个自定义call() 函数挂载到函数对象的原型上，成为公有方法
  Function.prototype.hdCall = function( content ){
    
    // 2. 判断传入的第一个参数存不存在，存在则转为object 对象，不存在则为window 对象
    var context = Object(content) || window

    // 3. 在替换this 指向的对象上定义一个函数，值为this 即调用hdCall() 的函数方法
    context.fn = this

    // 4. 定义保存返回值
    let result = ''

    // 5. 取传入hdCall() 除第一个参数的剩余参数
    const args = [...arguments].slice(1)

    // 6. call() 函数接收的参数是参数列表，所以将参数展开，并传入调用hdCall() 的函数， 即fn，并执行
    result = context.fn(...args)

    // 7. 执行完之后删除fn
    delete context.fn

    // 8. 返回结果
    return result
  }

  // 测试hdCall()
  const obj = {
    value :'hello'
  }
  function fn(name , age){
    return {
      value : this.value ,
      name , 
      age
    }
  }
  let res = fn.hdCall(obj , 'LiLei' , 25);
  console.log(res) // { value: 'hello', name: 'LiLei', age: 25 }

```

2. 实现apply() 函数
```
  // 1. 将这个自定义apply() 函数挂载到函数对象的原型上，成为公有方法
  Function.prototype.hdApply = function( content, args ){
    
    // 2. 判断传入的第一个参数存不存在，存在则转为object 对象，不存在则为window 对象
    var context = Object(content) || window

    // 3. 在替换this 指向的对象上定义一个函数，值为this 即调用hdApply() 的函数方法
    context.fn = this

    // 4. 定义保存返回值
    let result = ''

    // 5. 判断第二个参数args 存不存在，不存在，返回执行之后的fn()结果，存在，展开参数返回执行之后的fn()结果
    if(!args) {
      result = context.fn()
    } else {
      result = context.fn(...args)
    }

    // 7. 执行完之后删除fn
    delete context.fn

    // 8. 返回结果
    return result
  }

  // 测试hdApply()
  const obj = {
    value :'hello'
  }
  function fn(name , age){
    return {
      value : this.value ,
      name , 
      age
    }
  }
  let res = fn.hdApply(obj , ['LiLei' , 25]);
  console.log(res) // { value: 'hello', name: 'LiLei', age: 25 }
```

3. 实现bind() 函数
```
  // 1. 将这个自定义bind() 函数挂载到函数对象的原型上，成为公有方法
  Function.prototype.hdBind = function( content ){
    
    // 2. 判断this 也就是调用这个函数的对象，是不是一个函数，因为bind() 返回值是一个改变this 指向的函数
    if(typeof this !== 'function'){
      throw new Error('调用者不是一个函数！')
    }

    // 3. 暂存this
    const self = this

    // 4. 获取调用该方法时传入的除改变this 指向的对象参数的剩余参数
    const args1 = [...arguments].slice(1)

    // 5. 需要返回一个函数
    const bindFn = function(){
      // 这个函数相当于调用bind() 的函数，只是内部需要将this 指向content
      // 获取第二个参数，也就是bind之后返回的函数执行时传入的参数
      const args2 = [...arguments]

      // 重要一步 当bind之后返回的函数执行时，相当于这个函数bindFn被执行，所以bindFn需要一个返回值
      return self.apply(content, args1.concat(args2))
    }

    // hdBind需要返回一个改变this指向的函数
    return bindFn
  }

  // 测试hdBind()
  const obj = {
    value :'hello'
  }
  function fn(name , age){
    return {
      value : this.value ,
      name , 
      age
    }
  }
  let res = fn.hdBind(obj)
  console.log(res) // 这个打印的是一个函数
  let result = res('lilei', 25)
  console.log(result) // { value: 'hello', name: 'lilei', age: 25 }
```

