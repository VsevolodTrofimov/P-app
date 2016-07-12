if( ! used_links) {
	var used_links = []
}

var as_g = {}
	as_g.current_type = ""
	as_g.original = $()

	as_g.card_template = function(el) { 
		return '<div class="card --small" href="'+el.link+'">'+el.title+'</div>'
	}
	
	as_g.material_list = {{course.materials|safe}}
	as_g.test_list = {{course.tests|safe}}

	as_g.show_list = function(content_type, original) {
		var dict = as_g[content_type+"_list"];
		as_g.current_type = content_type;
		as_g.original = original;

		panel.show();
		panel.content.html("");
		$.each(dict,function(section,value) {
			
			var $new_section = $("<section><h3>"+section+"</h3></section>")

			panel.content.append($new_section);
			accordion.add($new_section, "h3");
			
			value.forEach(function(el) {
				if(used_links.indexOf(el.link) == -1) {
					$new_section.append(as_g.card_template(el));
				}
			});
		});

		if(original) {
			as_g.delete.show();
		} else {
			as_g.delete.hide();
		}
	}

	as_g.hide_list = function(content_type) {
		panel.hide();
	}

	$(document).ready(function() {
		//var pickerDefault = new Pikaday(
	  //  {
	  //      field: document.getElementById('due_date'),
	  //  });
		

		$("#assignment--new__add_test").click(function(event) {
			as_g.show_list("test");
		});
		$("#assignment--new__add_material").click(function(event) {
			as_g.show_list("material");
		});

		$("#assignment--new__materials").on("click", ".card.--small", function(event) {
				as_g.show_list("material", $(this))
		});

		$("#assignment--new__tests").on("click", ".card.--small", function(event) {
				as_g.show_list("test", $(this))
		});
		setTimeout(function() {
			as_g.cancel = $("#cancel")
			as_g.delete = $("#delete")
		}, 100)
	});
	$("#assignment--new__add_traditional").click(function(event) {
		popup.show('{% include "Pages/Course/give_task/_popup_texts/add_traditional/exports.html" %}');
		$("#add_el").click(function(event) {
			// console.log(el_data)
			popup.hide()
			$("#assignment--new__add_traditional").before(as_g.card_template(
					{"title": $("#new_el_value").html()}
				))
		})
		$("#popup__close").click(function(event) {
			popup.hide()
		})
	});
	$("#assignment--new__traditional").on("click", ".card.--small", function(event) {
		as_g.original = $(this)
		popup.show('{% include "Pages/Course/give_task/_popup_texts/add_traditional/exports.html" %}');
		$("#new_el_value").html(as_g.original.html()).focus();
		popup.$.find(".row").append('<button id="delete_el" class="button --ghost --negative">Удалить</button>')
		$("#add_el").click(function(event) {
			// console.log(el_data)
			popup.hide()
			as_g.original.replaceWith(as_g.card_template(
					{"title": $("#new_el_value").html()}
				))
		})
		$("#delete_el").click(function(event) {
			popup.hide();
			$("#delete").click();
		});
		});

	$("#give_task").click(function(e) {
		var res_material_list=[];
		var res_test_list=[];
		var traditionals_list=[];
		var task={};
		var due_date="";
		$("#assignment--new__materials .card.--small").each(function(index, el) {
			task.link=$(this).attr('href');
			task.title=$(this).html();
			res_material_list.push(task);
			task={};
		});
		$("#assignment--new__tests .card.--small").each(function(index, el) {
			task.link=$(this).attr('href');
			task.title=$(this).html();
			task.done=false;
			res_test_list.push(task);
			task={};
		});
		$("#assignment--new__traditional .card.--small").each(function(index, el) {
			task.done=false
			task.text=$(this).html()
			traditionals_list.push(task);
			task={};
		});

		due_date=$("#due_date").val();
		// console.log("test",res_test_list);
		// console.log("mat",res_material_list);
		// console.log("trad",traditionals_list);
		// console.log("due_date",due_date);

		var group_list = []

		$('[name="group_choose"]').each(function(index, el) {
			if( $(this).is(":checked") ) {
				group_list.push($(this).val());
			}		
		});

        $.ajax({
            type:"POST",
            url:"/func/create_assignment/",
            data: {
                   'csrfmiddlewaretoken': '{{ csrf_token }}',
                   'material_list': JSON.stringify(res_material_list),
                   'test_list': JSON.stringify(res_test_list),
                   'traditionals_list': JSON.stringify(traditionals_list),
                   'group_list': JSON.stringify(group_list),
                   'due_date': due_date,
                   'course_id': '{{ course.object.id }}'
                  },
            success: function() {
                  notification.show('success','Задание создано' );
                               }
            });
    });
