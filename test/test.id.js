(async()=>{

    var webtojson = require("../index");
        
    var shiciData = await webtojson(
      "https://so.gushiwen.org/gushi/xiaoxue.aspx",
      {
        id: ".typecont",
        title: ".typecont .bookMl",
        list: ($, parentEle, index)=>{
          var spanElements = $(parentEle).find("span");
          var listArray = [];
          spanElements.map((index, spanElement)=>{
            listArray.push($(spanElement).find("a").text());
          });
          return listArray;
        }
      },      
    ).getData();
      
    console.log(shiciData);    
})();
        