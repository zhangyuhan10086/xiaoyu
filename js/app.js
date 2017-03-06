
angular.module("myapp",["ngRoute"]);


angular.module("myapp").config(function($routeProvider){
    $routeProvider
        .when("/home",{
            templateUrl:"view/home.html",
            controller:"homeCtrl"
        })
        .when("/playlist",{
            templateUrl:"view/playlist.html",
            controller:"playlist"
        })
        .when("/detail/?:id",{
            templateUrl:"view/detail.html",
            controller:"detail"
        })
        .otherwise("/home")

})
angular.module("myapp").controller("appCtrl",function($scope,$http){
    $scope.picUrl="";
    $scope.SavepicUrl=function(a){
        $scope.picUrl=a;
    };

    $scope.musicId=""; //保存音乐id的全局变量
    $scope.musicUrl="" ;//保存音乐url的全局变量
    $scope.musiceIcon="";   //保存当前播放的音乐的图片
    $scope.musiceName="";    //保存当前播放的音乐的名字
    $scope.muscieAuthor="";      //保存当前播放的音乐的作者（ “如果要做播放列表把这这个变量改成数组，数组里对象属性为这几个” ）
    $scope.saveMusicId=function(id,icon,name,au){
        $scope.musicId=id;
        $scope.musiceIcon=icon;
        $scope.musiceName=name;
        $scope.muscieAuthor=au;


    };

    $scope.playmusic=function(){
        var id=$scope.musicId;
        var audio=document.getElementById("audio");
        $http({
            method:"post",
            url:"https://musicapi.duapp.com/api.php?type=url&id="+id})
            .success(function(data){
                $scope.musicUrl=data.data[0].url;
                console.log($scope.musicUrl)
                console.log(audio);
                audio.setAttribute("src", $scope.musicUrl);
                audio.play();


                var jindutiao=document.getElementsByClassName("jindutiao")[0];
                setInterval(function(){
                    var zongTime=audio.duration;
                    var Nowtime=audio.currentTime;
                    var x=Nowtime/zongTime*100+"%";
                    jindutiao.style.width=x;
                },1000)

            });
    };
    (function(){
        var onOff=true;
        var btn=document.getElementsByClassName("fa-pause-circle")[0];
        btn.onclick=function(){
            if (onOff==true){
                audio.pause();
                this.className="fa fa-play-circle-o";
            }else{
                audio.play();
                this.className="fa fa-pause-circle";
            }
            onOff=!onOff;
        }
    })();


})