app.controller("userCtrl",["$scope","Tool","Ajax",function($scope,Tool,Ajax){
	$scope.name;
	$scope.hasUserMenu = true;
	$scope.goto = function(path){
		if(Tool.isLogin()){
			Tool.goPage(path);
		}else{
			Tool.goPage("/new/htmls/login.html");
		}
	};
	$scope.gotoMenu = function(path){
		Tool.goPage(path);
	}
	$scope.alert = function(mes){
		Tool.alert($scope,mes);
	}

	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			$scope.switchText();
		});
	}

	$scope.switchText = function(){
		if(Tool.isLogin()){
			var name = Tool.getLocal("user").realname;
			if(name){
				$scope.name = name;
			}else{
				$scope.name = "您还没有填写名字";
			}
		}else{
			$scope.name = "点击登录注册";
		}
	}

	$scope.menuClick = function(value){
		Tool.menuClick($scope,value);
	}

	$scope.alert = function(mess){
		Tool.alert($scope,mess);
	}
}])