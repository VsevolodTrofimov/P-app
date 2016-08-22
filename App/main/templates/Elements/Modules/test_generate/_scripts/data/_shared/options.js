generate.data.shared.options = {
	element: {
		parse: function($original, type) {
			var $items = $original.find(".m--" + type);
			var values = [];
			$items.each(function(index, el) {
				values.push($(this).children("label").text());
			});

			// getting answer
			var answer_attr = $original.attr('answer');
			if(answer_attr) {
				answer = JSON.parse(answer_attr);
			} else {
				answer = [];
			}


			return {
				values: values,
				answer: answer,
				class: "answer--" + type,
				type: "answer"
			}
		},
		fill: function($element, checked) {
			$element.find("input").each(function(index, el) {
				for(var i=0;i<checked.length;i++) {
					checked[i] = parseInt(checked[i]);
				}

				if(checked.indexOf(index) > -1) {
					this.checked = true;	
				} else {
					this.checked = false;	
				}
			});
		},

		getter: function($element, _action) {
			function upload() {
				var values = [];
				var data = [];
				var is_big = false;
				$element.find("input").each(function(index, el) {
					if(this.checked) {
						data.push(index);
						var text = $(this).siblings('label').text();
						// console.log(text);
						if(text.length > 20) {
							is_big = true;
							text = text.substring(0, 18) + '&hellip;';
						}
						values.push(text);
					}
				});

				if(is_big) {
					values = values.join('<br>');
				} else {
					values = values.join(', ');
				}

				// console.log(values);

				_action(values, JSON.stringify(data));
			}

			$element.change(function(event) {
				upload();
			});
			upload();
		},
	},
	edit: {
		parse : function(type) {

			var $items = $(".options-edit").find(".m--"+type);
			var answer = [];
			var values = [];

			$items.each(function(index, el) {
				var label = $(this).siblings().find(".__value").val();

				values.push(label);
				
				if($(this).find("input").is(":checked")) {
					answer.push(index);
				}
			});
			
			return {
				values: values,
				answer: answer
			}
		},
		middleware: function(type) {
			var middleware_text = {
				radio : '{% include "Elements/Modules/test_generate/__edit_texts/__answer/__radio/__item/exports.html" %}',
				checkbox : '{% include "Elements/Modules/test_generate/__edit_texts/__answer/__checkbox/__item/exports.html" %}'
			}
			var empty_item = middleware_text[type];

			generate.data.shared.add_item = function() {
				var $new_item = $(empty_item);
				
				$(".options-edit .__items").append($new_item);
				button_delete.add($new_item);
			}

			$(".options-edit .__add").click(function(event) {
				generate.data.shared.add_item();
			});
		},
		fill: function(value) {
			console.log(value.answer, typeof value.answer)

			var counter = 0;
			value.values.forEach(function(label) {
				generate.data.shared.add_item();
				$(".options-edit .__items").children().last()
					.find(".__value").val(label);

				
				var checker = function() {return false};

				if(typeof value.answer === "string") {
					checker = function(answer, item) {
						return counter === parseInt(answer);
					}
				} else if(typeof value.answer === "object") {
					for(var i=0;i<value.answer.length;i++) {
						value.answer[i] = parseInt(value.answer[i]);
					}
					checker = function(answer, item) {
						return (answer.indexOf(counter) > -1);
					}
				}

				if( checker(value.answer, label) ) {
					// console.log("ok")
					$(".options-edit .__items").find("label input")
						.last().prop("checked", true);
				}
				counter++;
			});
		}
	}
}