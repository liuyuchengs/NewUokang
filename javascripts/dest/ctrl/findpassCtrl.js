app.controller("findpassCtrl",["$scope","$http","$location","$interval","Tool",function($scope,$http,$location,$interval,Tool){
	$scope.phone = ""; //手机号码
	$scope.code = ""; //验证码
	$scope.pwd = ""; //密码
	$scope.getPhone = $location.search().phone||""; //跳转页面缓存手机号码
	$scope.getCodes = $location.search().code||""; //跳转页面缓存验证码
	$scope.hasSendCode = false; //是否是发送验证码状态
	$scope.codeText = "获取短信验证码";
	$scope.sendCodes = false;
	
	// 检测手机号码是否有注册
	$scope.checkPhone = function(){
		var url = Tool.getSession("host")+"/wx/findpass/findPassPhontCheck";
		var params = "name=phone&param="+$scope.phone;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.code==0){
				Tool.goPage("/new/htmls/findpwd-code.html#?phone="+$scope.phone);
			}else{
				Tool.alert($scope,data.message);
			}
		}).error(function(){
			Tool.alert($scope,"检查手机号码失败，请稍后再试!");
		})
	}

	// 检测验证码是否正确
	$scope.checkCode = function(){
		if($scope.sendCodes){
			if($scope.code.length==4){
				var url = Tool.getSession("host")+"/wx/findpass/findPassPhontCheck";
				var params = "name=verifyCode&param="+$scope.code+"&p="+$scope.getPhone;
				$http.post(url,params,{
					headers:{
						'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					}
				}).success(function(data){
					if(data.code==0){
						Tool.goPage("/new/htmls/findpwd-pwd.html#?phone="+$scope.getPhone+"&code="+$scope.code);
					}else{
						Tool.alert($scope,date.message);
					}
				}).error(function(){
					Tool.alert($scope,"验证码错误!");
				})
			}else{
				Tool.alert($scope,"请输入4位验证码");
			}
		}else{
			Tool.alert($scope,"请先获取验证码");
		}
	}

	// 修改密码
	$scope.changePwd = function(){
		if($scope.pwd.length>=8&&$scope.pwd.length<=20){
			var url = Tool.getSession("host")+"/wx/findpass/changepwd";
			var params = "phone="+$scope.getPhone+"&code="+$scope.getCodes+"&password="+$scope.pwd;
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					Tool.alert($scope,"密码修改成功!",function(){
						Tool.goPage("/new/htmls/login.html");
					})
				}else{
					Tool.alert($scope,data.message);
				}
			}).error(function(){
				Tool.alert($scope,"密码修改失败，请稍后再试!");
			})
		}
	}

	// 发送短信验证码
	$scope.getCode = function(){
		if(!$scope.hasSendCode){
			var url = Tool.getSession("host")+"/wx/findpass/sendsmsfindpasscode";
			var data = "phone="+$scope.getPhone;
			$http.post(url,data,{
				headers: {
				   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				 }
			}).success(function(data){
				if(data.code==0){
					$scope.hasSendCode = true;
					$scope.sendCodes = true;
					var time = 59;
					var interval = $interval(function(){
						$scope.codeText = (time+" S");
						time--;
					},1000,60).then(function(){
						$scope.codeText = "获取短信验证码";
						$scope.hasSendCode = false;
						$interval.cancel(interval);
					})
				}else{
					Tool.alert($scope,data.mesage);
				}
			}).error(function(){
				Tool.alert($scope,"发送验证码失败，请稍后再试!");
			})
		}
	}
}])
