var _ = require("underscore");
var { loop, extendCollect } = require("./lib/common");

// 代理层将用户的API翻译await/async形式

var chainArr = [];
var actions = {};
actions = {
  extend: function() {
    addChain.call(null, {
      type: "extend",
      argus: _.toArray(arguments)
    });
    return actions;
  },
  getData: async function() {
    addChain.call(null, {
      type: "getData",
      argus: _.toArray(arguments)
    });
    return await next();
  },
  saveFile: async function() {
    addChain.call(null, {
      type: "saveFile",
      argus: _.toArray(arguments)
    });
    await next();
  }
};

function addChain(obj) {
  chainArr.push(obj);
}

async function next() {
  var json = [];
  for (var action of chainArr) {
    switch (action.type) {
      case "webtojson":
        json = await webToJson.apply(null, action.argus);
        break;
      case "extend":
        _.isArray(action.argus) && action.argus.unshift(json);
        json = extendCollect(json, await webToJson.apply(null, action.argus));
        break;
      case "getData":
        return json;
        break;
    }
  }
}

function webToJsonChain(urls, config, option) {
  addChain.call(null, {
    type: "webtojson",
    argus: _.toArray(arguments)
  });
  return actions;
}

/*
    * 初始化参数
    * 1. urls: ""或者[]
    * 2. config: 对象配置
    * 3. option
    var config = {
        "id": ".typecont>span",
        "title": ".typecont>span a",
        "_url": ".typecont>span a",                          
    }
    */
async function webToJson(urls, config, option) {
  return await loop(urls, config, option);
}

module.exports = {
  // webToJson,
  webToJson,
  webToJsonChain
};
