/**
 * myApp模块
 */
define(["angular"],function(angular){
    var app = angular.module("myApp",["ngRoute"]);
    app.run(function($rootScope,$location){
        //导航栏样式参数
        $rootScope.navMenuParams = {
            home:false,
            doctor:false,
            interaction:false,
            user:false,
        }
        $rootScope.hasNav = false;

        //加载框参数
        $rootScope.loading = false;

        //提示框参数
        $rootScope.message = null;
        $rootScope.hasCancel = null;
        $rootScope.hasComfirm = null;
        $rootScope.hasTip = null;
        $rootScope.comfirm = null;
        $rootScope.cancel = null;

        //获取url决定导航栏样式
        $rootScope.switchNavMenu = function(item){
            for(var index in $rootScope.navMenuParams){
                if(index===item){
                    $rootScope.navMenuParams[item] = true;
                }else{
                    $rootScope.navMenuParams[index] = false;
                }
            }
        }

        //导航栏菜单处理事件
        $rootScope.menuClick = function(item){
            $location.path(item);  
        }

        //路由改变时触发
        $rootScope.$on("$routeChangeStart",function(){
            $rootScope.loading = true;
            if($location.path()==="/home"){
                $rootScope.switchNavMenu("home");
                $rootScope.hasNav = true;
            }else if($location.path()==="/doctor"){
                $rootScope.switchNavMenu("doctor");
                $rootScope.hasNav = true;
            }else if($location.path()==="/interaction"){
                $rootScope.switchNavMenu("interaction");
                $rootScope.hasNav = true;
            }else if($location.path()==="/user"){
                $rootScope.switchNavMenu("user");
                $rootScope.hasNav = true;
            }else{
                $rootScope.hasNav = false;
            }
        })

        //路由改变完成后触发
        $rootScope.$on("$routeChangeSuccess",function(){
            $rootScope.loading = false;
        })

        //后台按钮处理时间
        $rootScope.changeRoute = function(path,query){
            $location.path(path);
            if(query){
                $location.search(query);
            }else{
                $location.search("");
            }
        }
    })
    return app;
})