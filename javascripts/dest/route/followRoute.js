/*
** 我的关注页面路由
*/
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/doctor",{
		templateUrl:"section/follow-doctor.html",
		controller:"followDoctorCtrl"
	}).when("/user",{
		templateUrl:"section/follow-user.html",
		controller:"followUserCtrl"
	}).when("/product",{
		templateUrl:"section/follow-product.html",
		controller:"followProductCtrl"
	}).otherwise({redirectTo:"/user"});
}])