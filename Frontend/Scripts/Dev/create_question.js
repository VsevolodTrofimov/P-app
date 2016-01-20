var tasks = 1;

var task_template = "<div class='test__task'><div class='task__number'></div><div class='card task__content'><div class='task__question'><div class='block--empty'>Добавьте сюда вопрос</div></div><div class='task__answer'><div class='block--empty'>Добавьте сюда поле ответа</div></div></div></div>";

function create_task(el_type, el_class, el) {
	var new_task = $(task_template);
	new_task.find(".task__number").text(tasks + ".");
	add_boundary.new_task(new_task.find(".task__number"));
	console.log(el_class, el_type);
	new_task.find(".block--empty").each(function(index, el) {
		add_boundary.block_empty($(this));
	});
	if(el) {
		new_task.find(".task__" + el_type).html($(el));
	} else {
		var new_el = generate[el_class]();
		if (new_el){
			new_task.find(".task__" + el_type).html(new_el);
		}
	}
	$(".test__preview").append(new_task);
	editor.verify_type();
	editor.check_for_emptiness();
	tasks++;
	check_bg_height();
}

function append_test_item(el, el_class, el_type) {
	var new_item = generate[el_class]();

	el.after(new_item);
	add_boundary.draggable(new_item);
	add_boundary[el_type](new_item);
	
	// console.log($(new_item));
	
	editor.verify_type();
	check_bg_height();
}