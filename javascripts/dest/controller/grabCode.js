define(function(){
	return function($scope,$http,$location,Tool){
		$scope.queryParams = {
			productId:"",
			hospitalId:"",
			dayDate:"",
			code:"",
		}
		$scope.userInfo = {};

		// 页面初始化
		angular.element(document).ready(function(){
			$scope.loadQueryParams();
			Tool.loadUserinfo($scope);
		})

		// 获取查询字符串参数
		$scope.loadQueryParams = function(){
			if($location.search().productId){
				$scope.queryParams.productId = $location.search().productId;
			}
			if($location.search().hospitalId){
				$scope.queryParams.hospitalId = $location.search().hospitalId;
			}
			if($location.search().dayDate){
				$scope.queryParams.dayDate = $location.search().dayDate;
			}
		}

		// 检查可生成惠赠订单
		$scope.checkCode = function(){
			if($scope.queryParams.code.length<1){
				Tool.alert($scope,"请填写惠赠码!");
			}else if($scope.queryParams.code.length!=5){
				Tool.alert($scope,"惠赠码错误，请填写正确的惠赠码！如需帮助请致电：0755-26905699")
			}else if($scope.queryParams.code.length ==5){
				var url = Tool.getSession("host")+"/wx/order/checkCode";
				var params = Tool.convertParams($scope.queryParams);
				$http.post(url,params,{
					headers:{
						'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
						"accessToken":$scope.userInfo.accessToken,
					}
				}).success(function(data){
					if(data.code==0){
						$scope.getGift($scope.queryParams);
					}else{
						Tool.alert($scope,data.message);
					}
				})
			}
		}

		// 生成惠赠订单
		$scope.getGift = function(queryParams){
			var url = Tool.getSession("host")+"/wx/gift/getgiftproduct";
			var params = Tool.convertParams(queryParams);
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					"accessToken":$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code ==0){
					var user = Tool.getLocal("user");
					user.giftCode = 0;
					Tool.setLocal("user",user);
					Tool.setLocal("gift",data.data)
					Tool.goPage("/new/htmls/grab-order.html");
				}
			})
		}
	}
})