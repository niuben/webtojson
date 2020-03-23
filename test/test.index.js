(async()=>{

    var {webToJson, extend, getContent, setCookie} = require("../index");
    
    // var content = await getContent("https://www.baidu.com/s?word=node");
    // console.log(content);

    setCookie("CGIC=Inx0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44LGFwcGxpY2F0aW9uL3NpZ25lZC1leGNoYW5nZTt2PWIzO3E9MC45; SEARCH_SAMESITE=CgQIwo4B; SID=vAdsidla7R9Onyc9DjMdWy9vI8LqaRZ_9kWnxsV8y7-i-nyTEPft8P51Z9YaEgbU2kzghg.; __Secure-3PSID=vAdsidla7R9Onyc9DjMdWy9vI8LqaRZ_9kWnxsV8y7-i-nyT75t-e3hK47-M3Yvivr3AOA.; HSID=A0ZipV_T4859KNInW; SSID=AZXn-_jdbRL1jGc_d; APISID=ww-0UBhKM2ecgeZO/A4abRCrem9-7HLbdK; SAPISID=3rlDd8b0NxjC9KJU/AZCDiS3wh2B3DpQ47; __Secure-HSID=A0ZipV_T4859KNInW; __Secure-SSID=AZXn-_jdbRL1jGc_d; __Secure-APISID=ww-0UBhKM2ecgeZO/A4abRCrem9-7HLbdK; __Secure-3PAPISID=3rlDd8b0NxjC9KJU/AZCDiS3wh2B3DpQ47; NID=200=hnBLPm7s_YnNl5RM9RpGX9aUdE8Pv7z0QE0wgJeHsgr8KKSIgOnoIYSXatCg1mt8GvpciRxMTEz_K9MoydF7d9hknQhfPjHFGRQ8y4bX-Rbw9gb_aIuhAOsqLvx3DhooWbWVuEEIYhbS0o5YRjLb0eHmnEhO01DiZMtc3q5s5TQH2tOhLcfVv34qVNWNk9Nx-edVjsf6HvhM-W7NTAAHe2BuLBqPDW4TFNntinkEnk4f-t8xqBbBNJjRGP33zO0cfq66_EbqBGpCgXlHt0-3LNoKU2HiRnsWySIS_NnCzOnafnyaFUYUFGxqJawyobXimvx1cdpf1f6GiG-E7jIgE9P2C3tJ; 1P_JAR=2020-03-23-06; DV=00RWqvECvq1AECBuCtWvdH3nvxhhEJfVf0NPdRZCHgMAAABsoyqeic4g6wAAANxq3hoRx7yYQAAAAA; UULE=a+cm9sZToxIHByb2R1Y2VyOjEyIHByb3ZlbmFuY2U6NiB0aW1lc3RhbXA6MTU4NDk0NDc0NTk3MTAwMCBsYXRsbmd7bGF0aXR1ZGVfZTc6MjIzMTkzMDM5IGxvbmdpdHVkZV9lNzoxMTQxNjkzNjExfSByYWRpdXM6MTI1MTQ3MDA=; SIDCC=AJi4QfHArc2jCiyXcO-ac0z00F85WZaooM4LHVu56Xu4PXow9urVvOGEAOgP_v07ah0j0Ny1jUs");

    var pageData = await webToJson("https://www.google.com/search?q=node", {
      id: "h3",
      title: "h3"
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
        