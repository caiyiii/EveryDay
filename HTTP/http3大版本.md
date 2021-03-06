# HTTP1.0、HTTP1.1和HTTP2.0区别
### 1. HTTP1.0与HTTP1.1
#### 1.1 长连接
- HTTP1.0 需要使用 keep-alive 参数来告知服务器建立长连接。
- HTTP1.1 默认开启长连接 keep-alive ，在一个 TCP 连接上可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟。
#### 1.2 节约带宽
- HTTP1.0 存在浪费带宽现象，客户端仅需要对象一部分，服务端却将整个对象传送过来，不支持断点续传功能。
- HTTP1.1 支持只发送 header 信息（不含body信息） ，如果服务器认为客户端有请求权限，则返回100，客户端收到100响应才开始把请求 body 发送到服务器；若返回401，则不发送节约带宽。
#### 1.3 HOST域
> 随着虚拟主机技术的发展，一台物理服务器可以存在多个虚拟主机，并且他们共享一个IP地址。
- HTTP1.0 认为每台服务器都绑定唯一的IP地址，所以请求消息的 URL 并没有传递主机名，HTTP1.0 没有HOST域。
- HTTP1.1 请求和响应消息都支持HOST域，且请求消息中没有HOST域会报400 Bad Request 错误。
#### 1.4 缓存处理
- HTTP1.0 使用header 中的If-Modified-Since, Expires 来作为缓存判断的标准。
- HTTP1.1 引入的更多的缓存控制策略 Entity tag, If-Unmodified-Since, If-Match, If-None-Match等。
#### 1.5 错误通知管理
- HTTP1.1 新增了24个错误状态响应码，409（Confict）请求资源与资源当前状态冲突；410（Gone）服务器上某个资源被永久删除。
*** 长节H缓错 ***
### 2. HTTP1.1和HTTP2.0
#### 2.1 多路复用
- HTTP1.1 需要建立多个TCP连接，来支持处理更多并发的请求，创建TCP连接本身有开销。
- HTTP2.0 多路复用，同一个TCP连接并发处理多个请求，且并发请求数量比1.1大了好几个数量级。
#### 2.2 头部数据压缩
- HTTP1.1 不支持header 数据的压缩。
- HTTP2.0 使用算法对header 数据进行压缩，网络传输更快。
#### 2.3 服务器推送
> 服务器推送：在客户端请求之前发送数据的机制。
> 网页中使用了很多资源： HTML、CSS、JS、图片等
- HTTP1.1 中每个资源都必须明确的请求
- HTTP2.0 中引入sever push，允许服务端推送资源给客户端，达到一次明确请求，直接推送。
*** 多头服 ***
