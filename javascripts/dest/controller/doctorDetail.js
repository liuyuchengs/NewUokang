define(function(){
	return function($scope,$http,$location,$anchorScroll,Ajax,Tool){
		$scope.loading = false;
		$scope.hasTime = false;
		$scope.hasProduct = false;
		$scope.description ={
			has:false,
			val:"查看全部",
		}
		$scope.use = {
			has:false,
			val:"查看全部"
		}
		$scope.follow = {
			hasFollow:false,
			followText:"关注"
		}
		$scope.id = null;
		$scope.doctorInfo = {};
		$scope.assessInfo = [];
		$scope.time = {
			hasSelect:false,
			openSelect:false,
			selectDay:null,
			selectTime:null,
			selectId:null,
			noTime:false,
			timeList:{}
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
		// 医生评价参数
		$scope.queryParams = {
			id:null,
			currentPage:1,
			pageRows:10,
		}

		// 初始化页面
		$scope.init = function(){
			Ajax.loadHost($scope,function(){
				$scope.getParams();
				$scope.queryDoctor();
				$scope.querySchedule();
				$scope.initSwiper();
				$scope.queryAssess();
			})
		}

		// 初始化swiper
		$scope.initSwiper = function(){
			$scope.mySwiper = new Swiper('.swiper-container', {
				slidesPerView : 4,
				slidesPerGroup : 4,
				observeParents:true,  //
				observer:true
			})
		}

		// swiper跳转到指定页
		$scope.toPage = function(params,$event){
			if(params==="per"){
				$scope.mySwiper.slidePrev();
			}
			if(params==="next"){
				$scope.mySwiper.slideNext();
			}
			$event.stopPropagation();
		}

		// 切换选择就医时间
		$scope.selectTime = function(){
			$scope.hasTime = !$scope.hasTime;
		}

		// 切换选择就医项目
		$scope.selectProduct = function(){
			$scope.hasProduct = !$scope.hasProduct;
		}

		// 获取查询参数
		$scope.getParams = function(){
			if($location.search().id){
				$scope.id = $location.search().id;
				$scope.queryParams.id = $scope.id;
			}else{
				Tool.goPage("/new/htmls/doctor.html");
			}
		}

		// 收起和隐藏医生简介
		$scope.showDescription = function(){
			$scope.description.has = !$scope.description.has;
			if($scope.description.has){
				$scope.description.val = "收起简介";
			}else{
				$scope.description.val = "查看全部";
			}
		}

		// 收起和隐藏擅长简介
		$scope.showUse = function(){
			$scope.use.has = !$scope.use.has;
			if($scope.use.has){
				$scope.use.val = "收起简介";
			}else{
				$scope.use.val = "查看全部";
			}
		}

		// 获取医生信息
		$scope.queryDoctor = function(){
			$scope.loading = true;
			var url = $scope.host+"/wx/doctor/queryDoctorDetailInfo";
			var params = "needPackageInfo=true&id="+$scope.id;
			if(Tool.isLogin()){
				Tool.loadUserinfo($scope);
				params += "&accessToken="+$scope.userInfo.accessToken;
			}
			$http.post(url,params,{
				headers:{
					"content-type":'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					$scope.order.doctorName = data.data.doctorName;
					$scope.order.doctorId = data.data.id;
					$scope.order.hospitalId = data.data.hospitalId;
					$scope.order.hospitalName = data.data.hospitalname;
					$scope.order.hospitalAddress = data.data.hospitaladdress;
					if(data.data.focusState==1){
						$scope.follow.hasFollow= true;
						$scope.follow.followText = "已关注";
					}
					data.data.dentallist.forEach(function(item){
						if(item.priceunit!=null&&item.priceunit!=""){
							item.preferPriceType = item.pricetype+"/"+item.priceunit;
						}else{
							item.preferPriceType = item.pricetype;
						}
					})
					$scope.doctorInfo = data.data;
				}else{
					Tool.alert($scope,"连接数据失败，请稍后再试!");
				}
				$scope.loading = false;
			}).error(function(){
				$scope.loading = false;
				Tool.alert($scope,"连接数据失败，请稍后再试!");
			})
		}

		// 检查医生信息
		$scope.mergeDoctor = function(items){
			items.forEach(function(item){
				item.score==null|item.score==""?item.score="暂无评分":item.score+="分";
			})
		}

		// 获取医生排班信息
		$scope.querySchedule = function(){
			var url = $scope.host+"/wx/order/querybydoctorid";
			var params = "doctorId="+$scope.id;
			$http.post(url,params,{
				headers:{
					"content-type":'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					if(data.data.length>0){
						$scope.mergeSchedule(data.data);
					}else{
						$scope.time.noTime = true;
					}
				}else{
					Tool.alert($scope,"数据连接失败，请稍后再试!");
				}
			}).error(function(){
				Tool.alert($scope,"数据连接失败，请稍后再试!");
			})
		}

		// 检查医生排班信息
		$scope.mergeSchedule = function(items){
			var first = true;
			items.forEach(function(item){
				var property = item.date.slice(5,10);
				item.date = property;
				if(first){
					$scope.time.timeList[property] = {
						has:true,
						value:item
					}
					first = false;
				}else{
					$scope.time.timeList[property] = {
						has:false,
						value:item
					}
				}
			})
		}

		// 获取医生评价信息
		$scope.queryAssess = function(){
			var url = $scope.host+"/wx/review/showdoctorreview";
			var params = Tool.convertParams($scope.queryParams);
			$http.post(url,params,{
				headers:{
					"content-type":'application/x-www-form-urlencoded;charset=UTF-8',
				}
			}).success(function(data){
				if(data.code==0){
					data.data.forEach(function(item){
						if(item.totalscore==null){
							item.totalscore = "暂无评分";
						}
						else{
							item.totalscore = item.totalscore+"分";
						}
					})
					$scope.assessInfo = data.data;
				}
			}).error(function(){
				Tool.alert($scope,"数据连接失败，请稍后再试!");
			})
		}

		// 切换导航栏
		$scope.switchDay = function(property){
			Tool.select(property,$scope.time.timeList);
		}

		// 选择时间
		$scope.selectTime = function(id,time,day){
			if($scope.time.selectDay!=null&&$scope.time.selectId!=null){
				var selectDay = $scope.time.selectDay;
				var selectId = $scope.time.selectId;
				if($scope.time.timeList[selectDay]){
					var days = $scope.time.timeList[selectDay].value;
					for(var index in days.timeList){
						if(days.timeList[index].scheduleid == selectId){
							days.timeList[index].has = false;
						}
					}
				}
			}
			if($scope.time.timeList[day]){
				var days = $scope.time.timeList[day].value;
				for(var index in days.timeList){
					if(days.timeList[index].scheduleid==id){
						days.timeList[index].has = true;
						$scope.time.selectDay = day;
						$scope.time.selectId = id;
						$scope.time.selectTime = time;
						$scope.time.hasSelect = true;
						$scope.order.scheduleId = id;
						$scope.order.treatmentTime = day+" "+time;
						$scope.time.openSelect = false;
						return;
					}
				}
			}
		}

		// 获取money以及跳转页面
		$scope.orderDetail = function(id,title,price){
			if(!$scope.time.noTime){
				if($scope.time.hasSelect){
					if(!Tool.isLogin()){
						Tool.comfirm($scope,"请先登录并完善个人信息",function(){
							Tool.goPage("/new/htmls/login.html");
						})
					}else if(!Tool.isUserInfoComplete()){
						Tool.comfirm($scope,"请完善个人信息!",function(){
							Tool.goPage("/new/htmls/userinfo.html");
						})
					}else{
						$scope.loading = true;
						$scope.order.productId = id;
						$scope.order.productName = title;
						$scope.order.preferPrice = "￥"+price;
						Tool.loadUserinfo($scope);
						var url = $scope.host +"/wx/order/checkCodeMoney";
						var paramsStr = "productId="+$scope.order.productId;
						$http.post(url,paramsStr,{
							headers:{
								"Content-type":"application/x-www-form-urlencoded;charset=UTF-8",
								"accessToken":$scope.userInfo.accessToken
							}
						}).success(function(data){
							Tool.loading = false;
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
							Tool.loading = false;
							Tool.alert($scope,"加载App付款金额失败!",function(){
								$scope.hasTip = false;
							});
						})
					}
				}else{
					Tool.alert($scope,"请先预约就医时间!");
				}
			}else{
				Tool.alert($scope,"此医生没有排班，暂不能下单。去其他医生看看吧!");
			}

		}

		// 打开时间选择窗口
		$scope.openSelect = function(){
			if($scope.time.noTime){
				Tool.alert($scope,"此医生没有排班，暂不能下单。去其他医生看看吧!");
			}else{
				$scope.time.openSelect = true;
			}
		}

		// 隐藏时间选择窗口
		$scope.hideSelect = function($event){
			$scope.time.openSelect = false;
		}

		// 跳转到咨询页面
		$scope.ask = function(){
			Tool.loadUserinfo($scope,function(){
				Tool.comfirm($scope,"您还没有登录，请先登录",function(){
					Tool.goPage("/new/htmls/user.html");
				})
			});
			if(Tool.isLogin()){
				Tool.goPage("/new/htmls/askdoctor.html#?id="+$scope.id);
			}
		}

		// 跳到医生评价
		$scope.goAssess = function(){
			$location.hash("doctorAssess");
			$anchorScroll();
		}

		// 关注按钮处理函数
		$scope.switchFollow = function(){
			if(!Tool.isLogin()){
				Tool.comfirm($scope,"请先登录!",function(){
					Tool.goPage("/new/htmls/login.html");
				})
			}else{
				Tool.loadUserinfo($scope);
				if($scope.follow.hasFollow){
					$scope.cacelFollow();
				}else{
					$scope.tofollow();
				}
			}
		}

		// 关注发帖医生
		$scope.tofollow = function(){
			var url = $scope.host+"/wx/post/focus";
			var params = "flag=2&userId="+$scope.id;
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code==0){
					$scope.follow.hasFollow = true;
					$scope.follow.followText = "已关注";
				}else{
					Tool.alert($scope,"关注失败，稍后再试!");
				}
			}).error(function(){
				Tool.alert($scope,"连接数据失败，请稍后再试!");
			})
		}

		// 取消关注医生
		$scope.cacelFollow = function(){
			var url = $scope.host+"/wx/post/cacelFocus";
			var params = "flag=2&userId="+$scope.id;
			$http.post(url,params,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':$scope.userInfo.accessToken,
				}
			}).success(function(data){
				if(data.code==0){
					$scope.follow.hasFollow = false;
					$scope.follow.followText = "关注";
				}else{
					Tool.alert($scope,"取消关注失败，稍后再试!");
				}
			}).error(function(){
				Tool.alert($scope,"连接数据失败，稍后再试!");
			})
		}
	}
})