var express = require("express");
var routes = express();
var bodyParse = require("body-parser");
routes.use(bodyParse());

routes.post("/wx/login/wxlogin",function(req,res){
    var userName = req.body.userName;
    var password = req.body.password;
    if(userName=="18620369802"&password=="uokang123"){
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
routes.post("/wx/login/wxlogin",function(req,res){

})

module.exports = routes;
