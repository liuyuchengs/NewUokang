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
app.post("/wx/login/wxlogin",accountRoute);
app.post("/wx/mycount/updateUserInfo",accountRoute);
app.post("/wx/order/queryOrderList",accountRoute);
app.post("/wx/order/orderCacel",accountRoute);
app.post("/wx/order/findAllVouchers",accountRoute);
app.post("/wx/order/activate",accountRoute);
app.post("/wx/order/overdue",accountRoute);
app.post("/wx/gift/queryproduct",accountRoute);
app.post("/wx/product/querylist",accountRoute);
app.post("/wx/order/checkCode",accountRoute);
app.post("/wx/gift/getgiftproduct",accountRoute);
app.post("/wx/findpass/findPassPhontCheck",accountRoute);
app.post("/wx/product/querylist",accountRoute);
app.post("/wx/hospital/querylist",accountRoute);
app.post("/weixin/check/getjsconfig",accountRoute);


app.listen(8080,function(){
    console.log("app is listen ");
})
