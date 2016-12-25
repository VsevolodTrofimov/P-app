function upload_file(e,t){var a=test_manager.upload_queue.add(),n=new FormData;n.append("file",e),n.append("path","courses/"+django.course.id+"/assets/"+django.type+"/"),n.append("csrfmiddlewaretoken",django.csrf_token),$.ajax({type:"POST",url:"/func/upload/",data:n,processData:!1,contentType:!1,success:function(e){test_manager.upload_queue.remove(a),console.log(e),t(e)},error:function(t){test_manager.upload_queue.remove(a),notification.show("error","Ошбика при загрузке "+e.name),test_manager.upload_queue.error=!0}})}test_manager={},test_manager.load=function(e){"string"==typeof e&&(e=JSON.parse(e)),console.log(e);var t="undefined"!=typeof editor;t&&(editor.test_data.title||($(".preview h2").html(e.title),editor.test_data.title=e.title),e.tasks.forEach(function(e){editor.test_data.tasks.push(e)}),e.templates.forEach(function(e){editor.test_data.templates.push(e)})),e.tasks.forEach(function(e,a){if(e.is_template){var n=generate.data.task.template.build_finalized_task(e);$(".preview>.__content").append(n.$task)}else{if(t)var s=editor.create_new_task();else{var s=generate.data.task.default.build();s.find(".__actions").remove(),s.find(".__number").html(a+1)}$(".preview>.__content").append(s),s.find(".__group").val(e.group),e.content.forEach(function(e){var t=generate.data[e.type][e.subtype].element.build(e);s.find(".__content").append(t)})}}),t&&(editor.check.numbers(),editor.check.empty())},test_manager.delete=function(){var e=new FormData;e.append("course_id",django.course.id),defined(django.test.id)?e.append("test_id",django.test.id):e.append("material_id",django.material.id),e.append("csrfmiddlewaretoken",django.csrf_token),$.ajax({type:"POST",url:"/"+django.current_type+"/delete/",data:e,processData:!1,contentType:!1,success:function(e){notification.show(e.type,e.message),defined(django.test.id)?window.history.pushState("Редактирование "+test_manager.packed_test.title,"Редактирование "+test_manager.packed_test.heading,"/test/edit/?course_id="+django.course.id+"&test_id="+django.test.id):window.history.pushState("Редактирование "+test_manager.packed_test.title,"Редактирование "+test_manager.packed_test.heading,"/material/edit/?course_id="+django.course.id+"&material_id="+django.material.id)}})},test_manager.fix_test_strict=function(e){var t=!0;return!!(e=test_manager.fix_test_soft(e))&&(e.groups={},e.tasks.forEach(function(a){var n;return n=defined(a.content)?a.content:a.parts,0===n.length?(test_manager.drop("publish"),!1):(n.forEach(function(e){"answer"!==e.type||e.answer||e.answers.length>0||(test_manager.drop("publish"),t=!1)}),void(a.group&&(e.groups[a.group]?e.groups[a.group]++:e.groups[a.group]=1)))}),!!t&&(0!==Object.keys(e.groups).length?(e.groups["Другие"]=0,e.tasks.forEach(function(t){t.group||(t.group="Другие",e.groups["Другие"]++)}),0===e.groups["Другие"]&&delete e.groups["Другие"]):e.groups["Задания"]=e.tasks.length,e))},test_manager.fix_test_soft=function(e){return e=JSON.parse(JSON.stringify(e)),e.title?0===e.tasks.length?(console.log("no empty"),test_manager.drop("save"),!1):e:(console.log("no heading"),test_manager.drop("save"),!1)},test_manager.look_for_files=function(e){e.forEach(function(e){defined(e.asset_id)&&(editor.assets.get(e.asset_id).files?upload_file(editor.assets.get(e.asset_id).files[0],function(t){e.url=t,e.asset_id=void 0}):e.asset_id=void 0)})},test_manager.pack=function(e){test_manager.packed_test=e,e.templates.forEach(function(e){test_manager.look_for_files(e.parts)}),e.tasks.forEach(function(e){e.is_template?test_manager.look_for_files(e.parts):test_manager.look_for_files(e.content)})},test_manager.publish=function(){var e=test_manager.fix_test_strict(editor.test_data);e&&popup.show(test_manager.publish_popup,function(){var t=test_manager.collect_publish();e.tasks.forEach(function(e){e.is_template&&(delete e.is_template,e.content=[],e.parts.forEach(function(t){e.content.push(generate.data.task.template.unwrap_replace(t,e.variables))}),delete e.variables,delete e.parts)}),delete e.templates;for(var a in e.groups)t.build.append(test_manager.render_inline(a,e.groups[a]));t.build.find(".__value").attr("disabled","disabled"),$("#random_build").change(function(){this.checked?(t.build.find(".__value").removeAttr("disabled"),$("#random_order").removeAttr("disabled")):(t.build.find(".__value").attr("disabled","disabled"),$("#random_order").attr("disabled","disabled"))});for(var n=test_manager.calculate_max_points(e),s=5;s>=2;s--)t.marks.append(test_manager.render_inline(s+" от",n));$("#course_section").change(function(){"Новая..."===this.value?$("#new_section_name").removeAttr("disabled"):$("#new_section_name").attr("disabled","disabled")}),$("#limit_time").change(function(){this.checked?t.time.find(".__value").removeAttr("disabled"):t.time.find(".__value").attr("disabled","disabled")}),$("#max_time").change(function(){(this.value<1||isNaN(this.value))&&(this.value=1)}),t.button.click(function(){test_manager.publish_parse(e)})},{width:"64rem"})},test_manager.publish_parse=function(e){var t=test_manager.collect_publish(),a=!0,n={random:{do:!1,shuffle:!1,limits:{}},forgive:{},max_score:test_manager.calculate_max_points(e),marks:{5:0,4:0,3:0,2:0},section:"Нераспределенные",time_limit:"00:00:00"};if($("#random_build").is(":checked")&&(n.random.do=!0,$("#random_order").is(":checked")&&(n.random.shuffle=!0),t.build.find(".row").each(function(){var e=$(this).find(".__group").text();e=e.substring(0,e.length-2);var t=parseInt($(this).find(".__value").val());t||(a=!1,notification.show("warning","Введите квоту для типа "+e)),n.random.limits[e]=parseInt(t)})),t.forgive.find("input").each(function(e,t){n.forgive[$(this).attr("id")]=this.checked}),t.marks.find("input").each(function(e,t){var s=5-e;n.marks[s.toString()]=parseInt(this.value),this.value||(a=!1,notification.show("warning","Введите минимальный балл для "+s))}),"Новая..."===$("#course_section").val()?n.section=$("#new_section_name").val():n.section=$("#course_section").val(),n.section||(notification.show("warning","Выберите секцию для размещения теста"),a=!1),$("#limit_time").is(":checked")){var s=parseInt($("#max_time").val());n.time_limit=[Math.floor(s/60),s%60,0].join(":"),n.time_limit=test_manager.expand_time(n.time_limit)}if(console.log(n),a){var i=new FormData;i.append("json_file",JSON.stringify(test_manager.packed_test)),i.append("course_id",django.course.id),defined(django.test.id)?i.append("test_id",django.test.id):i.append("material_id",django.material.id),i.append("csrfmiddlewaretoken",django.csrf_token),i.append("publish_data",JSON.stringify(n)),$.ajax({type:"POST",url:"/"+django.current_type+"/publish/",data:i,processData:!1,contentType:!1,success:function(e){notification.show(e.type,e.message),$("#"+django.current_type+"_publish").hide(),$("#"+django.current_type+"_unpublish").show(),popup.hide(),test_manager.save()},error:function(e){notification.show(e.type,e.message)}})}},test_manager.calculate_max_points=function(e){var t=0;return e.tasks.forEach(function(e){e.content.forEach(function(e){"answer"===e.type&&(t+=parseInt(e.worth))})}),t},test_manager.collect_publish=function(){var e={};return e.build=popup.$.find(".__build-settings"),e.forgive=popup.$.find(".__forgive"),e.marks=popup.$.find(".__mark-settings"),e.section=popup.$.find(".__course-section"),e.time=popup.$.find(".__time-settings"),e.button=popup.$.find("#publish"),e},test_manager.render_inline=function(e,t){console.log("rendering:",e,t);var a=$("<div class='row'><div class='__group'>"+e+": </div>"+loads.get("Elements/Inputs/text/inline/")+"<div class='__max'> / "+t+"</div></div>");return a.find("input").change(function(){var e=this.value;e=parseInt(e),console.log(e,t),(e<0||isNaN(e))&&(e=0),e>t&&(e=t),this.value=e}),a},test_manager.expand_time=function(e){for(var t=e.split(":"),a=0;a<t.length;a++)1==t[a].length&&(t[a]="0"+t[a]);return t.join(":")},test_manager.publish_material=function(){var e=test_manager.fix_test_strict(editor.test_data);e&&popup.show(test_manager.publish_popup,function(){var t=test_manager.collect_publish();e.tasks.forEach(function(e){e.is_template&&(delete e.is_template,e.content=[],e.parts.forEach(function(t){e.content.push(generate.data.task.template.unwrap_replace(t,e.variables))}),delete e.variables,delete e.parts)}),delete e.templates,$("#course_section").change(function(){"Новая..."===this.value?$("#new_section_name").removeAttr("disabled"):$("#new_section_name").attr("disabled","disabled")}),t.button.click(function(){test_manager.publish_parse(e)})},{width:"64rem"})},test_manager.publish_parse=function(e){var t=(test_manager.collect_publish(),!0),a={section:"Нераспределенные"};if("Новая..."===$("#course_section").val()?a.section=$("#new_section_name").val():a.section=$("#course_section").val(),a.section||(notification.show("warning","Выберите секцию для размещения теста"),t=!1),t){var n=new FormData;n.append("json_file",JSON.stringify(test_manager.packed_test)),n.append("course_id",django.course.id),defined(django.test.id)?n.append("test_id",django.test.id):n.append("material_id",django.material.id),n.append("csrfmiddlewaretoken",django.csrf_token),n.append("publish_data",JSON.stringify(a)),$.ajax({type:"POST",url:"/"+django.current_type+"/publish/",data:n,processData:!1,contentType:!1,success:function(e){notification.show(e.type,e.message),$("#"+django.current_type+"_publish").hide(),$("#"+django.current_type+"_unpublish").show(),popup.hide(),test_manager.save()},error:function(e){notification.show(e.type,e.message)}})}},test_manager.upload_queue={last_id:0,length:0,error:!1,_pending:[],add:function(){var e=this.last_id++;return this.length++,this._pending.push(e),e},remove:function(e){this._pending.remove(e),this.length--}},test_manager.packed_test={},test_manager.upload_test=function(){var e=JSON.parse(JSON.stringify(test_manager.packed_test));e.tasks.forEach(function(e){e.is_template&&(delete e.is_template,e.content=[],e.parts.forEach(function(t){e.content.push(generate.data.task.template.unwrap_replace(t,e.variables))}),delete e.variables,delete e.parts)}),delete e.templates;var t=new FormData;t.append("json_file",JSON.stringify(test_manager.packed_test)),t.append("course_id",django.course.id),defined(django.test.id)?t.append("test_id",django.test.id):t.append("material_id",django.material.id),t.append("csrfmiddlewaretoken",django.csrf_token),t.append("compiled_test",JSON.stringify(e)),$.ajax({type:"POST",url:"/"+django.current_type+"/save/",data:t,processData:!1,contentType:!1,success:function(e){notification.show(e.type,e.message),defined(django.test.id)?(window.history.pushState("Редактирование "+test_manager.packed_test.title,"Редактирование "+test_manager.packed_test.heading,"/test/edit/?course_id="+django.course.id+"&test_id="+django.test.id),$(".header>.__breadcrumbs>a").last().find("div").text(test_manager.packed_test.title)):window.history.pushState("Редактирование "+test_manager.packed_test.title,"Редактирование "+test_manager.packed_test.heading,"/material/edit/?course_id="+django.course.id+"&material_id="+django.material.id)}})},test_manager.drop=function(e){popup.show(loads.get("Elements/Modules/Test/manage/__popup_texts/__no_"+e+"/"),function(){$(".__ok").click(function(e){popup.hide()})})},test_manager.save=function(){if(test_manager.upload_queue.error=!1,test_manager.is_published){var e=test_manager.fix_test_strict(editor.test_data);if(!e)return!1}else{var e=test_manager.fix_test_soft(editor.test_data);if(!e)return!1}test_manager.pack(e),0!==test_manager.upload_queue.length&&(popup.show(loads.get("Elements/Modules/Test/manage/__popup_texts/__save/")),console.log(loads.get("Elements/Modules/Test/manage/__popup_texts/__save/")));var t=function(){0===test_manager.upload_queue.length?(test_manager.upload_queue.error?notification.show("error","Не удалось сохранить тест из-за ошбики с файлом. \n Его можно сохранить, если вы удалите поле, вызывающее ошибку."):test_manager.upload_test(),popup.hide()):setTimeout(t,100)};setTimeout(t,100)},test_manager.unpublish=function(){var e=new FormData;e.append("course_id",django.course.id),defined(django.test.id)?e.append("test_id",django.test.id):e.append("material_id",django.material.id),e.append("csrfmiddlewaretoken",django.csrf_token),$.ajax({type:"POST",url:"/"+django.current_type+"/unpublish/",data:e,processData:!1,contentType:!1,success:function(e){notification.show(e.type,e.message),$("#"+django.current_type+"_publish").show(),$("#"+django.current_type+"_unpublish").hide(),test_manager.is_published=!1}})};