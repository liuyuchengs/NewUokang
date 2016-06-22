app.controller("userinfoCtrl",["$scope","Ajax","Tool",function($scope,Ajax,Tool){
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
		Tool.goPage("/new/htmls/user.html");
	}

	// 条状到修改账户信息页面
	$scope.change = function(item){
		var url ="/new/htmls/userinfochange.html#?item="+item;
		Tool.goPage(url);
	}

	// 未开放信息提示框
	$scope.alert = function(str){
		Tool.alert($scope,str);
	}
}])
