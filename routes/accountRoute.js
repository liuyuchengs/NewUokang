var express = require("express");
var routes = express();
var bodyParsers = require("body-parser");
routes.use(bodyParsers.json());
routes.use(bodyParsers.urlencoded({ extended: true }));

var loginSuccess = {
    "data":{
        "id":12391,
        "username":"18620369802",
        "phone":"18620369802",
        "birthday":852048000000,
        "realname":"刘玉成",
        "gender":null,
        "device":null,
        "password":null,
        "accessToken":"4f884a60062940cda7484fdaf8f2af3f",
        "remark":null,
        "giftCode":1,
        "face":null,
        "nickname":"hehe",
        "sex":"男",
        "openid":null,
        "age":20
    },
    "code":0,
    "message":"成功"
}
var loginError = {
    "data":null,
    "code":1,
    "message":"密码不正确"
}
var changeSuccess = {
    "data":{
        "id":null,
        "username":"18620369802",
        "phone":"18620369802",
        "birthday":-2303625600000,
        "realname":"刘玉成",
        "gender":null,
        "device":null,
        "password":null,
        "accessToken":"4f884a60062940cda7484fdaf8f2af3f",
        "remark":null,
        "giftCode":1,
        "face":null,
        "nickname":"小绿皮",
        "sex":"女",
        "openid":null,
        "age":26
    },
    "code":0,
    "message":"成功"
}
var orderSuccess = {
    "data": [
        {
            "id": 343,
            "orderNo": "201605101135214548",
            "hospitalId": 10088,
            "hospitalName": "加德美口腔南山区卓越维港店",
            "hospitalRegisterName": null,
            "professionName": null,
            "professionId": 20,
            "typeKey": "DENTAL",
            "doctorId": 10332,
            "doctorName": "林园哲",
            "productId": 10966,
            "productName": "超声波洁牙+抛光",
            "patient": "123",
            "hospitalAddr": "南山区卓越维港名苑9-13栋裙楼1-27",
            "treatmenttime": 1462935600000,
            "orderSource": 1,
            "patientTelephone": "18989899898",
            "hospitalTelephone": "0755-86399009",
            "sex": "男",
            "originalprice": 500,
            "discountprice": 450,
            "finalprice": null,
            "dealMoney": 50,
            "payMoney": 400,
            "giftMoney": 50,
            "scheduleId": 77592,
            "vistorId": 12391,
            "usertype": 4,
            "status": -1,
            "createtime": 1462851321000,
            "giftCodeId": null,
            "description": null,
            "permission": null,
            "finishtime": null,
            "code": null,
            "payStatus": 0,
            "alipaytradeno": null,
            "treatmenttimeStr": "2016-05-11",
            "createtimeStr": "2016-05-10"
        },
        {
            "id": 339,
            "orderNo": "201605041614497770",
            "hospitalId": 10088,
            "hospitalName": "加德美口腔南山区卓越维港店",
            "hospitalRegisterName": null,
            "professionName": null,
            "professionId": 64,
            "typeKey": "DENTAL",
            "doctorId": 10332,
            "doctorName": "林园哲",
            "productId": 10960,
            "productName": "牙齿矫正（美国隐适美隐型矫正）",
            "patient": "123",
            "hospitalAddr": "南山区卓越维港名苑9-13栋裙楼1-27",
            "treatmenttime": 1462419000000,
            "orderSource": 1,
            "patientTelephone": "18620369802",
            "hospitalTelephone": "0755-86399009",
            "sex": "男",
            "originalprice": 45000,
            "discountprice": 45000,
            "finalprice": null,
            "dealMoney": 9000,
            "payMoney": 36000,
            "giftMoney": 0,
            "scheduleId": 77595,
            "vistorId": 12391,
            "usertype": 4,
            "status": 0,
            "createtime": 1462349690000,
            "giftCodeId": null,
            "description": null,
            "permission": null,
            "finishtime": null,
            "code": null,
            "payStatus": 0,
            "alipaytradeno": null,
            "treatmenttimeStr": "2016-05-05",
            "createtimeStr": "2016-05-04"
        }
    ],
    "code": 0,
    "message": "成功"
}
var orderCancelSuccess = {
	"code":0
}
var orderCancelError = {
	"code":1
}
var cushSuccess = {
    "data": [
        {
            "id": 510553,
            "code": "K19811",
            "state": 2,
            "type": "",
            "relevancyGift": "",
            "effectDate": "2016-03-01",
            "endDate": "2016-06-30",
            "createTime": "2016-02-28 14:20:00.0",
            "flags": 300,
            "serialId": "7060300016",
            "money": 250,
            "userId": 12391
        },
		{
            "id": 510553,
            "code": "K19811",
            "state": 2,
            "type": "",
            "relevancyGift": "",
            "effectDate": "2016-03-01",
            "endDate": "2016-06-30",
            "createTime": "2016-02-28 14:20:00.0",
            "flags": 300,
            "serialId": "7060300016",
            "money": 300,
            "userId": 12391
        }
    ],
    "code": 0,
    "message": "成功"
}
var cushActiveSuccess = {
    "data": [
        {
            "id": 510553,
            "code": "K19811",
            "state": 2,
            "type": "",
            "relevancyGift": "",
            "effectDate": "2016-03-01",
            "endDate": "2016-06-30",
            "createTime": "2016-02-28 14:20:00.0",
            "flags": 300,
            "serialId": "7060300016",
            "money": 250,
            "userId": 12391
        }
    ],
    "code": 0,
    "message": "成功"
}
var cushOverSuccess = {
    "data": [
        {
            "id": 510553,
            "code": "K19811",
            "state": 1,
            "type": "",
            "relevancyGift": "",
            "effectDate": "2016-03-01",
            "endDate": "2016-06-30",
            "createTime": "2016-02-28 14:20:00.0",
            "flags": 300,
            "serialId": "7060300016",
            "money": 250,
            "userId": 12391
        },
		{
            "id": 510553,
            "code": "K19811",
            "state": 3,
            "type": "",
            "relevancyGift": "",
            "effectDate": "2016-03-01",
            "endDate": "2016-06-30",
            "createTime": "2016-02-28 14:20:00.0",
            "flags": 300,
            "serialId": "7060300016",
            "money": 300,
            "userId": 12391
        }
    ],
    "code": 0,
    "message": "成功"
}
var grabSuccess = [
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10086,
            "name":"童美口腔福田区金港豪庭店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1055",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10086,
        "id":10927,
        "introduction":null,
        "notice":null,
        "preferPrice":168,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":7,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10086/chaoshengboxiyapenshapaoguang/ae577a928a1e42e7804fbcfcff052f8c_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+喷砂+抛光",
        "amount":1
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10082,
            "name":"陈闯口腔车公庙劲松大厦店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1052",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10082,
        "id":10892,
        "introduction":null,
        "notice":null,
        "preferPrice":200,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10082/chaoshengbojieyapaoguang/778c9c291069448db58ac0c5f9ff5fb0_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洁牙+抛光",
        "amount":0
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10080,
            "name":"利民口腔福民路瑞和园店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1051",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10080,
        "id":10876,
        "introduction":null,
        "notice":null,
        "preferPrice":160,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10080/chaoshengbojieyapaoguang/0feb132e47434dc990c293fe1d77b219_300X300.jpg",
        "specialty":"通用",
        "standPrice":200,
        "status":1,
        "title":"超声波洁牙+抛光",
        "amount":1
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10073,
            "name":"天美健齿科福田区上梅林梅华店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1047",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10073,
        "id":10807,
        "introduction":null,
        "notice":null,
        "preferPrice":128,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10073/chaoshengboxiyapenshapaoguang/e94c7927c259430f95e38912d53ceee0_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+喷砂+抛光",
        "amount":0
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10072,
            "name":"天美健齿科福田区梅林中康店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1046",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10072,
        "id":10794,
        "introduction":null,
        "notice":null,
        "preferPrice":128,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":9,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10072/chaoshengboxiyapenshapaoguang/3cffde240b88491880c1156f1d1afab9_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+喷砂+抛光",
        "amount":1
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10069,
            "name":"韦博口腔福田区新州家乐福店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1044",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10069,
        "id":10748,
        "introduction":null,
        "notice":null,
        "preferPrice":128,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10069/chaoshengboxiyapenshatuominpaoguang/5e6694e56db8437186cbb15b46138c31_300X300.jpg",
        "specialty":"通用",
        "standPrice":700,
        "status":1,
        "title":"超声波洗牙+喷砂+脱敏抛光",
        "amount":0
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10038,
            "name":"德益口腔福田区石厦店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1040",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10038,
        "id":10654,
        "introduction":null,
        "notice":null,
        "preferPrice":200,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":9,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10038/chaoshengboxiyapaoguang/0cfc3cbfb0f041f0a2fe3c0ac9d645c6.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+抛光",
        "amount":0
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10048,
            "name":"弘和齿科福田保税区桂花苑店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1039",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10048,
        "id":10621,
        "introduction":null,
        "notice":null,
        "preferPrice":150,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":6,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10048/chaoshengboxiyapaoguang/ce00f242abb947c2860410107e7d17ed_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+抛光",
        "amount":1
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10043,
            "name":"弘和齿科福田石厦阳光花园店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1034",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10043,
        "id":10559,
        "introduction":null,
        "notice":null,
        "preferPrice":150,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":9,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10043/chaoshengboxiyapaoguang/ad616fb3f017414aa85612156cd49ff2_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+抛光",
        "amount":0
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":20,
                "parentid":2,
                "name":"洗牙",
                "status":1,
                "description":"齿科->洗牙",
                "orderseq":2,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10042,
            "name":"弘和齿科福田区百花长安花园店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":null,
            "longitude":null,
            "telephone":null,
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":"DSZ1033",
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10042,
        "id":10547,
        "introduction":null,
        "notice":null,
        "preferPrice":150,
        "pricetype":"元",
        "priceunit":"次",
        "recommend":null,
        "sales":7,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10042/chaoshengboxiyapaoguang/4e8cf01fe54a4e6cb4e2f082b97d975e_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"超声波洗牙+抛光",
        "amount":0
    }
]
var productSuccess = [
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10069,
            "name":"韦博口腔福田区新州家乐福店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.528336,
            "longitude":114.02539,
            "telephone":"0755-83213148",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10069,
        "id":10747,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":99,
        "pricetype":"元",
        "priceunit":"牙洞",
        "recommend":null,
        "sales":7,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10069/buyajinkounamishuzhi/462c25a9d05542c9b9c82e28b4fb972b_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"补牙(进口纳米树脂)",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10070,
            "name":"润和齿科福田区下沙岁宝店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.521578,
            "longitude":114.04444,
            "telephone":"0755-23603543",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10070,
        "id":10751,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":99,
        "pricetype":"元",
        "priceunit":"牙洞",
        "recommend":null,
        "sales":6,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10070/buyajinkounamishuzhi/4d4fea62dbcc4ed98483039f19f31345_300X300.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"补牙(进口纳米树脂)",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10008,
            "name":"博耀齿科罗湖区莲塘店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.561733,
            "longitude":114.16914,
            "telephone":"0755-25511416",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10008,
        "id":10338,
        "introduction":"龋病是一种由口腔中多种因素复合作用所导致的牙齿硬组织进行性病损，表现为无机质的脱矿和有机质的分解，随着病程的发展而有一色泽变化到形成实质性病损的演变过程充填术是目前治疗龋齿应用最广泛且成效较好的方法。 富士IX玻璃离子水门汀材料是一种快速固型玻璃离子修复材料，具有边缘密封性良好、防止继发龋、坚固美观等优点，适用于乳牙的充填。 ",
        "notice":"",
        "preferPrice":150,
        "pricetype":"元",
        "priceunit":"颗",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10008/quchixiufufushiixbolilizitianchong/f18121d2d3ef44bc8999e7a9a2197b62_300X300.jpg",
        "specialty":"通用",
        "standPrice":170,
        "status":1,
        "title":"龋齿修复（富士IX玻璃离子填充）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10022,
            "name":"赛亚齿科南山区创维大厦店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.540735,
            "longitude":113.9447,
            "telephone":"0755-86562826",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10022,
        "id":10390,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":190,
        "pricetype":"元起",
        "priceunit":"牙洞",
        "recommend":null,
        "sales":6,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10022/buyajinkounamishuzhi/bc3d895a45654b8192434280895053c0.jpg",
        "specialty":"通用",
        "standPrice":200,
        "status":1,
        "title":"补牙（进口纳米树脂）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10023,
            "name":"赛亚齿科南山区科技南路滨福店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.524986,
            "longitude":113.94944,
            "telephone":"0755-86008809",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10023,
        "id":10405,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":190,
        "pricetype":"元起",
        "priceunit":"牙洞",
        "recommend":null,
        "sales":6,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10023/buyajinkounamishuzhi/784d82b1452645509b1311b5d2510e4f.jpg",
        "specialty":"通用",
        "standPrice":200,
        "status":1,
        "title":"补牙（进口纳米树脂）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10024,
            "name":"赛亚齿科南山区蛇口南水步行街店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.488298,
            "longitude":113.92204,
            "telephone":"0755-26686930",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10024,
        "id":10420,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":190,
        "pricetype":"元起",
        "priceunit":"牙洞",
        "recommend":null,
        "sales":6,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10024/buyajinkounamishuzhi/5f07b36528e6495a805258a9dfeddd4e.jpg",
        "specialty":"通用",
        "standPrice":200,
        "status":1,
        "title":"补牙（进口纳米树脂）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10085,
            "name":"童佳口腔罗湖区桂园路店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.547361,
            "longitude":114.113014,
            "telephone":"0755-25589948",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10085,
        "id":10908,
        "introduction":"GC纳米树脂是通过模仿周围牙体组织的散射和漫反射的光学效果，单一颜色就可以达到理想的变色龙效果，使整个临床操作过程更加简便。分前牙用和后牙两种复合树脂，前牙单支A3可覆盖传统VITA16色比色中的10个颜色，方便临床操作，具有出色的美学效果。后牙用复合树脂的设计充分考虑到后牙的功能性，具备理想的物理强度，同时还不会磨损对颌牙",
        "notice":"",
        "preferPrice":198,
        "pricetype":"元",
        "priceunit":"颗",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10085/buyaribengcnamishuzhi/574563aa1a93403aaa46adcbd7462a34_300X300.png",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"补牙（日本GC纳米树脂）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10086,
            "name":"童美口腔福田区金港豪庭店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.51866,
            "longitude":114.06421,
            "telephone":"0755-86686619",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10086,
        "id":10928,
        "introduction":"GC纳米树脂是通过模仿周围牙体组织的散射和漫反射的光学效果，单一颜色就可以达到理想的变色龙效果，使整个临床操作过程更加简便。分前牙用和后牙两种复合树脂，前牙单支A3可覆盖传统VITA16色比色中的10个颜色，方便临床操作，具有出色的美学效果。后牙用复合树脂的设计充分考虑到后牙的功能性，具备理想的物理强度，同时还不会磨损对颌牙",
        "notice":"",
        "preferPrice":198,
        "pricetype":"元",
        "priceunit":"颗",
        "recommend":null,
        "sales":8,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10086/buyaribengcnamishuzhi/c409f2e7bf964c8a8c6624c56f8a0286_300X300.png",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"补牙（日本GC纳米树脂）",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10038,
            "name":"德益口腔福田区石厦店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.52405,
            "longitude":114.05681,
            "telephone":"0755-88301520",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10038,
        "id":10647,
        "introduction":"美国3Mz350纳米树脂Filtek™ Z350XT具有牙本质色、牙体色、牙釉质色和透明色，在临床充填修复过程中能更加逼真的恢复天然牙般的自然美学效果。新一代3M纳米树脂，与人体生物相容性好，患者牙体磨除量少，操作简单，成形准确。对于美观要求高，而又不愿磨除过多牙体组织的高端商务人士，美国3Mz350纳米树脂补牙是最佳的选择。",
        "notice":"",
        "preferPrice":234,
        "pricetype":"元起",
        "priceunit":"颗",
        "recommend":null,
        "sales":7,
        "sequence":null,
        "smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10038/buyameiguo3mnamishuzhitianchong/199d145b275c40b88b1fe791427f7950.jpg",
        "specialty":"通用",
        "standPrice":260,
        "status":1,
        "title":"补牙(美国3M纳米树脂填充)",
        "amount":null
    },
    {
        "applyPerson":null,
        "category":{
            "profession":{
                "id":2,
                "parentid":1,
                "name":"牙科",
                "status":1,
                "description":"牙科",
                "orderseq":1,
                "level":1,
                "typekey":"DENTAL",
                "childList":null
            },
            "subProfession":{
                "id":22,
                "parentid":2,
                "name":"补牙",
                "status":1,
                "description":"齿科->补牙",
                "orderseq":4,
                "level":2,
                "typekey":"DENTAL",
                "childList":null
            }
        },
        "daydate":null,
        "discount":null,
        "discountId":null,
        "hospital":{
            "id":10080,
            "name":"利民口腔福民路瑞和园店",
            "address":null,
            "description":null,
            "logo":null,
            "latitude":22.523588,
            "longitude":114.055916,
            "telephone":"0755-83494939",
            "city":null,
            "area":null,
            "status":null,
            "createtime":null,
            "score":null,
            "commentnum":null,
            "code":null,
            "enterpriseId":null,
            "registerName":null,
            "distance":null
        },
        "hospitalId":10080,
        "id":10864,
        "introduction":"",
        "notice":"",
        "preferPrice":240,
        "pricetype":"元",
        "priceunit":"颗",
        "recommend":null,
        "sales":9,
        "sequence":null,
        "smallImg":null,
		"smallImg":"http://biz.uokang.com/upload/image/hospital/dental/10038/buyameiguo3mnamishuzhitianchong/199d145b275c40b88b1fe791427f7950.jpg",
        "specialty":"通用",
        "standPrice":300,
        "status":1,
        "title":"补牙（瑞士瓷化树脂）",
        "amount":null
    }
]
var giftCheck = {
	result:0
}
var giftSuccess = {
	data:{
		"id":773,
	    "username":"123",
	    "mobile":"18620369802",
	    "daydate":"2016-05-17",
	    "giftCode":"2016D1057SZ0517",
	    "status":0,
	    "hospitalAddress":"深圳市南山区蛇口兴华路9号海上世界海滨商业大厦4001",
	    "hospitalName":"深圳市吾华口腔",
	    "productName":"全套洗牙(超声波+喷砂+抛光)",
	    "createtime":"2016-05-16",
	    "userId":12391
	},
	code:0

}
var findSuccess = "y";


