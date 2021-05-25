#### 响应式
> `vue`是`MVVM`框架，数据发生变化后，会重新对页面渲染，这就是`vue`响应式。
#### `Vue2.x`响应式原理
> 基于`Object.defineProperty`这个`API`将`data`选项遍历出的属性全部转为`getter/setter`，在数据变动时发布消息给订阅者，触发相应的监听回调。`Object.defineProperty`不具备监听数组的能力，需要重新定义数组的原型来达到响应式，并且它无法检测到对象属性的添加和删除。（如果是删除属性，可以用`vm.$delete`实现，如果是新增属性，可以用`Vue.set(obj, a, 1)`添加响应式属性，或者重新赋值`data.obj = { ...data.obj, a: 1 }`）
##### `Vue2.x`
```
  function defineReactive(target, key, value) {
   //深度监听
   observer(value);
   Object.defineProperty(target, key, {
     get() {
       return value;
     },
     set(newValue) {
       //深度监听
       observer(value);
       if (newValue !== value) {
         value = newValue;
         updateView();
       }
     }
   });
 }
 
 function observer(target) {
   if (typeof target !== "object" || target === null) {
     return target;
   }
 
   if (Array.isArray(target)) {
     target.__proto__ = arrProto;
   }
 
   for (let key in target) {
     defineReactive(target, key, target[key]);
   }
 }
 
 // 重新定义数组原型
 const oldAddrayProperty = Array.prototype;
 const arrProto = Object.create(oldAddrayProperty);
 ["push", "pop", "shift", "unshift", "spluce"].forEach(
   methodName =>
     (arrProto[methodName] = function() {
       updateView();
       oldAddrayProperty[methodName].call(this, ...arguments);
     })
 );
 
 // 视图更新
  function updateView() {
   console.log("视图更新");
 }
 
 // 声明要响应式的对象
 const data = {
   name: "袁本",
   age: 30,
   info: {
     address: "B市" // 需要深度监听
   },
   nums: [10, 20, 30]
 };
 
 // 执行响应式
 observer(data);
```

#### `Vue3.x`响应式原理
> 基于`Proxy`和`Reflect`来做数据大劫持代理，可以原生支持数组的响应式，还可以直接支持对象的新增和删除属性，唯一的不足时兼容性差
##### `Vue3.x`
```
  const proxyData = new Proxy(data, {
   get(target,key,receive){ 
     // 只处理本身(非原型)的属性
     const ownKeys = Reflect.ownKeys(target)
     if(ownKeys.includes(key)){
       console.log('get',key) // 监听
     }
     const result = Reflect.get(target,key,receive)
     return result
   },
   set(target, key, val, reveive){
     // 重复的数据，不处理
     const oldVal = target[key]
     if(val == oldVal){
       return true
     }
     const result = Reflect.set(target, key, val,reveive)
     console.log('set', key, val)
     return result
   },
   deleteProperty(target, key){
     const result = Reflect.deleteProperty(target,key)
     console.log('delete property', key)
     console.log('result',result)
     return result
   }
 })

  // 声明要响应式的对象,Proxy会自动代理
 const data = {
   name: "王小冉",
   age: 25,
   info: {
     address: "B市" // 需要深度监听
   },
   nums: [10, 20, 30]
 };
```