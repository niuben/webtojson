(async()=>{

    var {webToJson, extend} = require("../index");
    
    var pageData = await webToJson("http://sports.sina.com.cn/", {
      id: "h3",
      title: "h3"
    });;
    
    // var pageData = extend(
    //     pageData,
    //     await webToJson(pageData, {
    //         id: function($) {
    //             return $(".contson").eq(0);
    //         },
    //         content: function($) {
    //             return $(".contson").eq(0);
    //         }
    //     })
    //     );
    console.log(pageData);
})();
        