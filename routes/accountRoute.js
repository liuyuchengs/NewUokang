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

module.exports = routes;
