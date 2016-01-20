var firefox = navigator.userAgent.indexOf("Firefox") != -1;
var ripple = $("<div class='ripple'></div>");

ripple.dissolve = function (){
	ripple.css({
		"opacity": 0,
	});
	
	setTimeout(function(){
		ripple.css({
			"transform": "scale(0)",
		});
		ripple.hide();
		ripple.attr("class", "ripple");
	}, 150);
}

ripple.force_show = function(e, el, special_class) {
	// console.log(el);
	ripple.show();
	$(el).prepend(ripple);
	var c_rect = el.getBoundingClientRect();
	var scale = (c_rect.width/5)*2.14;
	// console.log(el.getBoundingClientRect(), e);
	var pos = {
		x: e.clientX - c_rect.left,
		y: e.clientY - c_rect.top,
	}
	ripple.addClass(special_class);
	// console.log(pos);
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
			console.log("md");
			ripple.show();
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
			console.log("mu/click");
			ripple.dissolve();
		},
		mouseleave: function() {
			ripple.dissolve();
		},
	});
});
//one more ff fix
$("a, button").mouseup(function(e) {
	console.log("reclick", this);
	if(firefox){
		this.click();
	}
});