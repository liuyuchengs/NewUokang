app.controller("loginCon",["$scope","Ajax","Tool",function($scope,Ajax,Tool){
	$scope.phone = "";
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
			Ajax.post(url,{"name":$scope.phone,"password":$scope.password})
				.success($scope.loginSuccess)
				.error($scope.loginError);
		}else{
			$scope.message = "请检查手机号码或者密码长度符合要求！";
			$scope.hasTip = true;
		}
	}
	$scope.check = function(){
		if($scope.phone.length==11&&$scope.password.length>=8&&$scope.password.length<=20){
			return true;
		}else{
			return false;
		}
	}
	$scope.loginSuccess = function(data){
		if(data.code==0){
			Tool.setLocal("user",data.data);
			Tool.setLocal("accessToken",data.data.accessToken);
			Tool.goPage("/htmls/user.html");
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
	$scope.comfirm = function(){
		$scope.hasTip = false;
	}
	$scope.cancel = function(){
		$scope.hasTip = false;
	}
}])
