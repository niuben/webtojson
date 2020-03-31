(async()=>{

    var webtojson = require("../index");      

    var baiduData = await webtojson(
      "https://www.google.com/search?q=node",
      {
        id: ".g",
        title: ".g .r h3"        
      },
      {         
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/82.0.4083.0 Safari/537.36",
          "Cookie":"SEARCH_SAMESITE=CgQIwo4B; SID=vAdsidla7R9Onyc9DjMdWy9vI8LqaRZ_9kWnxsV8y7-i-nyTEPft8P51Z9YaEgbU2kzghg.; __Secure-3PSID=vAdsidla7R9Onyc9DjMdWy9vI8LqaRZ_9kWnxsV8y7-i-nyT75t-e3hK47-M3Yvivr3AOA.; HSID=A0ZipV_T4859KNInW; SSID=AZXn-_jdbRL1jGc_d; APISID=ww-0UBhKM2ecgeZO/A4abRCrem9-7HLbdK; SAPISID=3rlDd8b0NxjC9KJU/AZCDiS3wh2B3DpQ47; __Secure-HSID=A0ZipV_T4859KNInW; __Secure-SSID=AZXn-_jdbRL1jGc_d; __Secure-APISID=ww-0UBhKM2ecgeZO/A4abRCrem9-7HLbdK; __Secure-3PAPISID=3rlDd8b0NxjC9KJU/AZCDiS3wh2B3DpQ47; GOOGLE_ABUSE_EXEMPTION=ID=45e200c632402e8f:TM=1585628652:C=r:IP=206.161.232.1-:S=APGng0u9c5Hk8bjVPi47SLODR21h_NQcuA; NID=201=YX2QeqARbLhsNIH4zAZhqhHrGgc4S4pOJYze88njEmB4lZhuuRIx-ylrnMxku4jJ0X4Q6o1mm1w8lhre_PuaXcJ-YJtbrpBpcn_bgZhRX8INMBY_FRxkva9B7hWcR6rNKpioT-sD_ZKRXl2m37O5eG24nuomb4E4wfDKydM-kTX58gWhpLWO4GwCBorVBkMgV0E764PCzGMQp-mAaJ1apHmndvXXINMQHZkRE9zAJ4j0iN7f1Q5sKa5-j0hd8WWrQnd5UKv46r3XE4zeCKIfiEaOuZyia58sRPAy6Plhrl2Ew0wLP1XF1GxaN6Scr1ZADXfWVIqjsZ9eTL0GEWFsKOOWAgEAaTVMeWJM85omkg; 1P_JAR=2020-3-31-4; DV=00RWqvECvq1AYPXf0FOdhZCHP1TtEhewjap4JjqDrAEAABAgbgrVr3R99wAAANxq3hoRx7yYWAAAAA; UULE=a+cm9sZToxIHByb2R1Y2VyOjEyIHByb3ZlbmFuY2U6NiB0aW1lc3RhbXA6MTU4NTYyODY2MDgzODAwMCBsYXRsbmd7bGF0aXR1ZGVfZTc6MjIzMTkzMDM5IGxvbmdpdHVkZV9lNzoxMTQxNjkzNjExfSByYWRpdXM6MTI1MTQ3MDA=; SIDCC=AJi4QfHOaDPCwat9zTt3zkHy1WIvZGK3N1AhkoaBwG-5n1Wv69hVVvTLW6k4wBhwoH7W8aStS8Y"
        }
    });
    console.log(baiduData);      
})();
        