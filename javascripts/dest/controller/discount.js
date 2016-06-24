define(function(){
	return function($scope,$http,Tool,Ajax){
		$scope.itemState = "discount";
		$scope.discountSelect = true;
		$scope.currentPage = 1;
		$scope.productInfo = [];
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.loading = false;

		// 初始化页面
		$scope.init = function(){
			Ajax.loadHost($scope,function(){
				$scope.loadGift();
			})
			
		}

		// 加载特惠数据
		$scope.loadGift = function(){
			$scope.loading = true;
			var url = "";
			if($scope.itemState=="discount"){
				url = $scope.host+"/wx/order/queryByGift";
			}else{
				url = $scope.host+"/wx/order/queryGift";
			}
			var params = "currentPage="+$scope.currentPage;
			$http.post(url,params,{
				headers: {
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
				'accessToken':"",
				}
			}).success(function(data){
				if(data.code==0){
					if(data.data.length<1){
						if($scope.productInfo.length<1){
							$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
						}else{
							$scope.noProductText = "已经没有项目了!";
						}
						$scope.noProduct = true;
					}else{
						$scope.mergeProdcut(data.data);
						$scope.productInfo = $scope.productInfo.concat(data.data);
					}
				}else{
					Tool.alert($scope,data.message);
				}
				$scope.loading = false;
			}).error(function(){
				$scope.noProduct = true;
				Tool.alert($scope,"获取项目信息失败，请稍后再试!");
				$scope.loading = false;
			})

		}

		// 处理特惠数据
		$scope.mergeProdcut = function(items){
			items.forEach(function(item){
				if(item.priceunit!=null&&item.priceunit!=""){
					item.preferPriceType = item.pricetype+"/"+item.priceunit;
				}else{
					item.preferPriceType = item.pricetype;
				}
				if(item.samllimg==""||item.samllimg==null){
					item.samllimg = "../contents/img/p_default.png";
				}
				if(item.money){
					item.preferPrice = item.money;
				}
			})
		}

		// 滚动监听
		window.onscroll = function(){
			if($scope.loading||$scope.noProduct){
				return;
			}
			var body = document.body;
			var html = document.documentElement;
			var height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight );
			if(height>window.innerHeight){
				if (height - window.scrollY - window.innerHeight < 100) {
					$scope.loadNext();
				}
			}
		}

		// 加载下一页
		$scope.loadNext = function(){
			$scope.currentPage++;
			$scope.loadGift();
		}

		// 切换最低和本月优惠
		$scope.switchState = function(item){
			if(item=="discount"){
				if($scope.itemState!=item){
					$scope.currentPage = 1;
					$scope.discountSelect = true;
					$scope.noProduct = false;
					$scope.itemState = item;
					$scope.productInfo = [];
					$scope.loadGift();
				}
			}else{
				if($scope.itemState!=item){
					$scope.currentPage = 1;
					$scope.discountSelect = false;
					$scope.noProduct = false;
					$scope.itemState = item;
					$scope.productInfo = [];
					$scope.loadGift();
				}
			}
		}

		// 跳转到项目详细信息
		$scope.detail = function(proId,hospitalId,preferPrice){
			var path = "/new/htmls/product-detail.html#?productId="+proId+"&hospitalId="+hospitalId;
			if($scope.itemState=="discount"){
				path += "&code=123";
			}else if($scope.itemState == "month"){
				path += "&discountid=123&flag=11&money="+preferPrice;
			}
			Tool.goPage(path);
		}

		// 疑问按钮处理函数
		$scope.question = function(){
			Tool.alert($scope,"如有疑问，请致电0755-26905699");
		}
	}
})