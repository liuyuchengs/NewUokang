/*
** 路由系统
*/
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/product",{
		templateUrl:"section/exam-product.html",
		controller:"examProductCtrl"
	}).when("/hospital",{
		templateUrl:"section/exam-hospital.html",
		controller:"examHospitalCtrl"
	}).otherwise({redirectTo:"/product"});
}])