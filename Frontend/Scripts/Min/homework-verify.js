function homework_verify(){$(".card-homework").each(function(e,o){var n=$(this).children(".card-homework__task").length,r=$(this).children(".done").length;n==r&&$(this).addClass("done")})}$(document).ready(function(){homework_verify(),setInterval(function(){homework_verify()},1e3)});