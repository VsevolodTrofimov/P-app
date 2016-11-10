{% if not attempt and not read %}
test_manager.unpublish = function() {
  var formData = new FormData();
  formData.append("course_id", "{{course.id}}");
  {% if type == 'test' %}
    formData.append("test_id", "{{test.id}}");
  {% else %}
    formData.append("material_id", "{{material.id}}");
  {% endif %}
  formData.append('csrfmiddlewaretoken', '{{csrf_token}}');
  $.ajax({
    type:"POST",
    url:"/{{type}}/unpublish/",
    data: formData,
    processData: false,
    contentType: false,
    success: function(response) {
      notification.show(response["type"], response["message"]);
    }
  });
  $("#{{type}}_publish").show();
  $("#{{type}}_unpublish").hide();
  test_manager.is_published = false;
}
{% endif %}