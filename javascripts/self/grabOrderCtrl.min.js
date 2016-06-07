app.controller("grabOrderCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
	$scope.hasGift = false;
	$scope.gift = {};

	/*
	** 初始化页面
	*/
	$scope.init = function(){
		Ajax.loadHost = function(){
			Tool.loadUserinfo($scope);
			$scope.queryGift();
		}
	}

	/*
	** 查询惠赠订单
	*/
	$scope.queryGift = function(){
		var url = $scope.host+"/wx/order/queryUserGiftCode";
		$http.get(url,{
			headers:{
				 'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				 "accessToken":$scope.userInfo.accessToken,
			}
		}).success(function(data){
			if(data.code==0){
				if(data.data.length>0){
					$scope.gift = data.data[0];
					$scope.hasGift = true;
				}
			}
		}).error(function(){
			Tool.alert($scope,"获取惠赠信息失败，请稍后再试!");
		})
	}
}])
