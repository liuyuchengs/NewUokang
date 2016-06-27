define(function(){
	return function($scope,$http,$location,Tool,Weixin){
		$scope.code=null;
		$scope.order = null;

		// 初始化页面
		$scope.init = function(){
			$rootScope.hasBgColor = false;
			$scope.getParams();
			Weixin.wxInit($scope);
			Weixin.wxConfig($scope);
		}

		// 获取code和订单信息
		$scope.getParams = function(){
			if(Tool.getQueryString("code")){
				$scope.code = Tool.getQueryString("code");
			}
			if(Tool.getSession("order")){
				$scope.order = Tool.getSession("order");
			}
		}

		// 发起请求支付
		$scope.pay = function(){
			$scope.loading = true;
			Weixin.wxPay($scope.order.id,$scope.code,$scope);
		}
	}
})