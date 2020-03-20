# webtojson
将网页上数据格式化成JSON;

## 快速开始
1. 安装模块
2. 使用模块

#### 安装模块

```
npm install webtojson
```
或者
```
yarn add webtojson
```

#### 使用模块

1. 引入模块

```js
var {webToJson} = require("webtojson");
```


2. 执行方法
```js
(async()=>{    
    var data = await webToJson("http://sports.sina.com.cn/", {
        id: "h3",
        title: "h3"
    });
})();
```


有些网站的抓取内容需要提供cookie信息，需要先在浏览器获取cookie, 在通过setCookie保存;

```js
(async()=>{    
    var {webToJson, setCookie} = require("webtojson");
    
    setCookie("******")    
    var data = await webToJson("http://sports.sina.com.cn/", {
        id: "h3",
        title: "h3"
    });
})();

```









