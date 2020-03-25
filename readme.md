将网页上信息转化成json数据.

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
执行`webToJson`方法

比如下面代码是抓取百度搜索关键词`node`的结果;
```js
(async()=>{    
    console.log(await webToJson(
      "https://www.baidu.com/s?wd=node",      
      {
        id: "h3.t",
        title: "h3.t"
      },
      {         
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4083.0 Safari/537.36",
          "Cookie": "**"            
        }
      }
    ));
})();
```

#### API
模块提供了两个方法: `webToJson`和`webToJsonChain`


##### webToJson  
webToJson(urls, selector, option);
`webToJson`方法可以抓取单页面数据;

* urls: string | array 需要抓取内容的url地址，可以单个url或者多个
* selector: object 制定需要抓取内容;
* option: object 配置项（可选）
    * paging: 翻页配置项（可选）
        * pageNum: number  总页数
        * offset: number 每一页的偏移量
        * keyword: string url对应的关键字
    * headers: 请求头设置（可选）
        * User-Agent: 制定useragent（可选）
        * Cookie: 制定Cookie(可选) 比如一些搜索引擎需要提供cookie才会有结果;


下面是selector的一种形式：
```
{
    id: ".typecont span a",
    title: ".typecont span a",
    _url: ".typecont span a"
}
```
selector的key的最终json的属性。
value是类似jquery一样的选择器, 最后会将选择器对应dom节点的内容作为json的值。

selector的value还可以是函数，从而可以自定义获取dom
``` 
{
    id: ".typecont span a",
    title: ".typecont span a",
    _url: function($){
        return $(".typecont span").eq(0);
    }
}
```

##### webToJsonChain
webToJsonChain(urls, selector, option).extend(selector).getData()
`webToJsonChain`方法可以将多个页面信息合并在一起;

`webToJsonChain`和`webToJsonChain`的参数是一致的

extend方法会根据之前数据`_url`字段来打开新地址,

getData可以得到整个链的数据










