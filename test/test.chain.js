(async()=>{

    var {webToJsonChain} = require("../index");
        
    var shiciData = await webToJsonChain(
      "https://so.gushiwen.org/gushi/xiaoxue.aspx",
      {
        id: ".typecont span a",
        title: ".typecont span a",
        _url: ".typecont span a"
      },      
    ).extend({
      "content": function($){        
        return $(".contson").eq(0);
      }
    }).getData();
      
    console.log(shiciData);    
})();
        