context_menu = {
	show: function(el, options, checked) {
		if(context_menu.is_shown){
			context_menu.hide();
		}
		c_rect = el.getBoundingClientRect();

		if(checked){
			context_menu.build_select(el, options, checked);
		} else {
			context_menu.build(options);
		}
		$("#context-menu").css({
			"top": c_rect.top + "px",
			"left": c_rect.left + "px",
			"width": c_rect.width + "px",
			"opacity": 1
		});
	},

	hide: function() {
		$("#context-menu").css('opacity', '0');
		setTimeout(function(){
			$("#context-menu").css('top', '-100%');
		},300);
	},

	build: function(options) {
		$("#context-menu").html("");
		options.forEach(function(option) {
			$("#context-menu").append("<div class='context-menu__option' onclick='" + option.func + "()'>" + option.text + "</div>");
		});
	},
	build_select: function(el, options, checked) {
		$("#context-menu").html("");
		$("#context-menu").append("<div class='context-menu__option default' onclick='" + checked.value + "()'>" + checked.text + "</div>")
		options.forEach(function(option){
			$("#context-menu").append("<div class='context-menu__option' value='" + option.value + "'>" + option.text + "</div>");
		});
		$(".context-menu__option").click(function(event) {
			context_menu.hide();
			$(el).children('.value').val($(this).attr('value'));

			$(el).children('.display').text($(this).text());
		});
	},

}

function add_menu_caller(select) {
	$(select).click(function(e) {
		var options = [];
		var checked = {};
		var current_value = $(this).children('.value').val();
		$(this).children('option').each(function(index, el) {
			if($(this).attr("value") != current_value){
				options.push({
					text : $(this).text(),
					value: $(this).attr("value")
				})
			} else {
				checked = {
					text : $(this).text(),
					value: $(this).attr("value")
				}
			}
		});
		context_menu.show(this, options, checked);
	});
}

$(document).ready(function() {
	$(".select").each(function(index, el) {
		add_menu_caller(this);
	});
});