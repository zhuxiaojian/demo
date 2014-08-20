/* 
* @Author: 12050231
* @Date:   2014-08-20 09:35:18
* @Last Modified by :   12050231
* @Last Modified time: 2014-08-20 11:22:22
*/

(function(){
	alert("点击表格内数字,一定时间内累看谁点击的分数最多!")
	var M = MO.obs({
		total: 0
	});
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
	}).done(function(){
		var Time = 20;
		Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
			item.style.cssText = "height:" + item.clientWidth + "px;line-height:" + item.clientWidth + "px;" ;
			var R = parseInt(Math.random() * 1000,10);
			R = (Math.random() * 2 > 1) ? -R : R;
			item.dataset.total = R;
			item.innerHTML = R;
			
			
		});
		var startClick = setInterval(function(){
			console.log(Time)
			if(Time <= 0.1){
				clearInterval(startClick);
			}
			Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
				var R = parseInt(Math.random() * 1000,10);
				R = (Math.random() * 2 > 1) ? -R : R;
				item.dataset.total = R;
				item.innerHTML = R;
				M.trigger("start");
			});
		}, 1000);
		M.one("start", function(){
			console.log(2323)
			var timeAuto = setInterval(function(){
				if(Time <= 0.1){
					clearInterval(timeAuto);
				}
				Time -= 0.1;
				Time = Time.toFixed(1);
				document.querySelector("#time").innerHTML = Time;
			}, 100);
		});
			
		// M.one("touch:total", function(el){
			var totalNumber = 0;
			Array.prototype.slice.call(document.querySelectorAll("li")).forEach(function(item, index){
				item.addEventListener("click", function(){
					alert(2)
					totalNumber += parseInt(this.dataset.total,10);
					if(parseInt(this.dataset.total) < 0){
						this.innerHTML = "手下留情";
					}else{
						this.innerHTML = "恭喜得分";
					}
					this.dataset.total = 0;
					document.querySelector("#total").innerHTML = totalNumber;
				});
			})
		// })
			
	});

		
	

}());
	
