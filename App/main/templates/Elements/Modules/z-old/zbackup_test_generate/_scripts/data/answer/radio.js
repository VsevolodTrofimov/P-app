generate.data["answer--radio"] = {
  element: {
    type: 'answer',
    
    parse: function($original) {
      var result = generate.data.shared
                      .options.element.parse($original, "radio");

      result.worth = generate.data.shared.worth.element.parse($original);
      return result;
    },

    build: function(value) {
      $element = $(generate.build.template.answer('answer--radio'))
      
      value.values.forEach(function(label) {
        var $new_option = $('{% include "Elements/Inputs/radio/exports.html" %}');
        $new_option.children("label").text(label);
        $new_option.children("input").val(label);
        $new_option.children("input")
          .attr("name", "r_"+generate.counter.radio);
        $element.append($new_option);
      });

      generate.data.shared.worth.element.build($element, value.worth);
      generate.counter.radio++;

      return $element 
    },
    fill: function($element, checked) {
      generate.data.shared.options
        .element.fill($element, checked);
    },

    getter: function($element, _action) {
      generate.data.shared.options
        .element.getter($element, _action);
    },

    value_sample: {
      values: ["Вариант 1", "Вариант 2", "Вариант 3"]
    }
  },
  edit: {
    text:  '{% include "Elements/Modules/test_generate/__edit_texts/__answer/__radio/exports.html" %}',
    parse: function() {
      var result = generate.data.shared.options.edit.parse("radio");

      result.worth = generate.data.shared.worth.edit.parse();
      return result
    },
    middleware: function() {
      generate.data.shared.options.edit.middleware("radio");
      generate.data.shared.worth.edit.middleware();
    },
    fill: function(value) {
      generate.data.shared.options.edit.fill(value);
      generate.data.shared.worth.edit.fill(value.worth);
    }
  }
}