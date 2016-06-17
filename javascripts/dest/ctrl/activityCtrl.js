app.controller("activityCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.queryParams = {
        pageRows:10,
		currentPage:1
    }
    $scope.products = [];

    /**
     * 页面初始化
     */
    $scope.init = function(){
        Ajax.loadHost($scope,function(){
            $scope.queryActivity();
        })
    }

    /**
     * 查询活动数据
     */
    $scope.queryActivity = function(){
        var url = $scope.host+"/wx/product/queryActivity";
        var params = Tool.convertParams($scope.queryParams);
        $http.post(url,params,{
            headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
        }).success(function(data){
            if(data.code ===0){
                $scope.mergeActivity(data.data);
                $scope.products = data.data;
            }
        }).error(function(){
            Tool.alert($scope,"获取数据失败，请稍后再试!");
        })
    }

    /**
     * 处理活动数据
     */
    $scope.mergeActivity = function(items){
		items.forEach(function(item){
			if(item.priceunit!=null&&item.priceunit!=""){
				item.preferPriceType = item.pricetype+"/"+item.priceunit;
			}else{
				item.preferPriceType = item.pricetype;
			}
			if(item.smallImg==""||item.smallImg==null){
				item.smallImg = "../contents/img/p_default.png";
			}
		})
	}

    /**
     * 跳转到详情页面
     */
    $scope.detail = function(productId,hospitalId,type){
        if(productId&&hospitalId&&type){
            if(type===5){
                Tool.goPage("/new/htmls/exam-detail.html#?productId="+productId+"&hospitalId="+hospitalId);
            }
            if(type===2){
                Tool.goPage("/new/htmls/product-detail.html#?code=123&productId="+productId+"&hospitalId="+hospitalId);
            }
        }
    }
}])