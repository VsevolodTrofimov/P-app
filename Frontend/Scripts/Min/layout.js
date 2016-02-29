"use strict";
function build_header(){
	var breadcrumbs_w = $(".header__breadcrumbs").innerWidth();
	var user_w = $(".header__user").innerWidth();
	// console.log(user_w,breadcrumbs_w);
	if(breadcrumbs_w>user_w){
		$(".header__user").css('min-width', breadcrumbs_w+10+"px");
		$(".header__breadcrumbs").css('min-width', breadcrumbs_w+10+"px");
		user_w=breadcrumbs_w;
	} else {
		$(".header__breadcrumbs").css('min-width', user_w+10+"px");
		$(".header__user").css('min-width', user_w+10+"px");
		breadcrumbs_w=user_w;
	}
	// console.log(user_w,breadcrumbs_w);
	$(".header__search").css("width","100%");
}

function add_emptiness_checker(input){
	// console.log(input, "_");
	if($(input).val() == "") {
		$(input).addClass("empty");
	}
	$(input).blur(function(){
		if($(this).val() == "") {
			$(this).addClass("empty");
		} else {
			$(this).removeClass("empty");
		}
	});
	$(input).focus(function(event) {
		$(this).removeClass("empty");
	});
}

function make_processing(button) {

}
var processing = {
	spinner : "<svg class='free_spinner white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='spinner'><circle cx='50' cy='50' r='38' stroke='#4670dc' fill='none' stroke-width='6' stroke-linecap='round'><animate attributeName='stroke-dashoffset' dur='2s' repeatCount='indefinite' from='0' to='476.9'></animate><animate attributeName='stroke-dasharray' dur='2s' repeatCount='indefinite' values='143.07 95.38;1 237.5;143.07 95.38'></animate></circle></svg>",
	button : {
		html: {},
		style: undefined,
		start: function(button){
			processing.button.html = button.html();
			var style = button.attr('style');
			if(style){
				processing.button.style = style;
			}

			button
				.css({
					"width": button.outerWidth(),
					"height": button.outerHeight(),
					"padding": button.outerHeight() - 38
				})
				.html(processing.spinner);
			button.attr('disabled', 'true');
			console.log(processing, button.html());
		},
		stop: function(button){
			 button.html(processing.button.html);

			 button.removeAttr('disabled');
			 if(processing.button.style){
				 button.attr('style', processing.button.style);
			 } else {
			 	button.removeAttr('style');
			 }
			 processing.button.style = undefined;
		}
	}
}

$(document).ready(function() {
	build_header();
	$("input").each(function(index, el) {
		add_emptiness_checker(this);	
	});
	$("main").scroll(function(event) {
		tooltip.hide();
		context_menu.hide();
	});

	/*
	!!! How to use button process
	setTimeout(function(){
		processing.button.start($("#change-password"));
	},1000);
	setTimeout(function(){
		processing.button.stop($("#change-password"));
	},5000);*/
});

/*function fade(){
	$("h1,h2,h3,h4,h5,h6").css('animante', 'value');
}*/