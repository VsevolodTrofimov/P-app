test_manager.load = function(test) {
  if(typeof test === 'string') {
    test = JSON.parse(test);
  }

  console.log('loaded', test);

  if(defined(editor)) {
    if( ! editor.test_data.title) {
      $('.preview h2').html(test.title);
      editor.test_data.title = test.title;
    }

    test.tasks.forEach(function(task) {
      editor.test_data.tasks.push(task);
    });

    test.templates.forEach(function(template) {
      editor.test_data.templates.push(template);
    });
  }

  test.tasks.forEach(function(task) {
    if(task.is_template) {
      var task_bundle = generate.data.task.template.build_finalized_task(task);

      $('.preview>.__content').append(task_bundle.$task);
    } else {
      var $new_task = editor.create_new_task();
      $('.preview>.__content').append($new_task);

      $new_task.find('.__group').val(task.group);
      task.content.forEach(function(element) {
        var $element = generate.data[element.type][element.subtype].element.build(element);
        $new_task.find('.__content').append($element);
      });
    }
  });

  editor.check.numbers();
  editor.check.empty();
}

$(document).ready(function() {
  if(defined(django.loaded)) {
    test_manager.load(django.loaded);
  }
});
