var file_catcher = {}

file_catcher.add = function($file_input) {

	$file_input = $($file_input).first();

	$input_button = $file_input.find(".__choose");
	$input_text = $file_input.find(".__text");
	$input_value = $file_input.find(".__value");

	var container = {
		button: $input_button,
		value: $input_value,
		text: $input_text
	};

	$input_button.click(function(event) {
		$input_value.click();
	});

	$input_value.change(function(event) {
		container.files = event.target.files;
		$input_text.text($input_value.val().replace( "C:\\fakepath\\", '' ));
	});

	return container;
}