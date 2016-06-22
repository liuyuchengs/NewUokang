app.controller("doctorCtrl",["$scope","$http","Tool","Ajax","Params",function($scope,$http,Tool,Ajax,Params){
	$scope.hasDoctorMenu = true;
	$scope.loading = false;
	$scope.hasBg = false;
	$scope.profValue = "default";
	$scope.profItemValue = "default";
	$scope.doctors = [];
	$scope.noProduct = false;
	$scope.noProductText = "";
	// 下拉菜单项变量
	$scope.orderParams ={
		default:{has:true,val:""},
		title:{has:false,val:"profession_title desc"},
		score:{has:false,val:"score desc"}
	}
	$scope.areaParams = Params.areaParams;
	$scope.professionalParams = Params.professionalParams;

	// 查询参数
	$scope.queryParams = {
		professionId:"",
		itemid:"",
		orderby:"",
		city:"深圳",
		area:"",
		pageRows:10,
		currentPage:1
	}

	// 导航栏变量，需定义在上述变量的后面
	$scope.menuParams = {
		area:{has:false,val:$scope.areaParams},
		order:{has:false,val:$scope.orderParams},
		professional:{has:false,val:$scope.professionalParams},
	}

	// 初始化页面
	$scope.init = function(){
		Ajax.loadHost($scope,function(){
			$scope.loadDoctor();
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

	// 导航栏按钮click
	$scope.menuClick = function(value){
		Tool.menuClick($scope,value);
	}

	// 切换导航菜单
	$scope.switchMenu = function(menu){
		$scope.switchObj(menu,$scope.menuParams,true);
	}

	// 选择区域和排序项目
	$scope.selectMenu = function(item,obj){
		var ob = $scope.menuParams[obj].val;
		$scope.switchObj(item,ob);
		if(obj=="area"){
			$scope.queryParams.area = ob[item].val;
		}
		if(obj=="order"){
			$scope.queryParams.orderby = ob[item].val;
		}
		$scope.switchMenu(obj);
		$scope.resetDate();
		$scope.loadDoctor();
	}

	// 选择专科
	$scope.selectProfression = function(item){
		$scope.switchObj(item,$scope.professionalParams);
	}

	// 选择专科项目
	$scope.selectProfressionItem = function(item,pro){
		if(item!=$scope.profItemValue){
			if($scope.profValue==""&&$scope.profItemValue==""){
				$scope.professionalParams[pro].val[item].has = true;
			}else{
				$scope.professionalParams[$scope.profValue].val[$scope.profItemValue].has = false;
				$scope.professionalParams[pro].val[item].has = true;
			}
			$scope.profItemValue = item;
			$scope.profValue = pro;
			$scope.queryParams.professionId = $scope.professionalParams[pro].proId;
			$scope.queryParams.itemid = $scope.professionalParams[pro].val[item].id;
			$scope.switchMenu("professional");
			$scope.resetDate();
			$scope.loadDoctor();

		}
	}

	// 切换对象的值
	$scope.switchObj = function(item,obj,hasBg){
		for(var pro in obj){
			if(pro==item){
				obj[pro].has = !obj[pro].has;
				if(hasBg){
					$scope.hasBg = obj[pro].has;
				}
			}else{
				obj[pro].has = false;
			}
		}
	}

	// 加载医生数据
	$scope.loadDoctor = function(){
		$scope.loading=true;
		var url = $scope.host+"/wx/doctor/querydoctorbycityandprofession";
		var params = Tool.convertParams($scope.queryParams);
		$http.post(url,params,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			if(data.data.length<1){
				if($scope.doctors.length<1){
					$scope.noProductText = "没有项目信息,请选择其他区域或者时间!";
				}else{
					$scope.noProductText = "已经没有项目了!";
				}
				$scope.noProduct = true;
			}else{
				$scope.mergeDoctor(data.data);
				$scope.doctors = $scope.doctors.concat(data.data);
			}
			$scope.loading = false;
		}).error(function(){
			$scope.loading = false;
			$scope.noProduct = true;
			Tool.alert($scope,"数据加载失败，请稍后再试!");
		})
	}

	// 处理医生数据
	$scope.mergeDoctor = function(items){
		items.forEach(function(item){
			if(item.score==""||item.score==null){
				item.score="暂无评";
			}
			if(item.sales==""||item.sales==null){
				item.sales=0;
			}
		})
	}

	// 加载下一页数据
	$scope.loadNext = function(){
		$scope.queryParams.currentPage++;
		$scope.loadDoctor();
	}

	// 重置查询数据
	$scope.resetDate = function(){
		$scope.queryParams.currentPage = 1;
		$scope.noProduct = false;
		$scope.noProductText = "";
		$scope.doctors = [];
	}

	// 跳转到详情页面
	$scope.detail = function(id){
		Tool.goPage("/new/htmls/doctor-detail.html#?id="+id);
	}
}])
