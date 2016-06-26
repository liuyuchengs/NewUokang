define(function(){
	return function($scope,Tool){
		$scope.phone;
		$scope.realname;
		$scope.sex;
		$scope.age;
		$scope.nickname;
		$scope.email;

		//页面初始化
		$scope.init = function(){
			var user = Tool.getLocal("user");
			$scope.phone = user.phone || "";
			$scope.realname = user.realname || "";
			$scope.sex = user.sex || "";
			$scope.age = user.age || "";
			$scope.nickname = user.nickname || "";
			$scope.email = "";
			$scope.face = user.face;
		}

		// 退出登录
		$scope.exit = function(){
			Tool.clearLocal();
			Tool.changeRoute("/user");
		}

		// 跳转到修改账户信息页面
		$scope.change = function(item){
			Tool.changeRoute("/user/userinfochange","item="+item);
		}

		// 未开放信息提示框
		$scope.alert = function(str){
			Tool.alert(str);
		}
	}
})
