Use jquery selector to convert web content into json data.

[中文文档]("./readmecn.md")

## Quick start
1. Install module
2. Using modules

#### Installing the module

```js
npm install webtojson
```
or

```js
yarn add webtojson
```

#### Using modules

Introduce module

```js
var {webToJson} = require ("webtojson");
```

2. Implementation method
Execute the `webToJson` method

For example, the following code is the result of crawling the Baidu search keyword `node`;
```js
(async () => {
    console.log (await webToJson (
      "https://www.baidu.com/s?wd=node",
      {
        id: "h3.t",
        title: "h3.t"
      },
      {
        headers: {
          "User-Agent":
            "Mozilla / 5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit / 537.36 (KHTML, like Gecko) Chrome / 82.0.4083.0 Safari / 537.36",
          "Cookie": "**"
        }
      }
    ));
}) ();
```



#### API
The module provides two methods: `webToJson` and` webToJsonChain`


##### webToJson
webToJson (urls, selector, option);
`webToJson` method can grab single page data;

* urls: string | array URLs that need to crawl content, single url or multiple
* selector: object specifies the content to be fetched;
* option: object configuration item (optional)
    * paging: paging configuration (optional)
        * pageNum: number
        * offset: number offset of each page
        * keyword: keyword corresponding to string url
    * headers: request header settings (optional)
        * User-Agent: Specify useragent (optional)
        * Cookie: Make a cookie (optional). For example, some search engines need to provide cookies to have results;


The following is a form of selector:
```
{
    id: ".typecont span a",
    title: ".typecont span a",
    _url: ".typecont span a"
}
```
The final json attribute of the selector key.
value is a selector similar to jquery. Finally, the content of the dom node corresponding to the selector is used as the value of json.

The value of the selector can also be a function, so you can get the dom by yourself
```
{
    id: ".typecont span a",
    title: ".typecont span a",
    _url: function ($) {
        return $ (". typecont span"). eq (0);
    }
}
```

##### webToJsonChain
webToJsonChain (urls, selector, option) .extend (selector) .getData ()
`webToJsonChain` method can merge multiple page information together;

The parameters of `webToJsonChain` and` webToJsonChain` are the same

The extend method will open a new address based on the previous data `_url` field.

getData can get the data of the entire chain


