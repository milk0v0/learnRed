## 前言

+ 最近公司招聘，我发现了一个很严重的问题，越来越多的所谓前端，一上手就是三大框架，但是对于原生的 js 都非常的陌生
+ 那么我想到一个问题，我自己的 js 是否也有很多漏洞呢？答案是肯定的
+ 红宝书是非常多大神推荐过的书，那么我也重头看起，重新学习 JavaScript 这个熟悉或也会由陌生的吃饭家伙，查缺补漏吧~
+ 以下将会是我的一些笔记，不定期更新
<br />

<img width="50%" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2f464a8198a45819534b81de92f464b~tplv-k3u1fbpfcp-watermark.image"/>




## 自我代码规范定义

1. 变量声明时尽可能赋值初始化，这样在后续 typeof 时如果出现 'undefined' 可明确变量未声明
2. 在声明对象时，如无具体的对象，赋值 null
   - 因为 typeof null === 'object'
   - 我们后续也可以通过 === null 判断对象是否真正引用
3. 为了避免 `parseInt()` 解析并非我们预期，建议始终给第二参数



## 目录

1. 语言基础
    + JavaScript 基本数据类型
        - [Number](https://juejin.cn/post/6942162373557878798/#heading-0)
        - [String](https://juejin.cn/post/6942162373557878798#heading-6)