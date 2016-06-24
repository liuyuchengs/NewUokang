var koa = require("koa"); //koa框架
var body = require("koa-body")(); //koa的request和response转换
var router = require("koa-router")(); //koa路由
var serverStatic = require("koa-static"); //静态文件服务目录
var requests = require("request"); //http访问
var https = require("https");
var app = koa();
var fs = require("fs");
var path = require("path");
var crtFile = path.resolve("./contents/nei.cer");


/**
 * 配置
 */
app.use(serverStatic("../../webroot"));
app.use(body);

/**
 * 变量
 */
var params = {
    host:"https://www.uokang.com",
}

function mergeUrl(path){
    return params.host+path;
}

router
    .get("/test",function *(){
        this.body={
            "name":"tom",
            "age":12
        };
    })
    .post("/wx/product/queryrecommend",function *(){
        var path = this.request.path;
        var date = this.request.body;
        var readfs = fs.readFileSync(crtFile);
        requests.get(
            {
                url:mergeUrl(path),
                form:date,
            },
            function(err,response,body){
                this.body = body;
            }
        )
    })

app.use(router.routes());

//监听错误
app.on("error",function(err){
    log.error("server error:",err);
})

//监听端口
app.listen(3000,function(){
    console.log("koa is run");
});