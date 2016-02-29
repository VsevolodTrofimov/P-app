var editing = false;
var e_data = {};
var counter = 0;
function drag_over(e) {
	// console.log("over");
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
		e.stopPropagation();
	}
	return false;
}

function drag_reset(){
	tooltip.hide();
	counter=0;
	check_for_emptiness();
}

function check_for_emptiness() {
	$(".group").each(function(index, el) {
		console.log($(this).children(".link--card").length, $(this).children("h3").text());
		
		if($(this).children(".link--card").length == 0){
			if($(this).children(".empty").length == 0){
				$(this).append("<div class='empty'>Пустая группа</div>");
			}
		} else {
			$(this).children('.empty').remove();
		}
	});
}


var add_boundary = {
	group: function(el){
		el.bind({
			dragover: function(e) {
				drag_over(e);
			},
			dragenter: function(e) {

				if(e_data.last_el != this){
					drag_reset();
				}
				if(counter==0) {
					tooltip.show(this, "Переместить ученика");
				}
				counter++;
				e_data.last_el = this;
			},
			dragleave: function(e) {
				counter--;
				if(counter==0) {
					tooltip.hide();
				}
			},
			drop: function(e) {
				$(this).append(e_data.original_el);
			}
		});
	},
	button_remove: function(el){
		el.click(function(event) {
			if($(this).parent(".card").length){
				$(this).parent(".card").parent().remove();
			} else {
				unordered.append($(this).parent(".group").children('.link--card'));
				$(this).parent(".group").remove();
			}
			check_for_emptiness();
		});
	}
}

var button_remove = '<button class="button--icon button_remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16 9.913 5 16 5zm-3.78 5.78l-1.44 1.44L14.564 16l-3.782 3.78 1.44 1.44L16 17.437l3.78 3.78 1.44-1.437L17.437 16l3.78-3.78-1.437-1.44L16 14.564l-3.78-3.782z"/></svg></button>';

var unordered = $("<div class='group'><h3>Нераспределенные</h3></div>");

var icon_add = "<div class='icon_add--wrapper'><svg  viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg></div>";

function toggle_edit(){
	if(editing){
		$("h3").css('border-bottom', '1px dashed transparent').attr("contenteditable", "false");
		$(".button_remove").remove();
		$(".students .link--card").attr("draggable", "false");
		//enabling links
		$(".students .link--card").each(function(index, el) {
			$(this).attr('style', '');
			$(this).replaceTag("<a>", true);
		});
		$("#create_group").hide();

		editing = false;
	} else {
		$("h3").css('border-bottom', '1px dashed #2196F3').attr("contenteditable", "true");
		$(".students .link--card").attr("draggable", "true");
		//disabling links
		$(".students .link--card,.teachers .link--card").each(function(index, el) {
			$(this).css('cursor', 'move');
			$(this).replaceTag("<div>", true);
		});

		$(".students .link--card").bind({
			dragstart: function(e){
				e.originalEvent.dataTransfer.setData('useless', 'stupid firefox');
				e_data.original_el = $(this);
				e_data.original_group = $(this).parent().parent();
			},
			dragend: function(e){
				drag_reset();
			}
		});
		
		$(".card-person").prepend(button_remove);
		$(".group").prepend(button_remove);


		unordered.children('.button_remove').remove();
		unordered.children("h3").css('border-bottom', '1px dashed transparent').attr("contenteditable", "false");

		add_boundary.button_remove($(".button_remove"));
		$("#create_group").show();

		editing = true;
	}
}

