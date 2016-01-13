var ripple = $("<div class='ripple'></div>");

ripple.dissolve = function (){
	ripple.css({
		"transform": "scale(0)",
		"opacity": 0,
	});
	ripple.attr("class", "ripple");
}

ripple.force_show = function(e, el, special_class) {
	console.log(el);
	$(el).prepend(ripple);
	var c_rect = el.getBoundingClientRect();
	var scale = (c_rect.width/5)*2.14;
	console.log(el.getBoundingClientRect(), e);
	var pos = {
		x: e.clientX - c_rect.left,
		y: e.clientY - c_rect.top,
	}
	ripple.addClass(special_class);
	console.log(pos);
	ripple.css({
		"top": pos.y + "px",
		"left": pos.x + "px",
		"transform": "scale(" + scale + ")",
		"opacity": 1
	});
}

$(document).ready(function() {
	$(".link--card>.card, .link--card>.card--small, button").bind({
		mousedown: function(e) {
			$(this).prepend(ripple);
			var c_rect = this.getBoundingClientRect();
			var scale = (c_rect.width/5)*1.4;
			// console.log(this.getBoundingClientRect(), e, $("main").scrollTop());
			var pos = {
				x: e.clientX - c_rect.left,
				y: e.clientY - c_rect.top - $("main").scrollTop()
			}
			// console.log(pos);
			ripple.css({
				"top": pos.y + "px",
				"left": pos.x + "px",
				"transform": "scale(" + scale + ")",
				"opacity": 1
			});
		},

		mouseup: function() {
			ripple.dissolve();
		},
		mouseleave: function() {
			ripple.dissolve();
		},
	});
});