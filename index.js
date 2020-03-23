var cheerio = require("cheerio");
var _ = require("underscore");
var rp = require("request-promise");
var url = require("url");
var file = require("./lib/file");

var baseUrl = "";
// 基础方法
async function getContent(url) {
    var option = {
      uri: url,
      headers: {
        "User-Agent":
          // "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16",
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149",
        "Cookie": cookie          
      }
    };
    
    

    var dom = await rp(option).catch(() => {
      console.log("error");
      return false;
    });
    
    console.log(dom);  
    return dom;
}

/*
    * 初始化参数
    * 1. urls: ""或者[]
    * 2. config: 对象配置
    * 3. total: 总数
    * 4. step: 步长
    var config = {
        "id": ".typecont>span",
        "title": ".typecont>span a",
        ”&": {
            "_url": "selector|url",        
            "author": ".typecont>span"
            "content": ".typecont>span .content"
        }
    }
    */

var json = [];
var cookie = "";
var actions = {
  getData: function() {
    return json;
  },
  extend: async function(config) {
    var extendJSON = await loop(json, config);
    json = json.map((data, index) => {
      return _.extend(data, extendJSON[index]);
    });
    return actions;
  }
};

function extend(arr, arr1) {
  return arr.map((data, index) => {
    return _.extend(data, arr1[index]);
  });
}

function setCookie(customCookie){
  cookie = customCookie;
}

function saveFile(filename){
  file.create(dom);
}

async function webToJson(urls, config, total, step) {
  return await loop(urls, config, total, step);
  // return actions;
}


/*
* 对url页面进行重复we
*/ 
async function loop(urls, config, total, step) {
  
  //处理参数
  var urls = _.isString(urls) ? [urls] : urls;

  //测试urls
  var dataArray = [];
  for (var url of urls) {
    if (_.isObject(url) && !_.isUndefined(url._url)) url = url._url;
    baseUrl = url;

    var pageDataArray = await getPage(url, config, dataArray.length);
    dataArray = dataArray.concat(pageDataArray);
  }
  return dataArray;
}

// 获得页面内容
async function getPage(url, config, startIndex) {
  var content = await getContent(url);
  if (content == false) {
    return;
  }

  var $ = cheerio.load(content);
  var selectorID = config["id"];
  var total = getElement($, selectorID).length;

  var data = [];
  _.range(0, total).map((number, index) => {
    var item = getDom($, config, index, url);
    item.id = startIndex + index;
    data.push(item);
  });

  return data;
}

// 获取dom节点
function getDom($, config, index, url) {
  var obj = {};
  for (var key in config) {
    var ele = getElement($, config[key], index);
    obj[key] =
      key != "_url" ? ele.text() : getAbsolutePath(url, ele.attr("href"));
  }
  return obj;
}

function getElement($, selector, index) {
  if (_.isFunction(selector)) {
    selector = selector($);
  } else {
    selector = $(selector);
  }

  return _.isUndefined(index) ? selector : selector.eq(index);
}

// 设置URL
function getAbsolutePath(baseUrl, path) {
  return url.resolve(baseUrl, path);
}


module.exports = {
  webToJson,
  extend,
  setCookie
};    