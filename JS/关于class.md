### 关于class
> ES6 通过`class` 关键字，可以定义类。新的`class`写法让对象原型写法更加清晰，更像面向对象编程
```
  class Foo {
    #prop = 10
    static myProp = 42
    _count = 0
    constructor(x, y) {
      this.x = x
      this.y = y
      this.readProp()
    }

    readProp() {
      console.log(Foo.myProp)
      console.log(this.x, this.y, this._count)
    }

    setProp() {
      return `${this.x}--${this.y}--${Foo.myProp}--${this.#prop}`
    }

    static fooFn() {
      return this.x + '-' + this.y + '-' + this.myProp
    }
  }

  const boo = new Foo(2, 3) // 42 2 3 0
  console.log(boo.setProp()) // 2--3--42--10
  console.log(Foo.fooFn()) // undefind-undefind-42
  console.log(boo.#prop) // Private field '#prop' must be declared in an enclosing class
```
> 类FOO 相当于实例boo 的原型，所有在类中定义的方法，都会被实例继承。
如果在一个方法fooFn() 或者属性myProp 前加上关键字static，就表示该方法不会被
实例继承，而是直接通过类来调用 Foo.myProp Foo.fooFn() 这就称为静态方法和属性
注意！！ 如果静态方法包含this 关键字，这个this 指的是类Foo 而不是实例boo
  实例属性还可以定义在类的最顶层 或者constructor 中