test_manager.pack = function() {
	var test_json = {
		"title": $("h2").text(),
		tasks: []
	}
	$(".preview .__task .__content").each(function(index, el) {
		var task_index = index;

		test_json.tasks[task_index] = []

		$(this).children().each(function(index, $element) {
			var element_class = $(this)
				.attr('class').split(' ')[0];

			test_json.tasks[task_index].push(generate.read(element_class)
				.element.parse($(this)));
			$(this).find(".question--image").find("img").each(function(index, $element) {
				$.ajax({
					type:"POST",
					url:"/test/upload_by_url/",
					data: {
						'asset_url':$(this).attr('src'),
						'course_id':'{{course.id}}',
						'test_id':'{{test.id}}',
						'csrfmiddlewaretoken' : '{{ csrf_token }}'
						},
					success:function(response){
						test_json[task_index].question_items[index].url=response;
					}
				});
			});
		});

	});
	return JSON.stringify(test_json);
}