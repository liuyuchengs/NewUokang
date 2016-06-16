app.controller("orderCtrl",["$scope","$http","$location","Tool",function($scope,$http,$location,Tool){
	$scope.orders;
	$scope.cancelOrderId;
	$scope.noOrder = false;
	$scope.status = "";
	$scope.btnParams = {
		toPay:false,
		payed:false,
		canceled:false,
		tocancel:false,
		finish:false,
	}
	$scope.filterParams = {
		all:{has:false,val:""},
		toPay:{has:false,val:"0"},
		toHos:{has:false,val:"2"},
		toAssess:{has:false,val:"4"}
	}

	$scope.init = function(){
		Tool.loadUserinfo($scope);
		$scope.getParams();
		$scope.loadOrder();
	}

	/**
	 * 获取查询参数
	 */
	$scope.getParams = function(){
		if($location.search().p){
			var params = $location.search().p;
			$scope.filterParams[params].has=true;
			$scope.status = $scope.filterParams[params].val;
		}
	}

	//加载订单数据
	$scope.loadOrder = function(){
		var url = Tool.getSession("host")+"/wx/order/queryOrderList";
		var params = "userId="+$scope.userInfo.id+"&status="+$scope.status;
		$http.post(url,params,{
			headers: {
			   'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			   'accessToken':$scope.userInfo.accessToken
			 }
		})
		.success(function(data){
			if(data.code==0){
				if(data.data.length==0){
					$scope.noOrder=true;
				}else{
					$scope.noOrder = false;
					$scope.merge(data.data);
				}
				$scope.orders = data.data;
			}else if(data.code==1){
				Tool.alert($scope,data.message,function(){
					$scope.hasTip = false;
				});
			}else{
				Tool.alert($scope,"获取订单信息失败，请稍后再试!",function(){
					$scope.hasTip = false;
				});
			}
		}).error(function(){
			Tool.alert($scope,"获取订单信息失败，请稍后再试!",function(){
				$scope.hasTip = false;
			});
		})
	}

	//根据订单状态码，生成对应的状态信息,如支付中...
	$scope.merge = function(orders){
		orders.forEach(function(item,index,array){
			item.toPay = false;
			item.payed = false;
			item.canceled = false;
			item.tocancel = false;
			item.finish = false;
			switch(item.status){
				case -1:
					item.statusMes = "已取消";
					item.canceled = true;
					break;
				case 0:
					item.statusMes = "待支付";
					item.toPay = true;
					item.tocancel = true;
					break;
                case 1:
                    item.statusMes = "待确认";
					item.payed = true;
					item.tocancel = true;
					break;
                case 2:
                    item.statusMes = "待就医";
					item.payed = true;
					item.tocancel = true;
					break;
                case 3:
                    item.statusMes = "就医中";
					item.payed = true;
					break;
				case 4:
					item.statusMes = "就医完成";
					item.finish = true;
					break;
				case 5:
					item.statusMes = "就医完成";
					item.finish = true;
					break;
                case 6:
                    item.statusMes = "退款中";
					break;
                case 7:
                    item.statusMes = "退款完成";
					item.finish = true;
					break;
			}
			item.discountprice = parseFloat(item.discountprice).toFixed(2);
		});
	}

	//支付订单
	$scope.toPay = function(order){
		Tool.setSession("order",order);
		var appid = "wx0229404bc9eeea00";
		var redirect_uri = Tool.getSession("host")+"/new/htmls/pay.html";
		var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=uokang#wechat_redirect";
		Tool.goUrl(url);
	}

	//取消订单
	$scope.toCancel = function(id){
		$scope.cancelOrderId = id;
		Tool.comfirm($scope,"确定要取消订单吗？",$scope.cancelFn);
	}

	//取消订单提示框，确认按钮回调
	$scope.cancelFn =function(){
		if($scope.hasTip){
			$scope.hasTip = false;
		}
		var url = Tool.getSession("host")+"/wx/order/orderCacel";
		var params = "id="+$scope.cancelOrderId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':$scope.userInfo.accessToken
			}
		}).success(function(data){
			if(data.code==0){
				$scope.status = "";
				$scope.loadOrder();
			}else if(data.code==1){
				Tool.alert($scope,"订单取消失败，请稍后再试!",function(){
					$scope.hasTip = false;
				});
			}
		}).error(function(){
			Tool.alert($scope,"订单取消失败!",function(){
				$scope.hasTip = false;
			});
		})
	}

	$scope.switchOrder = function(item){
		Tool.select(item,$scope.filterParams);
		$scope.status = $scope.filterParams[item].val;
		$scope.loadOrder();
	}
}])
