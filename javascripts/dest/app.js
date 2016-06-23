/**
 * myApp模块
 */
define(["angular"],function(angular){
    var app = angular.module("myApp",["ngRoute"]);
    app.run(function($rootScope,$location){
        //导航栏样式参数
        $rootScope.navMenuParams = {
            home:true,
            doctor:false,
            interaction:false,
            user:false,
            has:true,
        }
        $rootScope.loading = false;
        //提示框参数
        $rootScope.message = "";
        

        //获取url决定导航栏样式
        $rootScope.navMenu = function(){
            if($location.search().has){
                $rootScope.navMenuParams.has = true;
                if($location.search().val){
                    var val = $location.search().val;
                    for(var prototype in $rootScope.navMenuParams){
                        if(prototype!=="has"){
                            if(prototype ===val){
                                $rootScope.navMenuParams[val] = true;
                            }else{
                                $rootScope.navMenuParams[prototype] = false;
                            }
                        }   
                    }
                }
            }else{
                $rootScope.navMenuParams.has = false;
            }
        }


        //导航栏菜单处理事件
        $rootScope.menuClick = function(item){
            $location.path(item);
            $location.search("has","true");
            $location.search("val",item);    
        }

        //路由改变时触发
        $rootScope.$on("$routeChangeStart",function(){
            $rootScope.loading = true;
            $rootScope.navMenu();
        })

        //路由改变完成后触发
        $rootScope.$on("$routeChangeSuccess",function(){
            $rootScope.loading = false;
        })
    })
    return app;
})