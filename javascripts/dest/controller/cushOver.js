define(function(){
	return function($scope,$http,Tool,Ajax){
		$scope.userId;
		$scope.accessToken;
		$scope.cushs;
		$scope.noCushOver = false;

		// 初始化页面
		$scope.init = function(){
			Ajax.loadHost($scope,function(){
				Tool.loadUserinfo($scope);
				$scope.loadCushOver();
			})
		}

		// 加载过期代金券信息
		$scope.loadCushOver = function(){
			var url = $scope.host+"/wx/order/overdue";
			var params = "userId="+$scope.userInfo.id;
			$http.post(url,params,{
				headers: {
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken
				}
			}).success(function(data){
				if(data.code==0){
					if(data.data.length<1){
						$scope.noCushOver = true;
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

		// 判断代金券是过期还是已使用
		$scope.merge = function(items){
			items.forEach(function(item,index,array){
				if(item.state==1){
					item.mess="已使用";
				}else if(item.state==3){
					item.mess="已过期";
				}
			})
		}
	}
})
