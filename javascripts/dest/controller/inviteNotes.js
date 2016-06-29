define(function(){
    return function($scope,$rootScope,Tool,Ajax){
        //定义样式
        $scope.bgStyle = {
            "width":window.screen.width,
            "height":(window.screen.width/320)*122,
        }
        $scope.bgStyle1 = {
            "width":window.screen.width,
            "height":(window.screen.width/540)*275,
        }
        $scope.bodyStyle = {
            "width":window.screen.width,
            "min-height":window.screen.height-10,
        }
    }
})