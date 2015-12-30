var questions = 0;

var question_template = "<div class='test__task'><div class='task__number'></div><div class='card task__content'><div class='task__question'><div class='block--empty'>Добавьте сюда вопрос</div></div><div class='task__answer'><div class='block--empty'>Добавьте сюда поле ответа</div></div></div></div>";

function create_question(el_type, el_class, el) {
	questions++;
	var new_question = $(question_template);

	new_question.find(".task__number").text(questions + ".");
	console.log(el_class, el_type);
	new_question.find(".block--empty").each(function(index, el) {
		add_boundary.block_empty($(this));
	});
	if(el) {
		new_question.find(".task__" + el_type).html($(el));
	} else {
		new_question.find(".task__" + el_type).html(generate[el_class](1));

		new_question.find(".task__" + el_type).children().each(function() {
			add_boundary.draggable($(this));
			add_boundary[el_type]($(this));
		});
	}
	$(".test__preview").append(new_question);
	editor.verify_type();
	editor.check_for_emptiness();
}

function append_test_item(container, el_class, el_type) {
	var new_item = generate[el_class]();
	container.append(new_item);
	add_boundary.draggable(new_item);
	add_boundary[el_type](new_item);
	editor.verify_type();
}