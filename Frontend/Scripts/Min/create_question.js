function create_question(e,t,a){questions++;var d=$(question_template);d.find(".task__number").text(questions+"."),console.log(t,e),d.find(".block--empty").each(function(e,t){add_boundary.block_empty($(this))}),a?d.find(".task__"+e).html($(a)):(new_el=generate[t](1),new_el&&(d.find(".task__"+e).html(new_el),d.find(".task__"+e).children().each(function(){add_boundary.draggable($(this)),add_boundary[e]($(this))}))),$(".test__preview").append(d),editor.verify_type(),editor.check_for_emptiness()}function append_test_item(e,t,a){var d=generate[t]();e.append(d),add_boundary.draggable(d),add_boundary[a](d),editor.verify_type()}var questions=0,question_template="<div class='test__task'><div class='task__number'></div><div class='card task__content'><div class='task__question'><div class='block--empty'>Добавьте сюда вопрос</div></div><div class='task__answer'><div class='block--empty'>Добавьте сюда поле ответа</div></div></div></div>";