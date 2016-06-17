var app = angular.module("myApp",['ngRoute']);

/*
** 数据访问类服务
*/
app.service("Ajax",["$http","$q","Tool",function($http,$q,Tool){
	//加载host
	this.loadHost = function(scope,callback){
		if(Tool.getSession("host")){
			scope.host = Tool.getSession("host");
			callback();
		}else{
			$http.get("../contents/json/host.json").success(function(data){
				var host = data.host;
				scope.host = host;
				Tool.setSession("host",host);
				callback();
			}).error(function(err){
				console.log(err);
				Tool.setSession("host","");
			});
		}
	}

	//封装ajax
	this.get = function (obj) {
            if (obj.url) {
                var defered = $q.defer();
                $http.get(obj.url).success(function (data) {
                    return defered.resolve(data);
                }).error(function (data) {
                    return defered.reject(data);
                });
                return defered.promise;
            }
        };
	this.post = function (obj) {
		if (obj.url && obj.params != null && obj.params != undefined) {
			var defered = $q.defer();
			if (!obj.headers) {
				obj.headers = {
					'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
				};
			}
			$http.post(obj.url, obj.params, {
				headers: obj.headers
			}).success(function (data) {
				defered.resolve(data);
			}).error(function (data) {
				defered.reject(data);
			});
			return defered.promise;
		}
	};
}]);

/*
**工具类服务
*/
app.service("Tool",["$location",function($location,Ajax){
	/*
	** 操作localStorage和sessionStorage
	*/
	this.getLocal = function(key){
		return JSON.parse(localStorage.getItem(key));
	};
	this.setLocal = function(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	};
	this.removeLocal = function(key){
		localStorage.removeItem(key);
	};
	this.clearLocal = function(){
		localStorage.clear();
	}
	this.getSession = function(key){
		return JSON.parse(sessionStorage.getItem(key));
	}
	this.setSession = function(key,value){
		sessionStorage.setItem(key,JSON.stringify(value));
	}
	this.removeSession = function(key){
		sessionStorage.removeItem(key);
	}

	/*
	** 跳转到下一页，不带host
	*/
	this.goPage = function(path){
		if(this.getSession("host")){
			location.href = this.getSession("host")+path;
		}
	}

	/*
	** 跳转到指定页面，带host
	*/
	this.goUrl = function(url){
		if(url.length>0){
			location.href = url;
		}
	}

	/*
	** 获取host
	*/
	this.getHost = function(){
		var host = "";
		if(this.getSession("host")){
			host = this.getSession("host");
		}
		return host;
	}
	this.isLogin = function(){
		if(this.getLocal("accessToken")){
			return true;
		}else{
			return false;
		}
	}
	this.isUserInfoComplete = function(){
		var userInfo = this.getLocal("user");
		if(userInfo.realname==""||userInfo.realname==null||userInfo.sex==""||userInfo.sex==null||userInfo.age==""||userInfo.age==null||userInfo.phone==""||userInfo.phone==null){
			return false;
		}else{
			return true;
		}
	}
	this.select = function(params,obj){
		for(var proto in obj){
			if(proto==params){
				if(!obj[params].has){
					obj[params].has = true;
				}
			}else{
				if(obj[proto].has){
					obj[proto].has = false;
				}
			}
		}
	}
	//确认按钮的提示框
	this.alert = function(scope,mess,callback){
		scope.message = mess;
		scope.hasCancel = false;
		scope.hasComfirm = true;
		scope.hasTip = true;
		if(callback){
			scope.comfirm = callback;
		}else{
			scope.comfirm = function(){
				scope.hasTip = false;
			}
		}
	}
	//确认和取消按钮的提示框
	this.comfirm = function(scope,mess,callback){
		scope.message = mess;
		scope.hasCancel = true;
		scope.hasComfirm = true;
		scope.hasTip = true;
		scope.comfirm = callback;
		if(!scope.cancel){
			scope.cancel = function(){
				scope.hasTip = false;
			}
		}
	}
	//获取用户信息
	this.loadUserinfo = function(scope,callback){
		if(this.isLogin()){
			scope.userInfo = {};
			scope.userInfo.id = this.getLocal("user").id;
			scope.userInfo.accessToken = this.getLocal("accessToken");
		}else{
			if(callback){
				callback();
			}
		}
	}
	//将对象转换成查询字符串
	this.convertParams = function(obj){
		var params = "";
		for(var property in obj){
			if(obj[property]!=null){
				params += property+"="+obj[property]+"&";
			}
		}
		//截取掉最后一个"&"
		params = params.slice(0,params.length-1);
		return params;
	}

	/*
	** 导航栏点击事件
	*/
	this.menuClick = function(scope,value){
		var page = "";
		var url = "";
		if(scope.hasHomeMenu){
			page = "home";
		}else if(scope.hasDoctorMenu){
			page = "doctor";
		}else if(scope.hasInteractionMenu){
			page = "interaction";
		}else if(scope.hasUserMenu){
			page = "user"
		}
		if(page!=value){
			if(value=="home"){
				this.goPage("/new/htmls/home.html");
			}else if(value=="doctor"){
				if(this.isLogin()&&this.getLocal("accessToken")=="db284606729f481fb48d7bdbb373231b"){
					this.goPage("/new/htmls/doctor.html");
				}else{
					this.alert(scope,"敬请期待!");
				}
			}else if(value=="interaction"){
				if(this.isLogin()&&this.getLocal("accessToken")=="db284606729f481fb48d7bdbb373231b"){
					this.goPage("/new/htmls/interaction.html");
				}else{
					this.alert(scope,"敬请期待!");
				}
			}else if(value="user"){
				this.goPage("/new/htmls/user.html");
			}
		}
	}

	/*
	** 获取url查询参数
	*/
	this.getQueryString = function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
}])

