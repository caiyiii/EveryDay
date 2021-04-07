### vue2.x 和vue3.0
> Reflect是内置对象，为操作对象而提供的新API，将Object对象的属于语言内部的方法放到Reflect对象上，即从Reflect对象上拿Object对象内部方法。 如果出错将返回false
- vue3.0
```
  let obj = {
    name:{name:'hhh'},
    arr: ['吃','喝','玩']
  }
//proxy兼容性差 可以代理13种方法 get set
//defineProperty 只对特定 的属性进行拦截 

let handler = {
  get (target,key) { //target就是obj key就是要取obj里面的哪个属性
    console.log('收集依赖')
    if(typeof target[key] === 'object' && target[key] !== null){
      //递归代理，只有取到对应值的时候才会代理
      return new Proxy(target[key],handler)
    }
    
    // return target[key]
    //Reflect 反射 这个方法里面包含了很多api
    return Reflect.get(target,key)
  },
  set (target,key,value) {
    console.log('触发更新')
    // target[key] = value //这种写法设置时如果不成功也不会报错 比如这个对象默认不可配置
    Reflect.set(target,key,value)
  }
}

let proxy = new Proxy(obj,handler)
```
- vue2.x
```
  Object.keys(data).forEach((prop) => {
    const dep = new Dep()

    Object.defineProperty(data, prop, {
      get () {
        dep.depend()
        return Reflect.get(data, prop)
      },
      set (newVal) {
        Reflect.set(data, prop, newVal)
        dep.notify()
      }
    })
  })
```