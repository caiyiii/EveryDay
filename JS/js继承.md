## ES5、ES6继承方式
继承的目标：
>- 父类公有属性和方法为子类公有属性和方法
>- 父类私有属性和方法为子类私有属性和方法
### 1. ES5继承
- 原型继承
```
  // 定义父类
  function Parent(){
    this.familyName = "Corleone"
  }

  Parent.prototype.skill = ()=>{
    return "保护家人"
  }

  // 定义子类
  function Child(){
    this.name = "Michael"
  }

  // 将子类原型指向父类实例
  Child.prototype = new Parent()
  Child.prototype.constructor = Child

  // 注意：定义子类原型方法要在改变原型指向之后再定义
  Child.prototype.ability = ()=>{
    return "有勇有谋"
  }

  let michey = new Child()
  console.log(michey.name, michey.familyName, michey.skill(), michey.ability())
  // Michael Corleone 保护家人 有勇有谋
```
> 原型继承是将子类原型指向父类实例从而继承父类公有和私有的属性、方法。缺陷是父类公有和私有都变成了子类公有。


- .call() 寄生继承
```
  // 定义父类
  function Parent(){
    this.familyName = "Corleone"
  }

  Parent.prototype.skill = ()=>{
    return "保护家人"
  }

  // 定义子类
  function Child(){
    this.name = "Michael"
    // 将父类构造函数当做普通函数来执行，同时改变this 指向
    Parent.call(this)
  }

  // 注意：定义子类原型方法要在改变原型指向之后再定义
  Child.prototype.ability = ()=>{
    return "有勇有谋"
  }

  let michey = new Child()
  console.log(michey.name, michey.familyName, michey.skill(), michey.ability())
  // Michael Corleone 保护家人 有勇有谋
```
> 寄生继承是在子类构造函数内将父类构造函数当做普通函数执行，同时改变this 指向，指向子类完成继承。缺陷是父类的公有和私有属性、方法均为子类私有。

- 组合式继承（.call() + Object.create）
> `Object.create()` 方法创建一个空对象，第一个参数会把创建的空对象的`__proto__`指向传入的参数对象
```
  // 定义父类
  function Parent(){
    this.familyName = "Corleone"
  }

  Parent.prototype.skill = ()=>{
    return "保护家人"
  }

  // 定义子类
  function Child(){
    this.name = "Michael"
    // 将父类构造函数当做普通函数来执行，同时改变this 指向
    Parent.call(this)
  }

  Child.prototype = Object.create(Parent.prototype)

  // 注意：定义子类原型方法要在改变原型指向之后再定义
  Child.prototype.ability = ()=>{
    return "有勇有谋"
  }

  let michey = new Child()
  console.log(michey.name, michey.familyName, michey.skill(), michey.ability())
  // Michael Corleone 保护家人 有勇有谋
```
> 父类公有属性和方法为子类公有属性和方法，父类私有属性和方法为子类私有属性和方法

### 2. ES6类继承
```
  class Parent{
    constructor(name, generation){
      this.name = name
      this.generation = generation
    }
    info(){
      return `${this.name} Corleone,是第${this.generation}代教父`
    }
  }

  class Child extends Parent{
    constructor(name, generation, end){
      super(name, generation)
      this.end = end
    }
    skill(){
      return "除暴安良"
    }
  }

  let vito = new Child('Vito', 1, '黑')
  let michey = new Child('Michael', 2, '白')
```