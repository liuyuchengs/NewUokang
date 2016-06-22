app.controller("examDetailCtrl",["$scope","$http","$location","Tool","Ajax",function($scope,$http,$location,Tool,Ajax){
	$scope.loading = false;
	$scope.productId = null;
	$scope.hospitalId = null;
	$scope.product = null;
	$scope.productItem = [];
	$scope.schedules = [];
	$scope.hospital = null;
	$scope.hospitalImg = null;
	$scope.noSchedule = false;
	$scope.noSelectTime = false;
	$scope.scheduleParams = {};
	$scope.filterParams = {
		product:{has:true},
		hospital:{has:false},
		notice:{has:false},
	}
	$scope.order = {
		hospitalId:"",
	    doctorId:"",
	    productId:"",
	    scheduleId:"",
	    doctorName:"",
	    treatmentTime:"",
	    hospitalName:"",
	    hospitalAddress:"",
	    preferPrice:"",
	    productName:"",
	    flag:1,
	    dealMoney:"",
	    payMoney:"",
	    realMoney:"",
	    giftMoney:"",
		code:null,
		discountid:null,
	}

	// 页面初始化
	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			$scope.loading = true;
			$scope.loadParams();
			$scope.loadProduct();
			$scope.loadHospital();
			$scope.loadHopitalImg();
			$scope.loadProductItem();
			$scope.loadSchedule();
			$scope.loading = false;
		})
	}

	// 切换导航条
	$scope.switch = function(item){
		Tool.select(item,$scope.filterParams);
	}

	// 返回上一页
	$scope.back = function(){
		window.history.back();
	}

	// 获取url参数
	$scope.loadParams = function(){
		if($location.search().productId){
			$scope.productId = $location.search().productId;
			$scope.order.productId = $scope.productId;
		}
		if($location.search().hospitalId){
			$scope.hospitalId = $location.search().hospitalId;
			$scope.order.hospitalId = $scope.hospitalId;
		}
	}

	// 加载排班信息
	$scope.loadSchedule = function(){
		var url = $scope.host+"/wx/schedule/querybyhospitalid";
		var params = "hospitalId="+$scope.hospitalId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.length>0){
				$scope.mergeSchedule(data);
				$scope.schedules = data;

			}else{
				$scope.noSchedule = true;
			}
		}).error(function(){
			Tool.alert("加载排班信息失败，请稍后再试!");
		})
	}

	// 保存排班信息
	$scope.mergeSchedule = function(items){
		for(var index in items){
			var item  = items[index];
			if(index==0){
				$scope.scheduleParams[item.scheduleid] = {
					has:true,
					val:item.dateStr,
				}
				$scope.order.treatmentTime = item.dateStr;
				$scope.order.scheduleId = item.scheduleid;
			}else{
				$scope.scheduleParams[item.scheduleid] = {
					has:false,
					val:item.dateStr,
				}
			}

		}
	}

	// 加载体检套餐信息
	$scope.loadProduct = function(){
		var url = $scope.host+"/wx/product/packagedetal";
		var params = "packageid="+$scope.productId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.code==0){
				$scope.mergeProduct(data.data);
				$scope.product = data.data;
				$scope.order.productName = $scope.product.title;
				$scope.order.preferPrice = $scope.product.preferPrice+$scope.product.preferPriceType;
			}else{
				Tool.alert($scope,"加载套餐信息失败，请稍后再试!");
			}
		}).error(function(){
			Tool.alert($scope,"加载套餐信息失败，请稍后再试!");
		})
	}

	// 体检套餐为空时，使用默认图片
	$scope.mergeProduct = function(item){
		if(item.priceunit!=null&&item.priceunit!=""){
			item.preferPriceType = item.pricetype+"/"+item.priceunit;
		}else{
			item.preferPriceType = item.pricetype;
		}
		if(item.smallImg==""||item.smallImg==null){
			item.smallImg = "../contents/img/p_default.png";
		}
	}

	// 加载体检套餐的项目信息
	$scope.loadProductItem = function(){
		var url = $scope.host+"/wx/product/packagedetalItem";
		var params = "packageid="+$scope.productId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			$scope.productItem = data;
		}).error(function(){
			Tool.alert($scope,"加载体检项目失败，请稍后再试!");
		})
	}

	// 加载医院信息
	$scope.loadHospital = function(){
		var url = $scope.host+"/wx/product/hospitalbyid";
		var params = "id="+$scope.hospitalId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.code==0){
				$scope.mergeHospital(data.data);
				$scope.hospital = data.data;
				$scope.order.hospitalAddress = $scope.hospital.address;
				$scope.order.hospitalName = $scope.hospital.name;
			}
		}).error(function(){
			Tool.alert($scope,"加载医院信息失败，请稍后再试!");
		})
	}

	// 医院图片为空时，使用默认图片
	$scope.mergeHospital = function(item){
		if(item.logo==""||item.logo==null){
			item.logo = "../contents/img/p_default.png";
		}
	}

	// 加载医院图片
	$scope.loadHopitalImg = function(){
		var url = $scope.host+"/wx/image/querybymainid";
		var params = "type=HOSPITAL&mainId="+$scope.hospitalId;
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data[0].url==""|data[0].url==null){
				data[0].url = "../contents/img/p_default.png";
			}
			$scope.hospitalImg = data[0].url;
		})
	}

	// 打开选择时间按钮
	$scope.selectTimeBtn = function(){
		if(!$scope.noSchedule){
			$scope.hasSelectTime = true;
		}
	}

	// 取消选择时间
	$scope.cancelTime = function(){
		$scope.hasSelectTime = false;
	}

	// 选择时间
	$scope.selectTime = function(id){
		if(!$scope.noSchedule){
			Tool.select(id,$scope.scheduleParams);
			$scope.order.treatmentTime = $scope.scheduleParams[id].val;
			$scope.order.scheduleId = id;
		}
	}
	
	// 跳转到详细页面
	$scope.detail = function(){
		if(!Tool.isLogin()){
			Tool.comfirm($scope,"请先登录并完善个人信息!",function(){
				Tool.goPage("/new/htmls/login.html");
			})
		}else if(!Tool.isUserInfoComplete()){
			Tool.comfirm($scope,"请完善个人信息!",function(){
				Tool.goPage("/new/htmls/userinfo.html");
			})
		}else{
			$scope.loading = true;
			var url = $scope.host+"/wx/order/checkCodeMoney";
			var params = "productId="+$scope.order.productId;
			var accessToken = Tool.getLocal("accessToken");
			$http.post(url,params,{
				headers:{
					"Content-type":"application/x-www-form-urlencoded;charset=UTF-8",
					"accessToken":accessToken
				}
			}).success(function(data){
				$scope.loading=false;
				$scope.order.dealMoney = data.dealMoney;
				$scope.order.payMoney = data.payMoney;
				$scope.order.realMoney = data.realMoney;
				$scope.order.giftMoney = data.giftMoney;
				if(parseFloat($scope.order.giftMoney)<=0){
					$scope.order.flag = null;
				}
				Tool.setSession("makeorder",$scope.order);
				Tool.goPage("/new/htmls/makeorder.html");
			}).error(function(){
				$scope.loading=false;
				Tool.alert($scope,"加载App付款金额失败!")
			})
		}
	}

}])
