var _ = require("underscore");
var file = require("./lib/file");
var { loop, extendCollect } = require("./lib/common");

// 代理层将用户的API翻译await/async形式

var chainArr = [];
var actions = {};
actions = {
  add: function() {
    addChain.call(null, {
      type: "add",
      argus: _.toArray(arguments)
    });
    return actions;
  },
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
        json = await loop.apply(null, action.argus);
        break;
      // 当只有一个参数时才使用之前的数据;              
      case "extend":        
      case "add":       
        if(_.isArray(action.argus) && action.argus.length == 1){
          action.argus.unshift(json);          
        }
      var data = await loop.apply(null, action.argus);
      json =  action.type == "extend" ?  extendCollect(json, data) : json.concat(data);
      break;
      case "getData":
        return json;      
      case "saveFile":
        var path = action.argus[0];
        file.create(path, JSON.stringify(json, null, 4));
        break;        
    }
  }
}

function webtojson(urls, config, option) {
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

module.exports = webtojson
