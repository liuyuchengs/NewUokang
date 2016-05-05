app.controller("loginCon",["$scope","Ajax","Tool",function($scope,Ajax,Tool){
	$scope.phone = "";
	$scope.password = "";
	$scope.load = function(){
		Ajax.loadHost();
	}
	$scope.login=function(){
		if($scope.check()){
			var host = Tool.getHost();
			var url = host+"/wx/login";
			Ajax.post(url,{"name":$scope.phone,"password":$scope.password})
				.success()
				.error()
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
			//账号密码错误
		}else{
			//未知错误
		}

	}
	$scope.loginError = function(err){

	}
}])
