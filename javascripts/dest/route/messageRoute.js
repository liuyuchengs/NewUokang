/*
** 我的消息页面路由
*/
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/user",{
		templateUrl:"section/message-user.html",
		controller:"messageUserCtrl"
	}).when("/doctor",{
		templateUrl:"section/message-doctor.html",
		controller:"messageDoctorCtrl"
	}).when("/system",{
		templateUrl:"section/message-system.html",
		controller:"messageSystemCtrl"
	}).otherwise({redirectTo:"/user"});
}])