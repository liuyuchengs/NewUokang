var app = angular.module("myApp",[]);
//数据访问类服务
app.service("Ajax",["$http","Tool",function($http,Tool){
	this.get = function(url){
		return $http.get(url);
	};
	this.post = function(url,data){
		return $http.post(url,data);
	};
	this.loadHost = function(){
		if(Tool.getSession("host")){
			return;
		}else{
			$http.get("../../contents/json/host.json")
			.success(function(data){
				host = data.host
				Tool.setSession("host",host);
			})
			.error(function(err){
				console.log(err);
				Tool.setSession("host","");
			})
		}
	}
}]);
//工具类服务
app.service("Tool",["$location",function($location,Ajax){
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
		if(this.getSession("host")){
			host = this.getSession("host");
		}
		return host;
	}
}])