$(document).ready(function() {
	$(".students").append(unordered);
	add_boundary.group(unordered);
	check_for_emptiness();


	$("h3").css('border-bottom', '1px dashed transparent');
	$(".students .link--card").attr("draggable", "false");

	$(".group").each(function(index, el) {
		if($(this).children('h3').text() == "Нераспределенные"){
			unordered.html($(this).html());
			$(this).replaceWith(unordered);
		}
	});

	$("#edit").click(function(event) {
		toggle_edit();
	});

	$("#create_group").click(function(event) {
		var new_group = $("<div class='group'><h3>Новая группа</h3></div>");
		$(".students").append(new_group);
		new_group.prepend(button_remove);
		add_boundary.group(new_group);

		add_boundary.button_remove(new_group.find(".button_remove"));

		check_for_emptiness();
		$("h3").css('border-bottom', '1px dashed #2196F3').attr("contenteditable", "true");
	});
	



	$("#invite_teacher").click(function(event) {
		popup.show("<input type='email' id='email'><label for='email' required>Email</label><br><br><button id='invite_teacher_button'>Пригласить</button>",
		{"width":"20rem"},
		function(){
			add_menu_caller($("#popup .select").get(0));
			$("#popup input")[0].focus();
			$("#invite_teacher_button").click(function(event) {
				var formData = new FormData();
				formData.append('email', $("#email").val());
				formData.append('course', "{{course.title_lat}}");
				formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
				$.ajax({
					type:"POST",
					url:"/func/add_teacher/",
					data: formData,
					processData: false,
					contentType: false,
					success: function(){
						notification.change('success','Преподаватель приглашен','Ждем от него подтвкерждения' );
					}
			});
			});
		});
	});
	$("#invite_students").click(function(event) {
		popup.show("<input type='email' class='student__email'>" +
			"<label for='email'>Email</label><br>" +
			"<button class='button--icon' id='add_student'><svg  viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'/><path d='M0 0h24v24H0z' fill='none'/></svg></button>" +
			"<div class='select'><div class='display'>Нераспределенные</div>" +
			"<svg class='{{ class }}' id='{{id}}' viewBox='0 0 24 24'  xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>" +
			"<input type='hidden' name='subject' class='value'>" +
			"<option value='unordered'>Нераспределенные</option>" +
			"<option value='10I'>10И</option>" +
			"<option value='10D'>10Б</option></div>" +
			"<br><br><br><button id='invite_students_button'>Пригласить</button>",
		{"width":"20rem"},
		function(){
			add_menu_caller($("#popup .select").get(0));
			$("#popup input")[0].focus();
			$("#add_student").click(function(e){
				$("#popup .student__email+label").last().after("<input type='email' class='student__email'><label for='email'>Email</label>");
				add_emptiness_checker($("#popup .student__email").last()[0]);
			});
			$("#invite_students_button").click(function(e) {
				var formData = new FormData();
				var email_list=[];
				$("#popup .student__email").each(function(index, el) {
					email_list.push($(this).val());
				});
				console.log(email_list.join(","), email_list);
				formData.append('email_list', email_list.join(","));
				formData.append('course', "{{course.title_lat}}");
				formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
				$.ajax({
					type:"POST",
					url:"/func/add_teacher/",
					data: formData,
					processData: false,
					contentType: false,
					success: function(){
						notification.change('success','Преподаватель приглашен','Ждем от него подтвкерждения' );
					}
			});
			});
		});
	});
	add_boundary.group($(".group"));
});

$.extend({
	replaceTag: function (currentElem, newTagObj, keepProps) {
		var $currentElem = $(currentElem);
		var i, $newTag = $(newTagObj).clone();
		if (keepProps) {//{{{
			var nodes=[], values=[];
			newTag = $newTag[0];
			for (var att, i = 0, atts = currentElem.attributes, n = atts.length; i < n; i++){
				att = atts[i];
				newTag.setAttribute(att.nodeName, att.nodeValue);
			}
			$.extend(newTag.classList, currentElem.classList);
			$.extend(newTag.attributes, currentElem.attributes);
		}//}}}
		$currentElem.wrapAll($newTag);
		$currentElem.contents().unwrap();
		// return node; (Error spotted by Frank van Luijn)
		return this; // Suggested by ColeLawrence
	}
});

$.fn.extend({
	replaceTag: function (newTagObj, keepProps) {
		// "return" suggested by ColeLawrence
		return this.each(function() {
			jQuery.replaceTag(this, newTagObj, keepProps);
		});
	}
});