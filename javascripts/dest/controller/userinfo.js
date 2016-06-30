define(function(){
	return function($scope,$rootScope,$timeout,Tool){
		$scope.phone;
		$scope.realname;
		$scope.sex;
		$scope.age;
		$scope.nickname;
		$scope.email;

		//页面初始化
		$scope.init = function(){
			$rootScope.hasBgColor = true;
			Tool.noWindowListen();
			if(Tool.checkLogin()){
				Tool.loadUserinfo();
				$scope.listen();
				var user = Tool.getLocal("user");
				$scope.phone = user.phone || "";
				$scope.realname = user.realname || "";
				$scope.sex = user.sex || "";
				$scope.age = user.age || "";
				$scope.nickname = user.nickname || "";
				$scope.email = "";
				$scope.face = user.face;
				$scope.wxpay = user.wxpay;
				$scope.alipay = user.alipay;
			}else{
				Tool.changeRoute("/user");
			}
			
		}

		// 退出登录
		$scope.exit = function(){
			Tool.clearLocal();
			Tool.changeRoute("/user");
		}

		// 跳转到修改账户信息页面
		$scope.change = function(item){
			var state;
			if(item==="wxpay"){
				if(Tool.userInfo.wxpay===null||Tool.userInfo.wxpay===""){
					state = 2;
				}else{
					state = 1;
				}
				Tool.changeRoute("/user/userinfochange","item="+item+"&state="+state);
			}else if(item==="alipay"){
				if(Tool.userInfo.alipay===null||Tool.userInfo.alipay===""){
					state = 2;
				}else{
					state =1;
				}
				Tool.changeRoute("/user/userinfochange","item="+item+"&state="+state);
			}else{
				Tool.changeRoute("/user/userinfochange","item="+item);
			}
			
		}

		// 未开放信息提示框
		$scope.alert = function(str){
			Tool.alert(str);
		}

		//监听Input Change
		$scope.listen = function(){
			$("#input1").on("change",function(){
				var url = $scope.getUrl(this.files[0]);
				$scope.face = url;
				$scope.$apply();
			})
		}

		$scope.updateInfo = function(){

		}


		// 获取input元素图片的url，做图片预览
		$scope.getUrl = function(obj){
			var url = null;
			if (window.createObjectURL != undefined) { // basic
				url = window.createObjectURL(obj);
			} else if (window.URL != undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(obj);
			} else if (window.webkitURL != undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(obj);
			}
			return url;
		}


		//选择图片
		$scope.chooseUserImg = function(){
			$timeout(function(){
				$("#input1").click();
			},0)
		}
	}
})
