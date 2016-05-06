app.controller("registerCtrl",["$scope","Tool","Ajax",function($scope,Tool,Ajax){
	$scope.phone="";
	$scope.password="";
	$scope.passwordAgian="";
	$scope.codeText="获取短信验证码";
	$scope.codeState = true;
	$scope.code=false;
	$scope.hasTip = false;
	$scope.hasComfirm = true;
	$scope.hasCancel = false;
	$scope.message = "";
	$scope.disable = false;
	$scope.load = function(){
		Ajax.loadHost();
	}
	$scope.register = function(){
		if($scope.code){
			if($scope.check()){
				//调用后台接口
			}else{
				$scope.hasTip = true;
			}
		}else{
			$scope.message="请先输入和验证手机号码!";
			$scope.hasTip = true;
		}
	}

	$scope.check = function(){
		if(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone)&&$scope.password.length>=8&&$scope.password.length<=20){
			return true;
		}else{
			if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.phone))){
				$scope.message="手机号码错误，请仔细检查!";
				return false;
			}else if($scope.password.length<8|$scope.password.length>20){
				$scope.message="密码长度不符合要求，请输入8-20位的密码!";
				return false;
			}else if($scope.password!=$scope.passwordAgian){
				$scope.message="两次输入的密码不一致，请重新输入!";
				return false;
			}else{
				$scope.message="手机号码或者密码错误，请重新输入!";
				return false;
			}

		}
	}
	$scope.getCode = function(){
		if($scope.codeState){
			var time = 60;
			setTimeout(function(){
				$scope.codeText = (time+" S");
				time--;
				if(time>=0){
					setTimeout(arguments.callee,1000);
				}else{
					$scope.codeText = "获取短信验证码";
				}
			},1000)
		}
	}

	//提示窗口确认按钮处理函数
	$scope.comfirm = function(){
		$scope.hasTip = false;
	}
}])