/*
** 微信服务
*/
app.service("Weixin",["$http","Tool",function($http,Tool){
	//初始化完成后，检查客户端版本 --first--
	this.wxInit = function($scope,callback){
		//wx初始化后检查客户端
		wx.ready(function(){
			wx.checkJsApi({
				//需要检测的JS接口列表
				jsApiList: ['getLocation','chooseWXPay'],
				success: function(result) {
					//以键值对的形式返回，可用的api值true，不可用为false
					if(!result.checkResult.getLocation||!result.checkResult.chooseWXPay){
						alert("客户端版本过低，请微信升级客户端!");
					}
				}
			})
			if(callback){
				wx.getLocation({
					type:"wgs84",
					success:function(res){
						var locationInfo = {
							latitude:res.latitude, //维度
							longitude:res.longitude //经度
						}
						Tool.setSession("locationInfo",locationInfo);
						callback(locationInfo.latitude,locationInfo.longitude);
					},
					fail:function(){
						$scope.locationInfo = "定位失败";
					}
				});
			}
		})
	}

	//初始化wx对象 --second--
	this.wxConfig = function(scope){
		var params = {
			debug:false,
			appId : "",
			timestamp : "",
			nonceStr : "",
			signature : "",
			jsApiList : ['getLocation','chooseWXPay'],
		};
		var url = Tool.getSession("host")+"/weixin/check/getjsconfig";
		var param = "url="+encodeURIComponent(location.href);
		$http.post(url,param,{
			headers:{
				'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
			}
		}).success(function(data){
			params.appId = data.appId;
			params.timestamp = data.timestamp;
			params.nonceStr = data.nonceStr;
			params.signature = data.signature;
			wx.config(params);
		}).error(function(){
			Tool.alert(scope,"初始化WX对象失败，请稍后再试！");
		})
	}

	//分享至朋友圈
	this.wxShare = function(obj){
		wx.onMenuShareTimeline({
			title: obj.title, // 分享标题
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl, // 分享图标
			success: obj.success,
			cancel: obj.cancel,
		});
	}

	//检查微信支付的参数是否完整
	this.wxCheckPayParams = function(params){
		if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
			return false;
		}else{
			return true;
		}
	}

	//获取支付参数，并发起支付
	this.wxPay = function(orderId,code,scope){
		var params = {
			timestamp: "",
			nonceStr: '',
			package: '',
			signType: '',
			paySign: '',
			success:function() {
				Tool.goPage("/new/htmls/pay-result.html#?payResult=success");
			},
			cancel:function(){
				Tool.goPage("/new/htmls/pay-result.html#?payResult=fail");
			},
			fail:function(){
				Tool.goPage("/new/htmls/pay-result.html#?payResult=fail");
			}
		};
		if(orderId!=""&orderId!=null){
			var accessToken = Tool.getLocal("accessToken");
			var url = Tool.getSession("host")+"/wx/order/weixin";
			var param = "payType=JSAPI&orderId="+orderId+"&code="+code;
			$http.post(url,param,{
				headers:{
					'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
					'accessToken':accessToken,
				}
			}).success(function(data){
				params.timestamp = data.data.timeStamp;
				params.nonceStr = data.data.nonceStr;
				params.package = data.data.package;
				params.signType = "MD5";
				params.paySign = data.data.sign;
				if(params.timestamp==""||params.timestamp==null||params.nonceStr==""||params.nonceStr==null||params.package==""||params.package==null||params.signType==""||params.signType==null||params.paySign==""||params.paySign==null){
					scope.loading = false;
					Tool.alert(scope,"请求支付参数失败，请稍后再试!");
				}else{
					scope.loading = false;
					wx.chooseWXPay(params);
				}
			}).error(function(){
				scope.loading = false;
				Tool.alert(scope,"请求支付参数失败，请稍后再试!");
			})
		}
	}
}])

