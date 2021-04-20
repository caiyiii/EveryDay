import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则运行 npm i @types/node -D 安装插件
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 是否允许跨域
    // 设置代理
    // proxy: {
    //   'api': {
    //     target: 'http://xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('api', '/')
    //   }
    // }
  }
})
