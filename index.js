var koa = require("koa"); //koa框架
var body = require("koa-body")({
    multipart:true
}); //koa的request和response转换
var serverStatic = require("koa-static"); //静态文件服务目录
var router = require("./node/routes/mainRoute.js"); //路由模块
var app = koa();

//配置
app.use(serverStatic("../../webroot"));
app.use(body);
app.use(router.routes());


//监听端口
app.listen(3000,function(){
    console.log("koa is run");
});