var _ = require("underscore");
var cheerio = require("cheerio");
var rp = require("request-promise");
var url = require("url");

async function loop(urls, config, option) {
    
  if (_.isString(urls)) {
    urls = _.isObject(option.paging)
      ? getPagingUrl(urls, option.paging)
      : [urls];
  }
  
  //测试urls
  var dataArray = [];
  for (var url of urls) {
    if (_.isObject(url) && !_.isUndefined(url._url)) url = url._url;
    baseUrl = url;

    var pageDataArray = await getPage(url, config, option, dataArray.length);
    dataArray = dataArray.concat(pageDataArray);
  }
  return dataArray;
}

function getPagingUrl(url, pagingObj){

  if(!_.isObject(pagingObj)){
    return url;
  }

  var {pageNum, offset, keyword} = pagingObj;
  if(!_.isNumber(pageNum) || !_.isNumber(offset) || _.isUndefined(keyword)){
    return url;
  }
  
  var urls = [];
  for(var i = 0; i <= pageNum; i++){
      urls.push(
        url + `&${keyword}=${i * offset}`
      );
  }  
  return urls;
}


async function getContent(url, option) {
  var dom = await rp({
    uri: url,
    headers: option ? option.headers || "" : ""
  }).catch(() => {
    return false;
  });
  // console.log(dom);

  return dom;
}

// 获得页面内容
async function getPage(url, config, option, startIndex) {
  var content = await getContent(url, option);
  if (content == false) {
    return;
  }

  var $ = cheerio.load(content);
  
  var total = config["id"] ? getElement($, config["id"]).length : 1;
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

function extendCollect(arr, arr1) {
  return arr.map((data, index) => {
    return _.extend(data, arr1[index]);
  });
}

module.exports = {
  loop,
  extendCollect
};