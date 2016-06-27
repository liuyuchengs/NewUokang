var router = require("koa-router")(); //koa路由
var Ajax = require("./../module/Ajax"); //http请求

// home页面
router.post("/wx/product/queryrecommend",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/banner/query",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/weixin/check/getjsconfig",function *(){
    this.body = yield Ajax.post(this.request);
})

// 登录页面
router.post("/wx/login/wxlogin",function *(){
    this.body = yield Ajax.post(this.request);
})

// 用户页面
router.post("/wx/focus/focusManCount",function *(){
    this.body = yield Ajax.post(this.request);
})

// 修改用户信息
router.post("/wx/mycount/updateUserInfo",function *(){
    this.body = yield Ajax.post(this.request);
})

//我的订单页面
router.post("/wx/order/queryOrderList",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/orderCacel",function *(){
    this.body = yield Ajax.post(this.request);
})

//代金券页面
router.post("/wx/order/findAllVouchers",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/activate",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/overdue",function *(){
    this.body = yield Ajax.post(this.request);
})

//惠赠订单
router.get("/wx/order/queryUserGiftCode",function *(){
    this.body = yield Ajax.post(this.request);
})

//找回密码
router.post("/wx/findpass/findPassPhontCheck",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/findpass/sendsmsfindpasscode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/findpass/changepwd",function *(){
    this.body = yield Ajax.post(this.request);
})

//注册
router.post("/wx/register/registercheck",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/register/sendsmsregistercode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/register/register",function *(){
    this.body = yield Ajax.post(this.request);
})

//资讯页面
router.post("/wx/health/queryByType",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/health/querydetail",function *(){
    this.body = yield Ajax.post(this.request);
})

//特惠页面
router.post("/wx/order/queryByGift",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/queryGift",function *(){
    this.body = yield Ajax.post(this.request);
})

//免费抢单
router.get("/wx/gift/querydate",function *(){
    this.body = yield Ajax.get(this.request);
})
router.post("/wx/gift/queryproduct",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/checkCode",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/gift/getgiftproduct",function *(){
    this.body = yield Ajax.post(this.request);
})

//项目列表
router.post("/wx/product/querylist",function *(){
    this.body = yield Ajax.post(this.request);
})

//项目详情
router.post("/wx/image/querybymainid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/hospital/querybyid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/image/querybymainid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/doctor/queryscheduledoctorbyproductid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/schedule/querybydoctorid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/checkCodeMoney",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/focus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/cacelFocus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/product/querybyid",function *(){
    this.body = yield Ajax.post(this.request);
})

//订单详情
router.post("/wx/order/make",function *(){
    this.body = yield Ajax.post(this.request);
})

//医生列表
router.post("/wx/doctor/querydoctorbycityandprofession",function *(){
    this.body = yield Ajax.post(this.request);
})

//医生详情
router.post("/wx/doctor/queryDoctorDetailInfo",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/order/querybydoctorid",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/focus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/cacelFocus",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/review/showdoctorreview",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/postList",function *(){
    this.body = yield Ajax.post(this.request);
})

//帖子详情页面
router.post("/wx/post/postDetail",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/postMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/thumbUp",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/addRepliesMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/addRepliesMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/myPost",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/myReply",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/repliesMessage/myMessage",function *(){
    this.body = yield Ajax.post(this.request);
})
router.post("/wx/post/doctorMessage",function *(){
    this.body = yield Ajax.post(this.request);
})

module.exports = router;
