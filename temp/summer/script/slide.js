/* 
 * @Author: luoyuting
 * @Date:   2014-08-24 09:58:31
 * @Last Modified by:   luoyuting
 * @Last Modified time: 2014-08-25 11:16:43
 */
 (function(b) {
 	   setTimeout(scrollTo, 0 ,0, 0);
	    var container = b('.sg-wrap'),
	    down = b('.down-arrow'),
	    up = b('.up-arrow'),
		ops = {
			y: 0,
			h: b(window).height(),
			current: 0
		}, 
		touchType,  //考虑到设备兼容性
		slideBox = container.find('.sg-page-slide'),
		len = slideBox.length,
		current = container.find('.current').index(),
		dir = 1, //默认操作下一张(up滑动)
		flag = false;
     
    function init(){
    	slideBox.find('.sg-build').addClass('active');
    	loadEvents();
        var startIndex = getUrlQueryString("page"); //考虑到从其他页面跳转到某个指定的页面,获取index值
        if(startIndex == null) return;
        slideBox.removeClass('current');
        slideBox.eq(startIndex - 1).addClass('current');
        current = startIndex - 1 ;
    }
	function loadEvents(){
		b(window).on('touchmove MSPointerMove pointermove', function(e) {
		   e.preventDefault();
	    }).resize(function() {
		    reset();
	    });
	    container.on('touchstart MSPointerDown pointerdown', function(e) {
		   startTouch(e);
	    }).on('touchmove MSPointerMove pointermove', function(e) {
		   startMove(e);
	    }).on('touchend MSPointerUp pointerup MSGestureEnd MSPointerCancel pointercancel', function(e) {
		   ops.y = 0;
		   trsEnd();
	    });
	}
    function startTouch(e){
        if ((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) return
		   touchType = _isPointerType ? e : e.touches[0]; //兼容windows phone
		   ops.y = parseInt(touchType.clientY);
	       reset();
    }
    function startMove(e){
    	if ((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) return
		touchType = _isPointerType ? e : e.touches[0];
		var y = parseInt(touchType.clientY) - ops.y;
		var direction = y > 0 ? 'down' : 'up';
		if (Math.abs(y) < 80) return false;
		if(current == len - 1) {
            if(direction == 'up') return;
            direction == 'down' && slide(y);
		}else if(current == 0){
			slideBox.find('.sg-build').removeClass('active');
			if(direction == 'down') return;
		    direction == 'up' && slide(y);
		}else{
            slide(y);
		}
    }

    function getUrlQueryString(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r != null) return  unescape(r[2]); 
       return null;
    }
    
	function reset() {
		var h = ops.h = $(window).height();
		var prev = current - 1 < 0 ? len - 1 : current - 1,
			next = current + 1 > len - 1 ? 0 : current + 1;
		//重置上下张z-index
		slideBox.css('z-index', -1);
		slideBox.eq(current).css('z-index', 0);
		slideBox.eq(prev).css('z-index', 1);
		slideBox.eq(next).css('z-index', 1);
		trY(slideBox.eq(prev), -h);
		trY(slideBox.eq(next), h);
		flag = true;
	}

	function slide(y) {
		var h = ops.h;
		if (flag) { //首次滑动时设定状态
			dir = y > 0 ? -1 : 1;
			current = current + dir;
			current = current < 0 ? len - 1 : current;
			current = current > len - 1 ? 0 : current;
			flag = false;

            slideBox.removeClass('active');
			slideBox.eq(current).addClass('active');
		
		    trY(slideBox.eq(current), (h - Math.abs(y)) * dir, 0.2);
		}
	}

	function trY(el, y, t) {
		var t = t || 0;
		el.css({
			'-webkit-transform': 'translateY(' + y + 'px)',
			'-webkit-transition': t + 's'
		});
	}
	function trsEnd() {
        var cur = slideBox.eq(current);
        slideBox.removeClass('current');
        cur.addClass('current');
        trY(cur, 0, 0.3);
        if (current == len - 1) {
            down.hide();
        } else {
            down.show();
        }
    }

    function isPointerEventType(e, type) {
		return (e.type == 'pointer' + type || e.type.toLowerCase() == 'mspointer' + type)
	}

	function isPrimaryTouch(event) {
		return (event.pointerType == 'touch' || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary
	}
	init();
	slideBox.show();
})(Zepto);
