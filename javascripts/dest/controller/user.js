define(function(){
    return function($scope,$rootScope,$http,Tool,Ajax){
        //变量区域
        $scope.user ={};
        $scope.hasUserMenu = true;
        $scope.isLogin = false;

        //页面初始化
        $scope.init = function(){
            Ajax.loadHost($scope,function(){
                $scope.switchText();
                if($scope.isLogin){
                    $scope.queryFocus();
                }
            });
        }

        //切换用户名称的显示
        $scope.switchText = function(){
            if(Tool.isLogin()){
                $scope.user = Tool.getLocal("user");
                Tool.loadUserinfo($scope);
                $scope.isLogin = true;
                if($scope.user.nickname===""||$scope.user.nickname===null){
                    $scope.user.nickname = "您还没有填写昵称";
                }
            }else{
                $scope.user.face = "../contents/img/men-head.png";
                $scope.user.tip = "点击登录注册";
            }
        }

        // 未开放项目的提示
        $scope.alert = function(mess){
            Tool.alert($rootScope,mess);
        }

        //获取关注数量和粉丝数量
        $scope.queryFocus = function(){
            var url = $scope.host+"/wx/focus/focusManCount";
            var params = "accessToken="+$scope.userInfo.accessToken;
            $http.post(url,params,{
                headers:{
                    'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
                }
            }).success(function(data){
                if(data.code==0){
                    if(data.data.countFocusMan===null||data.data.countFocusMan===""){
                        data.data.countFocusMan = 0;
                    }
                    if(data.data.countFansMan===null||data.data.countFansMan ===""){
                        data.data.countFansMan =0;
                    }
                    $scope.countFocusMan = data.data.countFocusMan;
                    $scope.countFansMan = data.data.countFansMan;
                }
            }).error(function(data){
                $scope.countFocusMan = 0;
                $scope.countFansMan = 0;
                Tool.alert($rootScope,"获取粉丝信息失败!");
            })
        }
        
        //跳转到选项页面
        $scope.goto = function(path){
            if(Tool.isLogin()){
                Tool.changeRoute(path,"");
            }else{
                Tool.changeRoute("/login","");
            }
        };
    }
})