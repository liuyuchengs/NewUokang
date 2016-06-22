app.controller("cushCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
	$scope.cushs;
	$scope.noCush = false;
	$scope.activeValue="";

	// 初始化页面
	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			Tool.loadUserinfo($scope);
			$scope.loadCush();
		})
	}

	// 加载代金券信息
	$scope.loadCush = function(){
		var url = $scope.host+"/wx/order/findAllVouchers";
		var params = "userId="+$scope.userInfo.id;
		$http.post(url,params,{
			headers: {
			   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			   'accessToken':$scope.userInfo.accessToken
			 }
		}).success(function(data){
			if(data.code==0){
				if(data.data.length==0){
					$scope.noCush = true;
				}else{
					$scope.merge(data.data);
					$scope.cushs = data.data;
				}
			}else{
				Tool.alert($scope,"数据加载失败，请稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"数据加载失败，请稍后再试!");
		})
	}

	// 判断代金券是否有使用
	$scope.merge = function(items){
		items.forEach(function(item,index,array){
			if(item.flags>item.money){
				item.used = true;
			}else{
				item.uesd = false;
			}
		})
	}

	// 激活代金券
	$scope.active = function(){
		if($scope.activeValue.length==6){
			var url = $scope.host+"/wx/order/activate";
			var params = "userId="+$scope.userInfo.id+"&code="+$scope.activeValue;
			$http.post(url,params,{
				headers: {
				   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				   'accessToken':$scope.userInfo.accessToken
				 }
			}).success(function(data){
				if(data.code==0){
					$scope.merge(data.data);
					$scope.cushs = data.data;
				}else{
					Tool.alert($scope,"代金券不正确!");
				}
			}).error(function(data){
				Tool.alert($scope,"代金券激活失败!");
			})
		}else{
			Tool.alert($scope,"请输入正确长度的代金券!");
		}
	}
}])
