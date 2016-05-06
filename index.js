/// <reference path="typings/tsd.d.ts" />
var express = require("express");
var app = express();
var accountRoute = require("./routes/accountRoute");

//扩管静态文件
app.use(express.static("../../webroot"));

app.get("/",function(req,res){
    res.send("hello world");
})
app.get("/product/info",function(req,res){
    res.send("/product/info");
})

app.post("/account/login",accountRoute);

app.listen(8080,function(){
    console.log("app is listen ");
})
