app.controller("myFollowCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){
    $scope.params = {
        doctor:false,
        user:true,
        product:false
    }

    $scope.switch = function(item){
        for(var proto in $scope.params){
            if(proto==item){
                $scope.params[proto] = true;
            }else{
                $scope.params[proto] = false;
            }
        }
    }
}])

app.controller("followUserCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){


}])

app.controller("followDoctorCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){

    
}])
app.controller("followProductCtrl",["$scope","$http","Tool","Ajax",function($scope,$http,Tool,Ajax){

    
}])