routes.post("/wx/login/wxlogin",function(req,res){
    var userName = req.body.phone;
    var password = req.body.password;
    if(userName=="18620369802"&password=="uokang123"){
        res.json(loginSuccess);
    }else{
        res.json(loginError);
    }
	res.end();
})
routes.post("/wx/mycount/updateUserInfo",function(req,res){
    var name = req.body.name;
    var val = req.body.val;
    if(name=="sex"&val=="男"){
        res.json(changeSuccess);
    }else{
        res.json(loginError);
    }
	res.end();
})
routes.post("/wx/order/queryOrderList",function(req,res){
	res.json(orderSuccess);
	res.end();
})

routes.post("/wx/order/orderCacel",function(req,res){
	res.json(orderCancelSuccess);
	res.end();
})

routes.post("/wx/order/findAllVouchers",function(req,res){
	res.json(cushSuccess);
	res.end();
})

routes.post("/wx/order/activate",function(req,res){
	res.json(cushActiveSuccess);
	res.end();
})
routes.post("/wx/order/overdue",function(req,res){
	res.json(cushOverSuccess);
	res.end();
})
routes.post("/wx/gift/queryproduct",function(req,res){
	var page = req.body.currentPage;
	res.json(grabSuccess);
	res.end();
})
routes.post("/wx/product/querylist",function(req,res){
	var page = req.body.currentPage;
	res.json(productSuccess);
	res.end();
})
routes.post("/wx/gift/getgiftproduct",function(req,res){
	res.json(giftSuccess);
	res.end();
})
routes.post("/wx/order/checkCode",function(req,res){
	res.json(giftCheck);
	res.end();
})
routes.post("/wx/gift/getgiftproduct",function(req,res){
	res.json(giftSuccess);
	res.end();
})
routes.post("/wx/findpass/findPassPhontCheck",function(req,res){
	res.send(findSuccess);
	res.end();
})

module.exports = routes;
