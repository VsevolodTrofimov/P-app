editor.active_element = {
  is_new: undefined,
  position: {
    task: undefined,
    number: undefined
  },
  value: {},
  blueprints: {},
  type: undefined,
  subtype: undefined
}

pull_put.pre_actions.pull = function($pulled) {
  if( ! $pulled.attr('subtype')) {
    $pulled = $pulled.children();
  }

  var blueprints = generate.get_blueprints($pulled)
  editor.active_element.blueprints = blueprints;

  if($pulled.parents('.preview').length > 0) {
    editor.active_element.is_new = false;

    //TODO: calculate position
    var $task_parent = $pulled.parents('.__task');
    var position = {
      task: $('.preview .__task').index($task_parent[0]),
      number: $task_parent.find('.__content').children().index($pulled[0])
    }

    editor.active_element.position = position;

    editor.active_element.value = editor.test_data
      .tasks[position.task].content[position.number];
  } else {
    editor.active_element.is_new = true;
    editor.active_element.position.task = undefined;
    editor.active_element.position.number = undefined;
  }
}

pull_put.pre_actions.cancel = function() {
  editor.edit.let(pull_put.ui.proto_element);
}

pull_put.cancel_action = function() {
  editor.active_element.is_new = false;
  editor.active_element.position.task = undefined;
  editor.active_element.position.number = undefined;
  editor.active_element.value = {};
}
