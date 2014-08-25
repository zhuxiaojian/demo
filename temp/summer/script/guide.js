/* 
 * @Author: luoyuting
 * @Date:   2014-08-22 09:40:07
 * @Last Modified by:   luoyuting
 * @Last Modified time: 2014-08-22 15:37:36
 */
(function(b) {
	b.fn.SNSummer = function(o) {
		function Slide(o) {
			b.extend({}, b.fn.slide.defaults, o);
			this.options = b.fn.slide.defaults;
			this.init();
		}
		Slide.prototype = {
			constructor: Slide,
			init: function() {
               this.slide();
			},
			slide: function() {
				var t = this,
					o = t.options,
					isPointerType = false,
					b(document).on('touchstart  pointerdown', function(e) {
						if ((isPointerType = t.isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) return;
						o.touchType = isPointerType ? e : e.touches[0];
						o.startY = parseInt(touchType.clientY);
						reset();
					}).on('touchmove  pointermove', function(e) {
						if ((isPointerType = t.isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) return
						o.touchType = isPointerType ? e : e.touches[0];
						var y = parseInt(o.touchType.clientY) - o.startY;
						var direction = y > 0 ? 'down' : 'up';
						(Math.abs(y) < 80) && return false;
						t.slide(y);
					}).on('touchend MSPointerUp pointerup  pointercancel', function(e) {
						o.y = 0;
						t.trsEnd();
					});
			},
			isPointerEventType: function() {
				return (e.type == 'pointer' + type || e.type.toLowerCase() == 'mspointer' + type)
			},
			isPrimaryTouch: function() {
				return (event.pointerType == 'touch' || event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
			},
			reset: function() {
				var t = this,
				    o = this.options,
				    curEl = o.curEl,
				    box = o.box;
				box.eq(curEl).css('z-index', 0);
				var prev = curEl - 1 < 0 ? o.len - 1 : curEl - 1,
					next = curEl + 1 > o.len - 1 ? 0 : curEl + 1;
				//重置上下张z-index
				o.box.css('z-index', -1)
				 .eq(current).css('z-index', 0)
				 .eq(prev).css('z-index', 1)
				 .eq(next).css('z-index', 1);
				t.trsY(box.eq(prev), -h);
				t.trsY(box.eq(next), h);
				flag = true;
			},
			slide: function(y) {
				var o = this.options;
				var box = o.box;
				if (o.flag) { //首次滑动时设定状态
					dir = y > 0 ? -1 : 1;
					current = current + dir;
					current = current < 0 ? len - 1 : current;
					current = current > len - 1 ? 0 : current;
					o.flag = false;
				}
				t.trsY(box.eq(current), (h - Math.abs(y)) * dir, 0.2);
			},
			trsY: function(el, y, t){
		        el.css({
			       '-webkit-transform': 'translateY(' + y + 'px)',
			       '-webkit-transition': t + 's'
		        });
			},
			trsEnd: function(){
				var $cur = $item.eq(current);
				$item.removeClass('current');
				$cur.addClass('current');
				trsY($cur, 0, 0.3);
				if (current == len - 1) {
					$tip.hide();
				} else {
					$tip.show();
				}
			}
		}
		b.fn.slide.defaults = {
			startY: 0,
			touchType: false,
            winH: b(window).height(),
            curEl: b('.slide-wrap .current').index,
            box: b('.slide-wrap .page-slide'),
            len:  b('.slide-wrap .page-slide').length,
            flag: false
		}
	}
})(Zepto)