function drag_over(e){return e.preventDefault&&(e.preventDefault(),e.stopPropagation()),!1}var counter=0,original_el=void 0,firefox=-1!=navigator.userAgent.indexOf("Firefox");console.log(navigator.userAgent);var editor={verify_type:function(){$("#move").is(":checked")?($(".task__answer__item, .task__question>*").attr("draggable","true"),$(".task__answer__item, .block--empty").removeAttr("draggable"),$("[contenteditable]").attr("contenteditable","false")):($(".test__preview [draggable]").removeAttr("draggable"),$("[contenteditable]").attr("contenteditable","true"),$(".task__answer__item *").css("cursor","pointer"))},check_for_emptiness:function(){$(".task__question").each(function(e,t){console.log($(this).children()),0==$(this).children().length&&($(this).append("<div class='block--empty'>Добавьте сюда вопрос</div>"),add_boundary.block_empty($(this).children(".block--empty")))}),$(".task__answer").each(function(e,t){0==$(this).children().length&&($(this).append("<div class='block--empty'>Добавьте сюда поле ответа</div>"),add_boundary.block_empty($(this).children(".block--empty")))})}},add_boundary={draggable:function(e){e.bind({dragover:function(e){drag_over(e)},dragstart:function(e){this.classList.add("moved")},dragend:function(e){counter=0,$(".drop--accept").removeClass("drop--accept"),document.getElementById("create").classList.remove("drop--accept"),$(".moved").removeClass("moved"),indicator.hide(),original_el=void 0}})},question:function(e){e.bind({dragenter:function(e){"question"==e.originalEvent.dataTransfer.getData("el_type")&&(0==counter&&(this.classList.add("drop--accept"),c_rect=this.getBoundingClientRect(),indicator.original_el=this,indicator.show(c_rect)),counter++)},dragleave:function(e){counter--,0>=counter&&(counter=0,this.classList.remove("drop--accept"),indicator.hide())},dragstart:function(e){e_data=e.originalEvent.dataTransfer,e_data.setData("el_type","question"),e_data.setData("el_class",$(this).attr("class").split(" ")[0]),original_el=this},drop:function(e,t){if(e.originalEvent)var a=e.originalEvent.dataTransfer;else var a=t.e.originalEvent.dataTransfer;"question"==a.getData("el_type")&&(original_el?($(this).parent().append($(original_el)),editor.check_for_emptiness()):append_test_item($(this).parent(),a.getData("el_class"),a.getData("el_type")))}})},answer:function(e){e.bind({dragenter:function(e){"answer"==e.originalEvent.dataTransfer.getData("el_type")&&(0==counter&&(this.classList.add("drop--accept"),c_rect=this.getBoundingClientRect(),indicator.original_el=this,indicator.show(c_rect)),counter++)},dragstart:function(e){e_data=e.originalEvent.dataTransfer,e_data.setData("el_type","answer"),e_data.setData("el_class",$(this).children("input").attr("class")),original_el=this},dragleave:function(e){counter--,0>=counter&&(counter=0,this.classList.remove("drop--accept"),indicator.hide())},drop:function(e,t){if(e.originalEvent)var a=e.originalEvent.dataTransfer;else var a=t.e.originalEvent.dataTransfer;"answer"==a.getData("el_type")&&(original_el?($(this).parent().append($(original_el)),editor.check_for_emptiness()):append_test_item($(this).parent(),a.getData("el_class"),a.getData("el_type")))}})},block_empty:function(e){e.bind({dragover:function(e){drag_over(e)},dragenter:function(e){$(this).parent().attr("class").split(" ")[0].split("__")[1]==e.originalEvent.dataTransfer.getData("el_type")&&this.classList.add("drop--accept")},dragleave:function(e){$(this).parent().attr("class").split(" ")[0].split("__")[1]==e.originalEvent.dataTransfer.getData("el_type")&&this.classList.remove("drop--accept")},drop:function(e){var t=$(this).parent(),a=e.originalEvent.dataTransfer;t.attr("class").split(" ")[0].split("__")[1]==a.getData("el_type")&&(original_el?($(this).replaceWith($(original_el)),editor.check_for_emptiness()):($(this).replaceWith(generate[a.getData("el_class")](1)),new_el=$(t.children()[0]),add_boundary.draggable(new_el),add_boundary[a.getData("el_type")](new_el)))}})}},indicator={original_el:{},show:function(e){$("#indicator").css({width:e.width+"px",height:e.height+"px",left:e.left+"px",top:e.top+"px"})},hide:function(){$("#indicator").css({width:0,height:0,left:0,top:0})}};$(document).ready(function(){$("#editor__type>input").click(function(e){editor.verify_type()}),$(".answer__field").bind({dragstart:function(e){e_data=e.originalEvent.dataTransfer,e_data.setData("el_type","answer"),e_data.setData("el_class",$(this).children("input").attr("class"))},dragend:function(e){counter=0,$(".drop--accept").removeClass("drop--accept"),document.getElementById("create").classList.remove("drop--accept"),$(".moved").removeClass("moved"),indicator.hide()}}),$(".question-elements>*").bind({dragstart:function(e){e_data=e.originalEvent.dataTransfer,e_data.setData("el_type","question"),e_data.setData("el_class",$(this).attr("class"))},dragend:function(e){counter=0,$(".drop--accept").removeClass("drop--accept"),document.getElementById("create").classList.remove("drop--accept"),$(".moved").removeClass("moved"),indicator.hide()}}),$("#create").bind({dragover:function(e){drag_over(e)},dragenter:function(e){console.log("enter"),(0==counter||firefox)&&this.classList.add("drop--accept"),counter++},dragleave:function(e){console.log(counter),counter--,(0==counter||firefox)&&this.classList.remove("drop--accept")},drop:function(e){e.stopPropagation&&e.stopPropagation(),e_data=e.originalEvent.dataTransfer,create_question(e_data.getData("el_type"),e_data.getData("el_class"),original_el)}}),$("#indicator").bind({dragover:function(e){drag_over(e)},dragenter:function(e){counter++,indicator.original_el.classList.add("drop--accept"),indicator.show(original_el.c_rect)},dragleave:function(e){counter--,0>=counter&&(indicator.original_el.classList.remove("drop--accept"),indicator.hide(),counter=0)},drop:function(e){e.stopPropagation&&e.stopPropagation(),$(indicator.original_el).trigger("drop",[{e:e}])}})});