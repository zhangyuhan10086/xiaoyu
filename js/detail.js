/**
 * Created by Administrator on 2017/3/4 0004.
 */
angular.module("myapp").controller("detail",function($scope,$http,$routeParams){

    (function(){
        var id=$routeParams["id"].substring(1);
        $http({
            method:"post",
            url:"https://api.imjad.cn/cloudmusic/?type=playlist&"+id})
            .success(function(data){
                $scope.data=data.playlist;
            });
    })()


})