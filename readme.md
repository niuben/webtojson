Use jquery selector to convert web content into json data.

![Node.js CI](https://github.com/niuben/webtojson/workflows/Node.js%20CI/badge.svg)

[中文文档](https://github.com/niuben/webtojson/blob/master/readmecn.md)

## Quick start
1. Install module
2. Using modules

#### Installing the module

```
npm install webtojson
```
or
```
yarn add webtojson
```

#### Using modules

Introduce module

```js
var webtojson = require("webtojson");
```  


2. Implementation method  
Execute the `webtojson` method

For example, the following code is the result of crawling the google search keyword `node`;
```js
(async() => {
    var googleData = await webtojson("Https://www.google.com/search?q=node",
      {
        id: ".g",
        title: ".g .r h3"
      },
      {
        headers: {
          "User-Agent": "Mozilla / 5.0(Macintosh; Intel Mac OS X 10_12_6) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 82.0.4083.0 Safari / 537.36",
          "Cookie": "***"
        }
      }
    ).getData();
    console.log(googleData);
})();
```
result
```js
[{id: 0, title: 'Node.js'},
{id: 1, title: 'Node.js-Wikipedia'},
{id: 2, title: 'nodejs / node: Node.js JavaScript runtime-GitHub'},
{id: 3, title: 'Introduction to Node.js'},
{id: 4, title: 'Node.js Introduction-W3Schools'},
{id: 5, title: 'Node-Web APIs | MDN-Mozilla'},
{id: 6, title: 'node-npm'},
{id: 7, title: 'node-Docker Hub'},
{id: 8, title: 'Express-Node.js web application framework'},
{id: 9, title: 'Node.js-Introduction-Tutorialspoint'},
{id: 10, title: 'Node-RED'}]
```

## API
The module provides the following methods:  

* `webtojson`(required)
* `extend`(optional)
* `add`(optional)
* `getData` or` saveFile`(required)

### webtojson
webtojson(urls, selector, option);
`webtojson` method can grab single page data;

* urls: string | array The url address of the content to be crawled. It can be a single url or multiple;(required)
* selector: object specifies the content to be crawled;(required)
* option: object configuration item(optional)  
    * paging: paging configuration(optional)  
        * pageNum: total pages
        * offset: number offset of each page
        * keyword: keyword corresponding to string url
    * headers: request header settings(optional)
        * User-Agent: Specify useragent(optional)
        * Cookie: Make a cookie. For example, some search engines need to provide cookies to have results (optional)


The following is a form of selector:  
```
{
    id: ".typecont span a",
    title: ".typecont span a",
    url: ".typecont span a"
}
```
selector is of the form `key / value`,` key` is the attribute name of the final `json`, and` value` is the attribute value of `json`;  

`value` has two types: String and Function;  

When `value` is` String`, it is a selector similar to jquery, and the content of the selector corresponding to the dom node is used as the json attribute value.  

When `value` is` Function`, the value that the function runs as the json attribute value; something like this:

```js
{
    id: ".typecont",
    title: ".typecont span a",
    url: function ($, parentEle) {
        return $(parentEle) .find("a"). attr("href");
    }
}
```
The function has two parameters:  

* $: jquery $
* parentEle: parent element node, select child nodes based on parent element;

### extend(selector) or extend(url, selector)
Data from other pages will be captured and merged with previous data;  

There are two different parameters for extend:  

extend(selector): if there is only a selector parameter, the value of the previous data `url` field will be used to ;  

extend(url, selector): same as webtojson function parameters;  


```js
var googleData = await webtojson(
"Https://www.google.com/search?q=node",
      {
        id: ".g",
        title: ".g .r h3",
        url: ".g .r a"
      }).extend({
        content: "title"
      }).getData();

```
extend merges the search list name with the contents of each name;  


### add(selector) or add(url, selector)
Add information on the basis of previous data, parameters are consistent with extend method;  


```js
var googleData = await webtojson(
"Https://www.google.com/search?q=node",
      {
        id: ".g",
        title: ".g .r h3",
        url: ".g .r a"
      }).add({
        content: "title"
      }).getData();

```

### getData()
Get data for the entire chain;


### saveFile(filePath)
Save the data as a file

```js
var googleData = await webtojson("https://www.google.com/search?q=node", {
    id: ".g",
    title: ".g .r h3",
    url: ""
}).saveFile("./google.json");
```