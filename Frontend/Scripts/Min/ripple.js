var ripple=$("<div class='ripple'></div>");ripple.dissolve=function(){ripple.css({transform:"scale(0)",opacity:0})},$(document).ready(function(){$(".link--card>.card, .link--card>.card--small, button").bind({mousedown:function(i){$(this).prepend(ripple);var e=this.getBoundingClientRect(),l=e.width/5*1.4,p={x:i.clientX-e.left,y:i.clientY-e.top-$("main").scrollTop()};ripple.css({top:p.y+"px",left:p.x+"px",transform:"scale("+l+")",opacity:1})},mouseup:function(){ripple.dissolve()},mouseleave:function(){ripple.dissolve()}})});