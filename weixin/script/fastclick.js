/* 
* @Author: 12050231
* @Date:   2014-08-20 09:35:18
* @Last Modified by :   12050231
* @Last Modified time: 2014-08-21 17:31:06
*/

// (function(){
	// alert("点击表格内数字,一定时间内累看谁点击的分数最多!")
	var Mdata = MO.obs({
		total: 0,
		Time: 15,
		win: function(callback){
			Mdata.on("win", function(total){
				document.title = "红包抢夺战,我从红包里得到了" + Mdata.total + "分,一起来挑战吧";
				callback(total);
			});
		}
	});
	var Game = {};
	var totalNumber = 0;
	var tmpl = '<ul>' + 
					'{# for ( var i = 0; i <' + 4 +'; i++) { #}' +
						'<li></li>' +
						'<li></li>' +
						'<li></li>' +
						'<li></li>' +
					'{# } #}' +
				'</ul>';

	MO.temple(tmpl,{}).done(function(h){
		document.querySelector("#touchBox").innerHTML = h;
	}).then(function(){
		Game = {
			total: function(){
				Mdata.on("touch:total", function(item){
					console.log("total")
					
					// Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
						item.addEventListener("touchstart", function(){
							totalNumber += parseInt(this.dataset.total,10);
							Mdata.total = totalNumber;
							if(parseInt(this.dataset.total) < 0){
								this.innerHTML = '<img width="51" height="67" src="data:image/x-png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACLCAMAAACKnj2eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB7UExURUxpcf/7/LccK/349/na3bcdK7cbKrYbKbceLPv09LYZKP3497ceLbcYKLskNOOBjsg9Te3EyPfl5f34+P/8/N+Zn/Tb3NBrdbkcLPft6uevtf/7/P////6UoP6LmPyfruPg0wK+hPHt29Vca/7Bx9vz65/kzyPGlEbPpHPAcDgAAAAbdFJOUwBYaBT5PJD+wfkPuashVP7+6i6A09hSzeSpoqk/W9MAAANOSURBVGje7Zlrc6sqFEDVqIDvqDEmYGmjae///4WHh4nmoaeTAGfmDusD1da63JsNijqOxWKxWCwWi8VisVj+DVXtjo0xYuyOjTEQTgLZmGKDEQxEY0zp4i1MRWOuevAukY3B6tmHsjFYPdCTjSnKu+rZVLWJ6olEIy7ggDEudSvrWfXEmLPTHWYAp+qRSl/3cAmSqXpcocSXStpUrtYSEg40yyzv11hrCTlTZrdsp5Gbmc4ScmaZzdxabuC9zhJyZplF+MI20lhCziyzE77u+0tzZ/R3eufBzbUDL0ndQwg13mA2FboPkAuzlb5sqsrdvKG8ixBxobfWkUd5idvyjbF5y341QCfwrxd3fNl5PYfc8FcPzvxZQl4eu80o3EN5umYtxlwccj7LfwnfCRPxotnJTlo5tOX9iP77+vr55of2wcthCqF4qMWrd2qv4H9nRgYPNIevhimEfB4//iVM2PMghfGLh7kF6cszLfSiaabdLp0nAlx5nitfnqO8y7A4iDJaOk8KRGJ/roml4P0n0tLnc124qAQ8DeefMUjcK1A6HhMuliFTykHy/S1GiQ9UKNNwre5bAGZTAQsS6Hp4uBICUEw3gRwAEOlWBkxSbMfZisUIDKxnWJhMmlOacyFoI/3KCII5RhbDUTIJW1PLb68djWHkGCPwwiTMDAotloWnaKO2sopr9Mk4VKURYVMTxqfkFDf68xlzIcGjkXHQnOJShEjIaVKeTiLQsnFdV0OeN0gar3nlIFwdaix/j2NXcdAxuYAmJbkFVyqlzfzU6BMRxIMk9yCFL4IO5PH0j0ZGrCxQn/yWWpUTkd87zSvJQV1iMfJ9f+CwnyvXoOiFbT7Q7uMWOixp1bxMDLsHmLXz8SUyHv5lDyupoCDvumfWTpQyHsYUDFKqZsKHtHsuHQjxZ5cgkn1Uokz7Redws4uUKZ1s0Xm7y+NUpHS84rnz/hIoJsqWkxlbS/3GOQzqPjGksPigM+tCpjulb78zWPQdHcmfB017xUutIGxB0fd9UQCYFPRRSnMNa+Y08zwv4/2VtfdlTGmveZUehXx5Pvlo3+r/6JgmoM9l937kBQiNfD5OvUSumKHZBWxkV8sWi8VisVgsFovFYrH83/gDaz2eK5NdYq8AAAAASUVORK5CYII=" />';
							}else{
								this.innerHTML = '<img width="51" height="67" src="data:image/x-png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACLCAMAAACKnj2eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAByUExURUxpcbgYKbcXKN/azbkhMLYZKLgZKvTr37gbK/r09MpOW9FebP37+v////////v08fv39P/+/u7Z1fv08t6Wnf////6UoP/7/LcZKAO/hf6grufj1vyLmMM2RvzN0tt1gfG2vOKepqjm02bWs9Tx6C/JmaC/BvwAAAAcdFJOUwCk5v4hynf+Sv38/T+l0WOGDcciuf////////6TDmJQAAADTUlEQVRo3u2Z23qiMBCARU4J4AmFRDAEavv+r7g5gKK4hQ2Ei/3mv2qL+juTZGCmmw0AAAAAAAAAAAAA/JecjmmIwzRZz3jBRJN6axnJgwqtYoxJj3oNp1NJ1ffX/Us5I/u5RZEUfV0FdxWmb13pcyn6kcqrjDOktlPr0UamVRl1mDSwndeh0nZmA9pL7LdK7Na6kqkN+9MuJWkmKc+H4yE5mSaW1kSfEl2C2ITEHkL1UpyezbYPZbhXChpKnbG3uI9X44vRIaE0wn3j2CFBVb9aXYwWU8RZt1+ai19GlhI1fSPBkVmYIlBe100sfxoJ0otIu/Tt2teOwWpuaZ+RQuCrIPG9K1Ziv6GZzmBsg6vY7tfHOSbcqHQ4ndAf+8aOOsX42qtWjVlR9gLH931n/L1t4egra7tF2aOforRalEWtGq6ldeVwx9pVivI4OJfU8t2OtmE+qw+jlu/pslS91Nh4vCjPX8zubqdijMeL8mxUpYp1oLhhEwrWMmGKe0/MedRWLOsPoQF9ZbtCG/Pq9FdpnJD/NDqblUCO2kV+sFZvqOuQt6oOAABrJPtjsrYyyzK8O5xXVkpEsCb98GmGUsRapv+sTY4mX5O0RuKWkvT4D0k+EBPlpuyC1Eo3DMMynTR1OO+yLDVRXlplqJSuVApwtt/9Hm+yk/lpjB4psFaW5auy3VXSnLypT8lht9fXjZRe86IstTJ7Awu3Zr/Hvb83RvdoR3++67q9KLOJcCMlitSmDYVOWDHGwkimKiOzauDwqsPV4U02ZszwoWnL89uDoq7wZCM2fUpHlBf5k9str6tpgdbGj7CIxn2n1Ob1lFi5efcTUJYPqN8iJWFV5Cr13YYmc7pKRNmtGEj7ZwXXUtfmoNBXmlldJdoOkiuonsKH73mFsHndiOdTxovPTin8cKWZ3a2LBm6YXemsbkOjuBIu0Mh6chL8LsWk+CTM8yJaZCSBhlKxa/KPxnipvjIQTaNY0yIfQRiX69aVNM5/tRY5W3Y+oJpyxv9qLQq+/ETCU025shYDX8GZnYkEUlNoFvGbtDxo9KTH0mTJC7rZN2NRLIgYa0cgNkcEKPC3b1MlZ4X/GnsIBYEjCQIEIxAAAAAAAAAAAAAAsMMfOyufd0jBUNwAAAAASUVORK5CYII=" />';
							}
							this.dataset.total = 0;
							document.querySelector("#total").innerHTML = totalNumber;
						});
					// })
				})
			},
			start: function(){
				Mdata.on("start", function(){

					var timeAuto = setInterval(function(){

						if(Mdata.Time <= 0.1){
							clearInterval(timeAuto);
						}

						Mdata.Time -= 0.1;
						Mdata.Time = Mdata.Time.toFixed(1);
						document.querySelector("#time").innerHTML = Mdata.Time;

					}, 100);
				})
			},
			startGame: function(){
				var _this = this;
				this.start();
				this.total();
				Mdata.on("start:game", function(){
					var startClick = setInterval(function(){

						if(Mdata.Time <= 0.1){
							Mdata.trigger("win", document.querySelector("#total").innerHTML);
							_this.resetGame();
							clearInterval(startClick);
						};

						Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
							var R = parseInt(Math.random() * 1000,10);
							R = (Math.random() * 2 > 1) ? -R : R;
							item.dataset.total = R;
							var _html = "";
							var arr = item.dataset.total.split("");
							for(var i = 0; i < arr.length; i++){
								// _html += '<img class="pic" src="style/images/hongbao/' + arr[i] + '.png" width="17" height="15" />';
								_html += '<span class="p' + arr[i] + '"></span>';
							}
							item.innerHTML =_html;
						});

					}, 1000);
				});
			},
			resetGame: function(){
				var reset = document.querySelector("#reset");
				var mask = document.querySelector("#mask");
				reset.style.display = "block";
				mask.style.display = "block";
				if(reset.dataset.one != "true"){
					
					reset.addEventListener("touchstart", function(){
						reset.style.display = "none";
						mask.style.display = "none";
						Mdata.total = 0;
						Mdata.Time = 15;
						totalNumber = 0;
						document.querySelector("#total").innerHTML = 0;
						Mdata.trigger("start");
						Mdata.trigger("start:game");
					});
					reset.dataset.one = "true";
				};

			},
			insertNumber: function(){
				Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
					item.style.cssText = "height:" + (item.clientWidth - 15) + "px;line-height:" + (item.clientWidth - 15) + "px;" ;
					var R = parseInt(Math.random() * 1000,10);
					R = (Math.random() * 2 > 1) ? -R : R;
					item.dataset.total = R;
					var _html = "";
					var arr = item.dataset.total.split("");
					for(var i = 0; i < arr.length; i++){
						// _html += '<img class="pic" src="style/images/hongbao/' + arr[i] + '.png" width="17" height="15" />';
						_html += '<span class="p' + arr[i] + '"></span>';
					}
					item.innerHTML =_html;
					Mdata.trigger("touch:total",item);
				});
			},
			init: function(){
				this.startGame();
				this.insertNumber();
				Mdata.trigger("start:game");
				Mdata.trigger("start");
			}
		}
			
				

	}).then(function(){
		document.querySelector("#startBtn").addEventListener("click", function(){
			document.querySelector("#page1").style.display = "none";
			Game.init();
		});
	});

	// Object.defineProperty(Mdata, "total", {
	//     set: function (value) {
	//         this._name = totalNumber;
	//     },
	//     get: function () {

	//         return totalNumber;
	//     }
	// });

	//微信分享操作
	var shareThis = new pageShare({
	    //分享的标题
	    //微信分享的内容概要
	    descContent:"天上掉红包,不捡白不捡!动动你的小手指,啪啪啪!",
	    //微信分享的缩略图的地址
	    imgUrl:"http://code.ppanda.com/demo/weixin/style/images/hongbao/logo.png"
	});

// }());
	
