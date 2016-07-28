var editor = (function() {
	var check_for_emptiness = function()  {
		var material_content = $(document).find(".preview>.__content>.card");
		if(material_content.children().length == 0) {
			var $starter_element = $('<div class="--empty">Добавьте сюда что-нибудь</div>');
			
			pull_put.put_zone.add($starter_element, function(e, $element, $pulled) {
				$element.replaceWith($pulled);
				indicator.hide(1);
				editor.check_self();
				pull_put.reset();
			});

			indicator.add($starter_element, 'add', 1);
			material_content.append($starter_element);
		}
	}

	var check_pullers = function() {
		$(".preview .__content>.card").children().each(function(index, el) {
			if(
				(
					   ! $(this).hasClass('--pullable')
					|| ! $(this).hasClass('--put-zone')
				) && ! $(this).hasClass('--empty')
			) {
				generate.let_editing($(this));
			}
		});
	}

	var exports = {
		check_self: function() {
			check_for_emptiness();
			check_pullers();
		} 
	}
	return exports;
})();

$("body").on("click", ".--button-delete, .pull_put_ui .__actions button", function() {
	editor.check_self();
});

$("body").on('click', '.pull_put_ui __actions>div>button', function() {
	console.log('hide');
	indicator.hide(1);
});
$(document).ready(function() {
	editor.check_self();
});