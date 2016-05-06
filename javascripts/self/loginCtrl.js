app.controller("loginCtrl",["$scope","$http","Ajax","Tool",function($scope,$http,Ajax,Tool){
	$scope.phone = "" ;
	$scope.password = "";
	$scope.hasTip = false;
	$scope.hasComfirm = true;
	$scope.hasCancel = false;
	$scope.message = "";
	$scope.load = function(){
		Ajax.loadHost();
	}
	$scope.login=function(){
		if($scope.check()){
			var host = Tool.getHost();
			var url = host+"/wx/login/wxlogin";
			var data = {phone:$scope.phone,password:$scope.password};
			var dataStr = "phone="+$scope.phone+"&password="+$scope.password;
			$http.post(url,dataStr,{
				headers: {
				   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				 }
			}).success($scope.loginSuccess).error($scope.loginError);
		}else{
			$scope.message = "请检查手机号码或者密码长度符合要求！";
			$scope.hasTip = true;
		}
	}
	$scope.check = function(){
		if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)&&$scope.password.length>=8&&$scope.password.length<=20){
			return true;
		}else{
			return false;
		}
	}
	//登录回调
	$scope.loginSuccess = function(data){
		if(data.code==0){
			Tool.setLocal("user",JSON.stringify(data.data));
			Tool.setLocal("accessToken",data.data.accessToken);
			Tool.goPage("/new/htmls/user.html");
		}else if(data.code==1){
			$scope.message = "账号或者密码错误,请重新输入";
			$scope.hasTip = true;
		}else{
			$scope.message = "未知错误!";
			$scope.hasTip = true;
		}

	}
	$scope.loginError = function(err){
		$scope.message = "登录错误，请稍后再试！";
		$scope.hasTip = true;
	}

	//提示窗口确认按钮处理函数
	$scope.comfirm = function(){
		$scope.hasTip = false;
	}
}])
