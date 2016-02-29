var icon_done = "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M0 0h24v24H0z' fill='none'></path><path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'></path></svg>";

function homework_verify(){
	//...ajax
	$(".homework .card").each(function(index, el) {
		var total = $(this).children(".card-homework__task").length;
		var done = $(this).children(".done").length;
		if(total == done && $(this).children(".icons--positive").css("opacity") != 1) {
			console.log("added");
			$(this).children(".icons--positive").css("opacity", "1");
		} else if(total > done && $(this).children(".icons--positive").css("opacity") == 1) {
			$(this).children(".icons--positive").css("opacity", "0");
		}
	});
}

function set_traditional_listners(){
	$(".card-homework__task.traditional>input").change(function() {
		$(this).parent().toggleClass("done");
		console.log("a change");
		homework_verify();
	});
}

$(document).ready(function() {
	homework_verify();
	setInterval(function(){
		homework_verify();
	}, 1000);
	$("homework .card>.icons--positive").css("opacity", "0");
	set_traditional_listners();
});
