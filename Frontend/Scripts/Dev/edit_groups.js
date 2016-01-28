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
	$(".group").css('background', '');
	counter=0;
	check_for_emptiness();
}

function check_for_emptiness() {
	$(".group").each(function(index, el) {
		console.log($(this).children().length, $(this).children());
		if($(this).children().length == 1){
			$(this).append("<div class='empty'>Пустая группа</div>");
		} else {
			$(this).children('.empty').remove();
		}
	});
}

var button_remove = '<button class="button--icon button_remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16 9.913 5 16 5zm-3.78 5.78l-1.44 1.44L14.564 16l-3.782 3.78 1.44 1.44L16 17.437l3.78 3.78 1.44-1.437L17.437 16l3.78-3.78-1.437-1.44L16 14.564l-3.78-3.782z"/></svg></button>';

function toggle_edit(){
	if(editing){
		$("h3").css('border-bottom', '1px dashed transparent').attr("contenteditable", "false");
		$(".button_remove").remove();
		$(".students .link--card").attr("draggable", "false");
		//enabling links
		$(".students .link--card").each(function(index, el) {
			$(this).replaceTag("<a>", true);
		});
		editing = false;
	} else {
		$("h3").css('border-bottom', '1px dashed #2196F3').attr("contenteditable", "true");
		$(".students .link--card").attr("draggable", "true");
		//disabling links
		$(".students .link--card,.teachers .link--card").each(function(index, el) {
			$(this).replaceTag("<div>", true);
		});

		$(".students .link--card").bind({
			dragstart: function(e){
				e.originalEvent.dataTransfer.setData('useless', 'stupid firefox');
				e_data.original_el = $(this);
			},
			dragend: function(e){
				drag_reset();
			}
		});
		editing = true;
		
		$(".card-person").prepend(button_remove);
		$(".button_remove").click(function(event) {
			$(this).parent().parent().remove();
			check_for_emptiness();
		});

	}
}

$(document).ready(function() {
	$("h3").css('border-bottom', '1px dashed transparent');
	$("#edit").click(function(event) {
		toggle_edit();
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

	


	$(".group").on({
		dragover: function(e) {
			drag_over(e);
		},
		dragenter: function(e) {
			if(counter==0) {
				$(this).css('background', 'black');
			}
			counter++;
		},
		dragleave: function(e) {
			counter--;
			if(counter==0) {
				$(this).css('background', '');
			}
		},
		drop: function(e) {
			$(this).append(e_data.original_el);
		}
	});
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