/*
** ***指令类***
*/
//图片加载失败后，使用默认图片
app.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   }
   return fallbackSrc;
});
//ng-repeat后触发事件
app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
}});

/*
** 存储菜单变量
*/
app.service("Params",[function(){
	this.defaultParams = {
		default:{has:true,id:""}
	}
	this.areaParams = {
		default:{has:true,val:""},
		futian:{has:false,val:"福田区"},
		nanshan:{has:false,val:"南山区"},
		luohu:{has:false,val:"罗湖区"},
		baoan:{has:false,val:"宝安区"},
		longhua:{has:false,val:"龙华新区"},
		longgang:{has:false,val:"龙岗区"},
		yantian:{has:false,val:"盐田区"},
	}
	this.yakeParams = {
		all:{has:true,id:""},
		zzy:{has:false,id:19},
		xiya:{has:false,id:20},
		kcy:{has:false,id:82},
		buya:{has:false,id:22},
		baya:{has:false,id:23},
		ycmr:{has:false,id:24},
		jiaozheng:{has:false,id:64},
		yichi:{has:false,id:65},
		yzzl:{has:false,id:63},
		qita:{has:false,id:60},
	};
	this.meirongParams = {
		all:{has:true,id:""},
		yanbu:{has:false,id:7},
		mianbu:{has:false,id:8},
		bibu:{has:false,id:9},
		xiong:{has:false,id:45},
		xizhi:{has:false,id:12},
		simi:{has:false,id:78},
		zhushe:{has:false,id:79},
		jiguang:{has:false,id:80},
		koucun:{has:false,id:81},
		qita:{has:false,id:13},
	};
	this.fckParams = {
		all:{has:true,id:""},
		jiancha:{has:false,id:48},
		fenmian:{has:false,id:49}
	};
	this.zhongyiParams = {
		all:{has:true,id:""},
		toubu:{has:false,id:51},
		jianjing:{has:false,id:52},
		yaobu:{has:false,id:53},
		tuibu:{has:false,id:54},
		quanshen:{has:false,id:55},
		jingluo:{has:false,id:56},
		qita:{has:false,id:57}
	}
	this.tijianParams = {
		default:{has:true,val:""},
		shangye:{has:false,val:75},
		changgui:{has:false,val:67},
		zhongnian:{has:false,val:69},
		laonian:{has:false,val:70},
		ruzhi:{has:false,val:71},
		yunqian:{has:false,val:72},
		qingnian:{has:false,val:68},
		ertong:{has:false,val:74},
		manbing:{has:false,val:73},
	}
	this.professionalParams = {
		default:{has:true,val:this.defaultParams,proId:""},
		yake:{has:false,val:this.yakeParams,proId:"2"},
		meirong:{has:false,val:this.meirongParams,proId:"3"},
		fck:{has:false,val:this.fckParams,proId:"4"},
		zhongyi:{has:false,val:this.zhongyiParams,proId:"6"},
		tijian:{has:false,val:this.tijianParams,proId:"5"}
	}
}])
