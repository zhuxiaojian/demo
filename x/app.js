var app = angular.module("test", []);
var size = 3;
document.querySelector("#this").addEventListener("keyup", function(){
	window.localStorage.setItem("size", parseInt(this.value));
	window.location.href = window.location.href;
})
if(window.localStorage.getItem("size")){
	size = window.localStorage.getItem("size");
}
if(isNaN(window.localStorage.getItem("size"))){
	alert("请输入数字哦")
}
app.controller("TestCtrl", ["$scope", function($scope) {
	$scope.arr = [];

	$scope.size = size;

	for (var i=0; i<$scope.size; i++) {
		$scope.arr[i] = [];
		for (var j=0; j<$scope.size; j++) {
			$scope.arr[i][j] = 0;
		}
	}

	$scope.arr[0][0] = 1;

	$scope.gridClass = function(i, j) {
		if ($scope.arr[i][j]) {
			return "active";
		}
		else {
			return "";
		}
	};

	$scope.gridClick = function(i, j) {
		$scope.arr[i][j] = 1 - $scope.arr[i][j];

		for (var m=-1; m<=1; m+=1) {
			for (var n=-1; n<=1; n+=1) {
				var x = i+m;
				var y = j+n;
				if ((x>=0) && (x<$scope.size) && (y>=0) && (y<$scope.size) && (m*m+n*n==1)) {
					$scope.arr[x][y] = 1 - $scope.arr[x][y];
				}
			}
		}
	};

	$scope.success = function() {
		var result = 0;
		for (var i=0; i<$scope.arr.length; i++) {
			for (var j=0; j<$scope.arr[i].length; j++) {
				result += $scope.arr[i][j];
			}
		}

		return result == $scope.size * $scope.size;
	};
}]);



(function(window) {
    function pageShare(options) {
        var o = options;
        this.linkUrl = window.location.href;
        this.imgUrl = o.imgUrl||"";
        this.shareTitle = o.shareTitle || "";
        this.souhuTitle = o.souhuTitle || "";
        this.descContent = o.descContent || "";
        this.pict = "";
        this.appid = "";
        this._initShare();
        return this;
    }
    pageShare.prototype = {
        constructor: pageShare,
        _initShare: function() {
        	var that=this;
            // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 发送给好友
                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                   that._shareFriend();
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    that._shareTimeline();
                });
                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function(argv) {
                    that._shareWeibo();
                });
            }, false);

            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.call('hideToolbar');
            });

           that._shareWb();
        },

        //微信分享
        _shareFriend: function() {
            var that = this;
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": that.appid,
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            });
        },

        _shareWeibo: function() {
            var that = this;
            WeixinJSBridge.invoke('shareWeibo', {
                "content": that.descContent,
                "url": that.linkUrl,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        },

        _shareTimeline: function() {
            var that = this;
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('timeline', res.err_msg);
            });
        },
   }
   window.pageShare=pageShare;
})(window)


    //微信分享操作
    var shareThis = new pageShare({
        //分享的标题
        shareTitle:"随便玩玩",
        //微信分享的内容概要
        descContent:"奖品没有了",
        //微信分享的缩略图的地址
        imgUrl:"http://script.suning.cn/images/logo/snlogo.png"
    });




