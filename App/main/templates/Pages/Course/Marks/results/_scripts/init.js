$(document).ready(function() {
{% if test_id %}
	results_controls.active_test = '{{test_id}}';
{% endif %}
});