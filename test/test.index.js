(async()=>{

    var {webToJson, extend, getContent, setCookie} = require("../index");
    
    // var content = await getContent("https://www.baidu.com/s?word=node");
    // console.log(content);

    setCookie("SRCHD=AF=NOFORM; _ITAB=STAB=TR; SRCHUSR=DOB=20181111&T=1549328043000&POEX=W; MUID=0FCDAC10DE926AC92E0BA1E2DA9269E1; SRCHUID=V=2&GUID=9816EAD346C04070A7355B0A70883293&dmnchg=1; MUIDB=0FCDAC10DE926AC92E0BA1E2DA9269E1; _SS=SID=254FE3A2264E68172C21ED3127606923&bIm=666; SRCHHPGUSR=CW=1049&CH=959&DPR=1&UTC=480&WTS=63720303148&HV=1584706352; ipv6=hit=1584709952402&t=4; _EDGE_S=mkt=zh-cn&SID=254FE3A2264E68172C21ED3127606923");

    var pageData = await webToJson("https://cn.bing.com/search?q=node", {
      id: "h2",
      title: "h2"
    });
    
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
        