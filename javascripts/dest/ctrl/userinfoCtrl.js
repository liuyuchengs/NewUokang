app.controller("userinfoCtrl",["$scope","Ajax","Tool",function($scope,Ajax,Tool){
	$scope.phone;
	$scope.realname;
	$scope.sex;
	$scope.age;
	$scope.nickname;
	$scope.email;

	angular.element(document).ready(function(){
		$scope.init();
	})
	$scope.init = function(){
		var user = Tool.getLocal("user");
		$scope.phone = user.phone || "";
		$scope.realname = user.realname || "";
		$scope.sex = user.sex || "";
		$scope.age = user.age || "";
		$scope.nickname = user.nickname || "";
		$scope.email = "";
		if(user.face===""||user.face===null){
			if(user.sex==="男"||user.sex===""||user.sex===null){
				$scope.face = "../contents/img/men-head.png";
			}
			if(user.sex==="女"){
				$scope.face = "../contents/img/women-head.png";
			}
		}
	}
	//退出登录
	$scope.exit = function(){
		Tool.clearLocal();
		Tool.goPage("/new/htmls/user.html");
	}
	//修改账户信息
	$scope.change = function(item){
		var url ="/new/htmls/userinfochange.html#?item="+item;
		Tool.goPage(url);
	}
	$scope.alert = function(str){
		Tool.alert($scope,str);
	}
}])
