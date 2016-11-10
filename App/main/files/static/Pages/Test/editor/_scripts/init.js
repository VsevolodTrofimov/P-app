editor.check.empty_text = 'Добавьте сюда элемент вопроса';

editor.fill_item_list(
  $('.item-list.m--question'), 'question'
);

editor.fill_item_list(
  $('.item-list.m--answer'), 'answer'
);


test_manager.publish_popup = '{% include "Pages/Test/editor/_publish_popup/exports.html" %}'

var django = {
  course: {
    id: "{{course.id}}"
  },
  test: {
    id: "{{test.id}}"
  },
  material: {
    id: "{{material.id}}"
  },
  csrf_token: "{{ csrf_token }}",
  current_type: "{{type}}"
}
console.log("{{test.json}}");

if ("{{test.json}}".length > 0)
  django.loaded='{{test.json|safe}}'