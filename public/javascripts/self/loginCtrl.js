var app = angular.module("myApp",[]);
//数据访问类服务
app.service("Ajax",["$http","SysTool",function($http,SysTool){
	this.get = function(url){
		return $http.get(url);
	};
	this.post = function(url,data){
		return $http.post(url,data);
	};
	this.loadHost = function(){
		$http.get("../../contents/json/host.json")
		.success(function(data){
			host = data.host
			SysTool.setSession("host",host);
		})
		.error(function(err){
			console.log(err);
			SysTool.setSession("host","");
		})
	}
}]);
//工具类服务
app.service("SysTool",["$location",function($location,Ajax){
	this.getLocal = function(key){
		return localStorage[key];
	};
	this.setLocal = function(key,value){
		localStorage[key] = value;
	};
	this.getSession = function(key){
		return sessionStorage[key];
	}
	this.setSession = function(key,value){
		sessionStorage[key] = value;
	}
	this.goPage = function(path){
		if(this.getSession("host")){
			location.href = this.getSession("host")+path;
		}
	}
	this.getHost = function(){
		var host = "";
		if(SysTool.getSession("host")){
			host = SysTool.getSession("host");
		}
		return host;
	}
}])

app.controller("loginCon",["$scope","Ajax","SysTool",function($scope,Ajax,SysTool){
	$scope.phone = "";
	$scope.password = "";
	$scope.$on("$viewContentLoaded",function(){
		Ajax.loadHost();
	})
	$scope.click=function(){
		var host = SysTool.getHost();
		console.log(host);
	}

}])
