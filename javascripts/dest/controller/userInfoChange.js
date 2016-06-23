define(function(){
	return function($scope,$http,$location,Tool){
		$scope.title;
		$scope.tip;
		$scope.val="";
		$scope.sexparams={
			men:true,
			women:false
		}
		$scope.titleParams = {
			"realname":"真实姓名",
			"sex":"选择性别",
			"phone":"手机号码",
			"age":"年龄",
			"nickname":"昵称",
		}
		$scope.tipParams = {
			"realname":"请填写姓名",
			"sex":"请填写性别",
			"phone":"请填写手机号码",
			"age":"请填写年龄",
			"nickname":"请填写昵称",
		}

		//页面初始化
		angular.element(document).ready(function(){
			$scope.item = $location.search().item;
			$scope.title = $scope.titleParams[$scope.item];
			$scope.tip = $scope.tipParams[$scope.item];
			if($scope.item=="sex"){
				$scope.hassex = true;
				$scope.val = "男";
			}else{
				$scope.hasinput = true;
			}
			Tool.loadUserinfo($scope);
		})

		//修改信息
		$scope.change = function(){
			if($scope.check()){
				var url = Tool.getSession("host")+"/wx/mycount/updateUserInfo";
				var params = "name="+$scope.item+"&val="+$scope.val;
				$http.post(url,params,{
					headers:{
						'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
						"accessToken":$scope.userInfo.accessToken,
					}
				})
				.success(function(data){
					if(data.code==0){
						Tool.setLocal("user",data.data);
						Tool.goPage("/new/htmls/userinfo.html");
					}else if(data.code==1){
						Tool.alert($scope,data.message);
					}
				}).error(function(){
					Tool.alert($scope,"数据更新失败!");
				})
			}
		}

		//检查内容是否符合要求
		$scope.check = function(){
			if($scope.val.length==0){
				Tool.alert($scope,"填写内容为空！");
				return false;
			}else if($scope.item=="realname"|$scope.item=="nickname"){
				if($scope.val.length>1&$scope.val.length<10){
					return true;
				}else{
					Tool.alert($scope,"请输入正确长度的名称！");
					return false;
				}
			}else if($scope.item=="sex"){
				if($scope.val=="男"||$scope.val=="女"){
					return true;
				}else{
					Tool.alert($scope,"请输入正确的性别！");
					return false;
				}
			}else if($scope.item=="phone"){
				if(/^1[3|4|5|7|8]\d{9}$/.test($scope.val)){
					return true;
				}else{
					Tool.alert($scope,"请输入正确的手机号码!");
					return false;
				}
			}else if($scope.item=="age"){
				if(parseInt($scope.val)>0&&parseInt($scope.val)<150){
					$scope.val = parseInt($scope.val);
					return true;
				}else{
					Tool.alert($scope,"请输入正确的年龄!");
					return false;
				}
			}else{
				Tool.alert($scope,"未识别需要修改的项目,请稍后再试!");
				return false;
			}
		}

		//选择性别
		$scope.select = function(value){
			if(value=="男"){
				if(!$scope.sexparams.men){
					$scope.sexparams.men = true;
					$scope.sexparams.women = false;
					$scope.val = "男";
					return;
				}
			}else if(value="女"){
				if(!$scope.sexparams.women){
					$scope.sexparams.men = false;
					$scope.sexparams.women = true;
					$scope.val = "女";
				}
			}
		}
	}
})
