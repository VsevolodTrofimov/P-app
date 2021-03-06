generate.register.edit = function(type, subtype, edit_data) {
  if (!(type && subtype)) return false;

  var data = this.bind_data(type, subtype, 'edit', edit_data);

  data.edit.make_template = function(args) {
    return generate.make_template.edit[type](subtype, args);
  }

  //make API constant
  data.edit.build = function(value) {
    editor.active_element.item_id = value.item_id;
    var $edit = $("<div class='m--edit-wrapper'></div>");
    $edit.append(data.edit.builder(value));

    if(type === 'answer') {
      var $worth = render.inputs.text('Макс. балл', 'worth', (value.worth || 1));
      $edit.append($worth);

      if(data.edit.random_possible) {
        var $random = $(loads["Elements/Inputs/checkbox/exports.html"]);
        $random.find('label').text('Случайный порядок');
        $random.find('input').attr('name', "random");
        $random.find('input')[0].checked = value.random;
        $edit.append($random);
      }

      if(data.edit.split_score_possible) {
        var $split_score = $(loads["Elements/Inputs/checkbox/exports.html"]);
        $split_score.find('label')
          .text('Баллы пропорционально соответствию верному ответу');
        $split_score.attr('tip', 'При неполном соответствии вернуму ответу'
          + 'ученику будет выставлена часть максимального балла, '
          + 'пропорционально соответствию. Округляется вниз.');

        $split_score.find('input').attr('name', "split_score");
        $split_score.find('input')[0].checked = value.split_score;
        $edit.append($split_score);
      }
    }

    return $edit;
  }
  data.edit.parse = function($edit) {
    var value = data.edit.parser($edit.find('.generate-edit'));
    value.item_id = editor.active_element.item_id;

    if(type === 'answer') {
      value.worth = $edit.find('[name="worth"]').val();
    }

    if(data.edit.random_possible) {
      value.random = $edit.find('[name="random"]')[0].checked;
    }

    if(data.edit.split_score_possible) {
      value.split_score = $edit.find('[name="split_score"]')[0].checked;
    }

    if(data.element.never_check) {
      value.never_check = true;
    }

    value.type = type;
    value.subtype = subtype;

    return value;
  }

  return true;
}
