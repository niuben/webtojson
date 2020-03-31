(async()=>{

    var webtojson = require("../index");
        
    var shiciData = await webtojson(
      ["https://so.gushiwen.org/gushi/xiaoxue.aspx"],
      {
        id: ".typecont span a",
        title: ".typecont span a",
        url: ".typecont span a"
      },      
    ).add(
    "https://so.gushiwen.org/gushi/chuzhong.aspx",      
    {
      id: ".typecont span a",
      title: ".typecont span a",
      url: ".typecont span a"
    }).saveFile("./data.json");
      
    console.log(shiciData);    
})();
        