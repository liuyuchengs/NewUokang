/**
 * requirejs 入口
 */

//配置require
require.config({
    paths:{
        "angular":"../lib/angular.min",
        "angular-route":"../lib/angular.route.min",
        "jquery":"../lib/jquery.min",
        "swiper":"../lib/swiper.min",
        "wx":"https://res.wx.qq.com/open/js/jweixin-1.0.0",
        "router":"router",
        "app":"app",
        "service":"service/service",
        "filter":"service/filter",
        "directive":"service/directive",
    },
    shim:{
        "angular":{
            exports:"angular"
        },
        "angular-route":{
            deps:['angular'],
            exports:'ngRouteModule',
        },
    },
})

//使用require
require(["angular","app","angular-route","router","jquery","swiper","service","directive","filter"],function(angular){
    angular.bootstrap(document,['myApp']);
})