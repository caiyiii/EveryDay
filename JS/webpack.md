### Webpack
> Webpack 是一个前端资源加载/打包的工具。它根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。
### 配置文件
- entry入口 让webpack用哪个文件作为项目的入口
- output出口 让webpack把处理打包完成的文件放在哪里
- module模块 要用什么不同的模块来处理各种类型的文件
### 1.建立项目
- 创建项目，并init
```
  // cmd 中
  mkdir webpack
  cd webpack
  npm init
```
- 新建文件`index.js`、`run.js`
```
  // run.js
  function text() {
    var element = document.createElement('p')
    element.innerHTML = 'hello world'
    return element
  }

  module.exports = text
```
```
  // index.js
  var text = require('./run)
  var app = document.createElement('div')
  app.innerHTML = '<h1>HELLO WORLD</h1>'
  app.appendChild(text())
  document.body.appendChild(app)
```
- 配置Webpack
> 安装一个plugin插件，自动生成HTML
`npm install html-webpack-plugin --save-dev`
```
  // webpack.config.js 文件
  var path = require('path')
  var HtmlwebpackPlugin = require('html-webpack-plugin')
  // 定义一些文件夹路径
  var ROOT_PATH = path.resolve(__dirname)
  var APP_PATH = path.resolve(ROOT_PATH, 'app')
  var BUILD_PATH = path.resolve(ROOT_PATH, 'build')

  module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: APP_PATH,
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
      new HtmlwebpackPlugin({
        title: 'Hello World app'
      })
    ]
  }
```
- 运行
`webpack`

持续更新。。。。
