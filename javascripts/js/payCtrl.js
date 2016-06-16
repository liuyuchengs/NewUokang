app.controller("payCtrl",["$scope","$http","$location","Tool","Weixin",function($scope,$http,$location,Tool,Weixin){
	$scope.code=null;
	$scope.order = null;

	/*
	** 初始化页面
	*/
	$scope.init = function(){
		$scope.getParams();
		Weixin.wxInit($scope);
		Weixin.wxConfig($scope);
	}

	/*
	** 获取code和订单信息
	** code:跳转页面返回
	*/
	$scope.getParams = function(){
		if(Tool.getQueryString("code")){
			$scope.code = Tool.getQueryString("code");
		}
		if(Tool.getSession("order")){
			$scope.order = Tool.getSession("order");
		}
	}

	/*
	** 发起请求支付
	*/
	$scope.pay = function(){
		$scope.loading = true;
		Weixin.wxPay($scope.order.id,$scope.code,$scope);
	}
}])
