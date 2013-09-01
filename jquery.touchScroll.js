(function($) {
	$.fn.touchScroll = function(direction) {
		direction = direction ? direction : 'x';
		
		return this.each(function() {
		
			var self = $(this);
			self.startPosition = 0;
			self.currentPosition = 0;
			self.startPoint = null;
			self.currentPoint = null;
			
			self.on('touchstart', function(e) {
				self.removeClass('transition');
				self.startPoint = getTouchPoint(direction, e);
			});
			self.on('touchmove', function(e) {
				e.preventDefault();
				self.currentPoint = getTouchPoint(direction, e);
				self.currentPosition = self.startPosition + -(self.startPoint - self.currentPoint);
				self.css({
					'-webkit-transform': comvertParameter(direction, self.currentPosition)
				});
			});
			self.on('touchend', function() {
			
				self.startPosition = self.currentPosition;
				
				if (self.currentPosition > 0) {
					self.addClass('transition').css({
						'-webkit-transform': 'translate3d(0px, 0px, 0px)'
					});
					self.startPosition = 0;
				} else if(self.height() + self.currentPosition < $(window).height()) {
					var position = $(window).height() > self.height() ? 0 : $(window).height() - self.height();
					self.addClass('transition').css({
						'-webkit-transform': comvertParameter(direction, position)
					});
					self.startPosition = position;
				}
			});
			
			var getTouchPoint = function(direction, event) {
				if (direction === 'y') {
					return event.originalEvent.touches[0].pageY;
				} else {
					return event.originalEvent.touches[0].pageX;
				}
			}
			
			var comvertParameter = function(direction, parameter) {
				if (direction === 'y') {
					return 'translate3d(0px, ' + parameter + 'px, 0px)';
				} else {
					return 'translate3d(' + parameter + 'px, 0px, 0px)';
				}
			}
		});
	}
})(jQuery);