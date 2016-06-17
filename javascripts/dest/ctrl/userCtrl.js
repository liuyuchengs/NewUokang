app.controller("userCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
	$scope.name;
	$scope.hasUserMenu = true;
	$scope.isLogin = false;
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
			if($scope.isLogin){
				$scope.queryFocus();
			}
		});
	}

	$scope.switchText = function(){
		if(Tool.isLogin()){
			var name = Tool.getLocal("user").realname;
			Tool.loadUserinfo($scope);
			$scope.isLogin = true;
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

	/**
	 * 获取关注数量
	 */
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
			Tool.alert($scope,"获取粉丝信息失败!");
		})
	}
}])
