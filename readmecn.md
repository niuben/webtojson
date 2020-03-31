通过jquery selector将网页内容转化成json数据.

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
var webtojson = require("webtojson");
```

2. 执行方法
执行`webtojson`方法

比如下面代码是抓取google搜索关键词`node`的结果;
```js
(async () => {
    var googleData = await webtojson (
      "https://www.google.com/search?q=node",      
      {
        id: ".g",
        title: ".g .r h3"        
      },
      {         
        headers: {
          "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4083.0 Safari/537.36",
          "Cookie":"***"
        }
      }
    ).
    console.log(googleData);
}) ();
```
result
```js
[{ id: 0, title: 'Node.js' },
{ id: 1, title: 'Node.js - Wikipedia' },
{ id: 2, title: 'nodejs/node: Node.js JavaScript runtime - GitHub' },
{ id: 3, title: 'Introduction to Node.js' },
{ id: 4, title: 'Node.js Introduction - W3Schools' },
{ id: 5, title: 'Node - Web APIs | MDN - Mozilla' },
{ id: 6, title: 'node - npm' },
{ id: 7, title: 'node - Docker Hub' },
{ id: 8, title: 'Express - Node.js web application framework' },
{ id: 9, title: 'Node.js - Introduction - Tutorialspoint' },
{ id: 10, title: 'Node-RED' }]
```

#### API
模块提供了下面几种方法: 
* `webtojson` (比选)
* `extend` (可选)
* `add` (可选)
* `getData` 或者 `saveFile` (必选)

##### webtojson  
webtojson(urls, selector, option);
`webtojson`方法可以抓取单页面数据;

* urls: string | array  需要抓取内容的url地址，可以单个url或者多个; (必填)
* selector: object 制定需要抓取内容; (必填)
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
    url: ".typecont span a"
}
```
selector是`key/value`形式，`key`是最终`json`的属性名, `value`是`json`的属性值;
`value`有两种类型：String和Function;
当`value`是`String`时，是类似jquery一样的选择器，选择器对应dom节点的内容作为json的属性值。
当`value`是`Function`时，函数运行的值作为json的属性值; 类似于这样:

```js
{
    id: ".typecont",
    title: ".typecont span a",
    url: function($, parentEle){                
        return $(parentEle).find("a").attr("href");
    }
}
```
函数有两个参数:
* $ : jquery $
* parentEle: 父元素节点，根据父元素选择子节点;

#### extend(selector) 或者 extend(url, selector)
将抓取其他页面的数据并和之前数据进行合并;
extend有两种不同参量的情况:
extend(selector): 如果只有selector参量，会使用之前数据`url`字段的值抓取内容;
extend(url, selector): 使用url参量抓取内容;

```js
var googleData = await webtojson (
      "https://www.google.com/search?q=node",      
      {
        id: ".g",
        title: ".g .r h3",
        url: ".g .r a"
      }).extend({
        content: "title"          
      }).getData();

```
extend将搜索列表名称和每个名称的内容进行合并;

#### add(selector) 或者 add(url, selector)
在之前数据基础上增加信息,参数和extend一致;

```js
var googleData = await webtojson (
      "https://www.google.com/search?q=node",      
      {
        id: ".g",
        title: ".g .r h3",
        url: ".g .r a"
      }).extend({
        content: "title"          
      }).getData();

```

#### getData()
获取整个链的数据;


#### saveFile(filePath)
将数据保存成一个文件

```js
var googleData = await webtojson ("https://www.google.com/search?q=node",{
    id: ".g",
    title: ".g .r h3",
    url: ""
}).saveFile("./google.json");
```