var express = require("express");
var routes = express();
var bodyParse = require("body-parser");
routes.use(bodyParse());

routes.post("/account/login",function(req,res){
    var userName = req.body.userName;
    var password = req.body.password;
    if(userName=="liuyuchengs"&password=="123456"){
        var status = 0;
        var result = {
            "userName":userName,
            "password":password
        };
        res.json({"status":status,"result":result});
    }else{
        res.json({"status":1,"result":{"username":"liuyucheng"}});
    }
})
module.exports = routes;