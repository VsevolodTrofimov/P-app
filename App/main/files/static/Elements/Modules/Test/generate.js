var generate={data:{task:{},question:{},answer:{}},counter:{}};generate.get_blueprints=function(e){var t=$(e),a=t.attr("type"),n=t.attr("subtype");return generate.data[a][n]},generate.make_template={element:{question:function(e){return $('<div type="question" subtype="'+e+'" class="generate-item"></div>')},answer:function(e,t){return $('<div type="answer" subtype="'+e+'" class="generate-item"></div>')}},edit:{question:function(e){return $('<div type="question" subtype="'+e+'" class="generate-edit"></div>')},answer:function(e,t){return $('<div type="answer" subtype="'+e+'"class="generate-edit"></div>')}}},generate.register.task("default",{builder:function(){var e=$(loads.get("Elements/Modules/Test/generate/data/task/default/"));return defined(generate.data.task.template)?e.find(".__make-template").click(function(){generate.data.task.template.to_tempalte(e)}):e.find(".__make_template").remove(),e}}),$(document).ready(function(){generate.data.task.template.add_to_test=function(e,t){e=JSON.parse(JSON.stringify(e)),defined(t)&&"edit"===editor.template_editor_mode&&(e=generate.data.task.template.element.parse_edit(t.find(".task").children(),e));var a=generate.data.task.template.build_finalized_task(e),n=a.$task;return console.log("adding to test:",a.data),editor.test_data.add_template(a.data),$(".preview>.__content").append(n),popup.hide(),editor.template_ui.hide(),editor.check.numbers(),n}}),$(document).ready(function(){generate.data.task.template.build_finalized_task=function(e){var t=e,a=JSON.parse(JSON.stringify(t.variables));t.variables=a;var n=generate.data.task.template.build(t.parts,t.variables,t.group);$(n[1]).click(function(e){"button"!=e.target.nodeName.toLowerCase()&&"path"!=e.target.nodeName.toLowerCase()&&"svg"!=e.target.nodeName.toLowerCase()&&generate.data.task.template.edit.launch(t,n)}),button_delete.add(n.find(".__overall>.__actions"),n,function(){var e=$(".preview .__task").index(n[1]);editor.test_data.delete_task(e),setTimeout(editor.check.numbers,150)}),n.find(".m--button-delete").removeClass("m--button-delete");var i=$(n[0]);return pull_put.put_zone.add(i,function(){editor.insert_new_task(i),pull_put.reset()}),indicator.add(i,"add",1),{data:t,$task:n}}}),$(document).ready(function(){generate.data.task.template.to_tempalte=function(e){var t=$(".preview .__task").index(e[1]),a=editor.test_data.tasks[t].content,n={group:editor.test_data.tasks[t].group,parts:[],variables:[],is_template:!0};a.forEach(function(e){n.parts.push(e),console.log(e)});var i=generate.data.task.template.build_finalized_task(n),r=editor.test_data.templates.add(i.data);i.data.group=r,editor.test_data.tasks[t]=i.data,i.$task.find("input.__group").val(r),$(e[1]).replaceWith(i.$task),e[0].remove(),editor.check.numbers(),editor.check.empty()}}),$(document).ready(function(){generate.data.task.template.edit={observe_new_vars:function(e){e.find(".task .__value").keyup(function(){var t=[];e.find(".task .__value").each(function(){var e=generate.data.task.template.edit.check_for_vars($(this));e.forEach(function(e){t.indexOf(e)===-1&&t.push(e)})}),generate.data.task.template.edit.update_variables(t,e)})},check_for_vars:function(e){var t=/%\(([^()]+)\)/g,a="",n=[];for(e.val()?a=e.val():e.text()&&(a=e.text());result=t.exec(a);)n.push(result[1]);return n},build_variables:function(e,t){var a=t.find(".__variables");return 0===e.length?void a.html("Переменных нет.<br>Они создаются выражением:<br><i>%(название пременной)</i>"):(a.html(""),void e.forEach(function(e){function n(){var e=[];return a.find("input").each(function(){e.push({name:$(this).attr("name"),value:$(this).val()})}),e}var i=render.inputs.text(e.name,e.name,e.value);a.append(i),i.keyup(function(){if(editor.active_template.variables=n(),"preview"===editor.template_editor_mode){var e=generate.data.task.template.build(editor.active_template.parts,editor.active_template.variables,editor.active_template.group);e.find(".__actions button").css("pointer-events","none"),e.find(".__content").children().each(function(){$(this).unbind("click")}),t.find(".task").html(e),console.log("preview -> rebuilt",t)}})}))},update_variables:function(e,t){var a=[];editor.active_template.variables.forEach(function(t){var n=e.indexOf(t.name);n>-1&&(a.push(t),e.splice(n,1))}),e.forEach(function(e){a.push({name:e,value:""})}),editor.active_template.variables=a,generate.data.task.template.edit.build_variables(a,t)},build_editor:function(e,t){var a=$(loads["Elements/Modules/Test/generate/data/task/template/__edit/exports.html"]);return a.css("width","100%"),a},launch:function(e,t){editor.active_template=e,editor.template_editor_mode="edit";var a=generate.data.task.template.edit.build_editor(e.parts,e.variables);a.find(".task").html(generate.data.task.template.element.build_edit(e.parts,e.group)),popup.show(a,function(){},{width:"64rem"},!0),generate.data.task.template.edit.observe_new_vars(a),generate.data.task.template.edit.handle_actions(a,t),generate.data.task.template.edit.build_variables(e.variables,a)}}}),$(document).ready(function(){generate.data.task.template.edit.handle_actions=function(e,t){var a=e.find(".__mod_swap"),n=e.find(".__add"),i=e.find(".__save"),r=editor.active_template.group;defined(t)||(editor.active_template=JSON.parse(JSON.stringify(editor.active_template))),a.click(function(){if(console.log("was:",editor.template_editor_mode),"edit"===editor.template_editor_mode){editor.template_editor_mode="preview",editor.active_template=generate.data.task.template.element.parse_edit(e.find(".task").children(),editor.active_template);var t=generate.data.task.template.build(editor.active_template.parts,editor.active_template.variables,editor.active_template.group);t.find(".__actions button").css("pointer-events","none"),console.log(e),e.find(".task").html(t),a.html(loads["Elements/Icons/edit.svg"]).attr("tip","Редактировать")}else editor.template_editor_mode="edit",e.find(".task").html(generate.data.task.template.element.build_edit(editor.active_template.parts,editor.active_template.group)),generate.data.task.template.edit.observe_new_vars(e),a.html(loads["Elements/Icons/visibility.svg"]).attr("tip","Показать задание")}),t&&(n.html(loads["Elements/Icons/copy.svg"]),n.attr("tip","Создать новое задание (старое сохранится)")),n.click(function(){generate.data.task.template.add_to_test(editor.active_template,e)}),t?i.click(function(){"edit"===editor.template_editor_mode&&(editor.active_template=generate.data.task.template.element.parse_edit(e.find(".task").children(),editor.active_template)),$new_task=generate.data.task.template.build_finalized_task(editor.active_template).$task,$(t[1]).replaceWith($new_task),t[0].remove(),t=$new_task;var a=$(".preview .__task").index(t[1]);editor.test_data.tasks[a]=editor.active_template,editor.test_data.tasks[a].is_template=!0,editor.check.numbers()}):i.click(function(){"edit"===editor.template_editor_mode&&(editor.active_template=generate.data.task.template.element.parse_edit(e.find(".task").children(),editor.active_template)),editor.test_data.templates.save(editor.active_template,r),editor.template_ui.show(),console.log("rebuilding"),editor.test_data.tasks.forEach(function(e,t){if(e.is_template){var a=editor.test_data.template_get_parts(e.group);a&&(e.parts=a);var n=generate.data.task.template.build_finalized_task(e).$task[1];console.log("data:",e,"idx:",t),console.log("built:",n),$(".preview>.__content>.__task").eq(t).replaceWith(n)}}),editor.check.numbers()})}}),generate.register.task("template",{build_edit:function(e,t){var a=generate.data.task.default.build(),n=a.find(".__content");return e.forEach(function(e){var t=generate.data[e.type][e.subtype].edit.build(e);n.append(t)}),a.find(".__number").text("Шаблон задания"),a.find(".__actions button").remove(),a.find("input.__group").val(t).attr("tip","Название шаблона"),a},parse_edit:function(e,t){var a={parts:[],variables:t.variables,group:""};a.group=e.find(".__group").val();for(var n=0;n<t.parts.length;n++){var i=e.find(".__content").find(".m--edit-wrapper").eq(n),r=generate.data[t.parts[n].type][t.parts[n].subtype].edit.parse(i);a.parts.push(r)}return a},builder:function(e,t,a){var n=generate.data.task.default.build(),i=n.find(".__content"),r=$('<button class="m--ghost m--icon __serialize">'+loads["Elements/Icons/serialize.svg"]+"</button>"),e=JSON.parse(JSON.stringify(e));return e.forEach(function(e){e=generate.data.task.template.unwrap_replace(e,t)}),e.forEach(function(e){var t=generate.data[e.type][e.subtype].element.build(e);t.children(".indicator").remove(),i.append(t)}),r.click(function(){generate.data.task.template.serialize(n,e,t)}),r.attr("tip","Превратить это задание в обычное"),n.find(".__make-template").replaceWith(r),a&&n.find("input.__group").val(a),n.find("input.__group").attr("disabled","disabled"),n.find(".__content").children().each(function(){$(this).unbind("click").removeClass("m--pullable").removeClass("m--put-zone")}),n.addClass("m--template"),n}}),$(document).ready(function(){generate.data.task.template.serialize=function(e,t,a){var n=$(".preview .__task").index(e[1]),i={group:editor.test_data.tasks[n].group,content:[]};t.forEach(function(e){i.content.push(generate.data.task.template.unwrap_replace(e,a))}),editor.test_data.tasks[n]=i;var r=editor.create_new_task();i.content.forEach(function(e){var t=generate.data[e.type][e.subtype].element.build(e);r.find(".__content").append(t)}),r.find(".__group").val(i.group),$(e[1]).replaceWith(r),e[0].remove(),editor.check.numbers(),editor.check.empty()}}),$(document).ready(function(){generate.data.task.template.unwrap_replace=function(e,t){if("string"==typeof e)t.forEach(function(t){e=e.replaceAll("%("+t.name+")",t.value)});else if(e instanceof Array){e.forEach(function(e){e=generate.data.task.template.unwrap_replace(e,t)});for(var a=0;a<e.length;a++)e[a]=generate.data.task.template.unwrap_replace(e[a],t)}else if("object"==typeof e)for(key in e)e[key]=generate.data.task.template.unwrap_replace(e[key],t);return e}}),generate.register.element("answer","classify",{show_in_items:!0,create_item:function(e,t){var a=$(loads.get("Elements/Modules/Test/generate/data/elements/answer/classify/__item/"));return a.text(e),a.addClass("classify_item_"+t),pull_put.puller.add(a,[],void 0,function(){indicator.show(t),pull_put.ui.$.find(".__content").css("min-width","10rem")},!1,!0),a},check:function(e){e.find(".__items").each(function(){0===$(this).children(".__item").length?0===$(this).children(".m--classify-empty").length&&$(this).append('<div class="m--classify-empty">Пусто</div>'):$(this).children(".m--classify-empty").remove()})},create_class:function(e,t,a,n){var i=this,r=$(loads.get("Elements/Modules/Test/generate/data/elements/answer/classify/")),s=r.find(".__items");return 0===t.length?s.append('<div class="m--classify-empty">Пусто</div>'):t.forEach(function(e){s.append(i.create_item(e,n))}),pull_put.put_zone.add(s,function(e,t,a){a.hasClass("classify_item_"+n)&&(s.append(a),console.log(a),pull_put.reset(),indicator.hide(n),i.check(r.parent()))}),indicator.add(s,"add",n),r.find(".__title").text(e),r.addClass(a),r},builder:function(e){var t=this,a=generate.counter.classify++,n=e.items.slice(),i=t.make_template(e);return e.classes.forEach(function(r){var s=[];e.answer[r]&&e.answer[r].forEach(function(e){n.remove(e),s.push(e)}),i.append(t.create_class(r,s,"",a))}),n.length>0&&i.append(t.create_class("",n,"m--unordered",a)),i},sample:{value:{classes:["Глаголы","Существительные"],items:["Дом","Стол","Бук"],answer:{}}}}),generate.register.element("answer","checkbox",{show_in_items:!0,builder:function(e){e.answer=e.answer||[];var t=this.make_template(e);return e.items.forEach(function(a,n){var i=$(loads.get("Elements/Inputs/checkbox/"));i.find("label").text(a),e.answer.has(n)&&(i.find("input")[0].checked=!0),t.append(i)}),t},sample:{value:{items:["Вариант 1","Вариант 2","Вариант 3"],answer:[1],worth:1}}}),generate.register.element("answer","text",{show_in_items:!0,builder:function(e){var t=this.make_template(e);return t.append(render.inputs.text(e.label,"",e.answer)),t},sample:{value:{label:"Текстовый ответ",worth:1}}}),generate.register.element("answer","radio",{show_in_items:!0,builder:function(e){var t=generate.counter.radio++;e.answer=e.answer||[];var a=this.make_template(e);return e.items.forEach(function(n,i){var r=$(loads.get("Elements/Inputs/radio/"));r.find("label").text(n),e.answer.has(i)&&(r.find("input")[0].checked=!0),a.append(r),a.find("input").attr("name","radio_"+t)}),a},sample:{value:{items:["Вариант 1","Вариант 2","Вариант 3"],answer:[1],worth:1}}}),generate.register.element("question","file",{show_in_items:!0,builder:function(e){var t=this.make_template(e),a=$(loads.get("Elements/card/file/exports.html"));return a.attr("href",e.url),a.find(".__name").text(e.name),a.find(".__size").text(e.size),t.append(a),t},sample:{value:{name:"Файл для скачивания",size:"3.21МБ",pos:void 0,url:"https://thetomatos.com/wp-content/uploads/2016/05/file-clipart-3.png"}}}),generate.register.edit("answer","classify",{random_possible:!0,create_item:function(e){var t=$(loads.get("Elements/Modules/Test/generate/data/elements/answer/classify/__item/"));return t.append(render.inputs.text("Текст элемента","",e)),button_delete.add(t),t},create_class:function(e,t,a){var n=this,i=$(loads.get("Elements/Modules/Test/generate/data/elements/answer/classify/")),r=i.find(".__items"),s=$('<button class="m--ghost m--icon"></button>');return t.length>0&&t.forEach(function(e){r.append(n.create_item(e))}),i.find(".__title").text(e).attr("contenteditable","true"),i.addClass(a),button_delete.add(i),s.append(loads["Elements/Icons/add.svg"]),s.click(function(){s.before(n.create_item(""))}),i.find(".__items").append(s),i},builder:function(e){var t=this,a=e.items?e.items.slice():[],n=t.make_template(e),i=$('<button class="m--ghost m--icon"></button>');return e.classes&&e.classes.forEach(function(i){var r=[];e.answer[i]&&e.answer[i].forEach(function(e){a.remove(e),r.push(e)}),n.append(t.create_class(i,r))}),a.length>0&&n.append(t.create_class("",a,"m--unordered")),i.append(loads["Elements/Icons/add.svg"]),i.click(function(){i.before(t.create_class("",[]))}),n.append(i),n},parser:function(e){var t=[],a=[],n={},i=1;return e.children(".__class").each(function(){var e=$(this).children("h3").text();""===e&&(e="Тип "+i,i++),n[e]=[],a.push(e),$(this).find("input").each(function(){this.value&&(n[e].push(this.value),t.push(this.value))})}),{items:t,classes:a,answer:n}}}),generate.register.element("question","image",{show_in_items:!0,builder:function(e){var t=this.make_template(e),a=$(document.createElement("img"));return a.attr("src",e.url||e.href),a.css("max-width","100%"),t.css({display:"flex","align-items":"center","justify-content":"center"}),t.append(a),t},sample:{value:{url:"/media/samples/image.jpg"}}}),generate.register.edit("answer","checkbox",{random_possible:!0,builder:function(e){var t=this.make_template(),a=function(e){var t=$(loads.get("Elements/Inputs/checkbox/")),a=render.inputs.text("","",e),n=$("<div class='__edit_item'></div>");return n.append(t).append(a),button_delete.add(n),n};e.items&&e.items.length?e.items.forEach(function(n,i){var r=a(n);t.append(r),e.answer.has(i)&&(r.find('[type="checkbox"]')[0].checked=!0)}):t.append(a());var n=$("<button class='__add_option'>Ещё вариант</button>");return t.append(n),n.click(function(){n.before(a())}),t},parser:function(e){var t={items:[],answer:[]};return e.find(".m--checkbox").each(function(e,a){var n=$(a).siblings().find(".__value").val();t.items.push(n),$(a).find("input").is(":checked")&&t.answer.push(e)}),t}}),generate.register.element("question","text",{show_in_items:!0,builder:function(e){var t=this.make_template(e);return t.html('<div class="__value">'+e.text+"</div>"),t},sample:{value:{text:"Текстовый вопрос"}}}),generate.register.edit("answer","text",{builder:function(e){var t=this.make_template(),a=render.inputs.text("Формат ответа","label",e.label);t.prepend(a);var n=render.inputs.text("Верный ответ","answer",e.answer);return t.prepend(n),t},parser:function(e){var t={label:"",answer:void 0};return t.label=e.find('[name="label"]').val(),t.answer=e.find('[name="answer"]').val(),t}}),generate.register.edit("question","file",{builder:function(e){var t=this.make_template(),a=render.inputs.text("Название файла (как его увидят ученики)","file_name",e.name),n=$(loads.get("Elements/Inputs/file/"));t.append(a),t.append(n);var i=file_catcher.add(n);return(defined(e.asset_id)||defined(e.url))&&(n.find(".__text").text(e.file_name),i.value.change(function(){editor.assets.replace(e.asset_id,i)})),defined(e.asset_id)||(e.asset_id=editor.assets.add(i)),t},parser:function(e){var t={};return t.asset_id=editor.active_element.value.asset_id,t.name=e.find('[name="file_name"]').val(),defined(editor.assets.get(t.asset_id))?(t.file_name=editor.assets.get(t.asset_id).name,t.size=Math.floor(editor.assets.get(t.asset_id).files[0].size/1024/1024*100)/100+"МБ"):(t.file_name=editor.active_element.value.file_name,t.size=editor.active_element.value.size),""===t.name&&(t.name=t.file_name),t}}),generate.register.edit("answer","radio",{random_possible:!0,builder:function(e){var t=this.make_template(),a=generate.counter.radio++,n=function(e){var t=$(loads.get("Elements/Inputs/radio/")),n=render.inputs.text("","",e),i=$("<div class='__edit_item'></div>");return t.find("input").attr("name","new_radio_"+a),i.append(t).append(n),button_delete.add(i),i};e.items&&e.items.length?e.items.forEach(function(a,i){var r=n(a);t.append(r),e.answer.has(i)&&(r.find('[type="radio"]')[0].checked=!0)}):t.append(n());var i=$("<button class='__add_option'>Ещё вариант</button>");return t.append(i),i.click(function(){i.before(n())}),t},parser:function(e){var t={items:[],answer:[]};return e.find(".m--radio").each(function(e,a){var n=$(a).siblings().find(".__value").val();t.items.push(n),$(a).find("input").is(":checked")&&t.answer.push(e)}),t}}),generate.register.edit("question","image",{builder:function(e){var t=this.make_template(),a=$(loads.get("Elements/Inputs/file/"));t.append(a);var n=file_catcher.add(a);return(defined(e.asset_id)||defined(e.url))&&(a.find(".__text").text(e.file_name),n.value.change(function(){editor.assets.replace(e.asset_id,n)})),defined(e.asset_id)||(e.asset_id=editor.assets.add(n)),t},parser:function(e){var t={};t.asset_id=editor.active_element.value.asset_id;var a=editor.assets.get(t.asset_id);return defined(a)?(t.file_name=editor.assets.get(t.asset_id).name,t.href=URL.createObjectURL(a.files[0]),t.url=void 0):(t.href=t.url||editor.active_element.value.href,t.file_name=editor.active_element.value.file_name),t}}),generate.register.edit("question","text",{builder:function(e){var t=this.make_template();return t.prepend(loads.get("Elements/Inputs/text/textarea/")),t.find("label").text("Текст"),t.find(".__value").html(e.text),e.text&&t.find("label").addClass("m--top"),inline_editor.start(t.find(".__value")[0]),t},parser:function(e){return{text:e.find(".__value").html()}}}),generate.register.external("answer","checkbox",{get_value:function(e){var t=[];return e.find(".m--checkbox").each(function(e,a){a.querySelector("input").checked&&t.push(e)}),t},get_summary:function(e,t){var a=[],n=!1;return e.forEach(function(e){var i=t.items[e];i.length>20?(i=i.substring(0,17).escape(),i+="&hellip;",n=!0):i=i.escape(),a.push(i)}),a=n?a.join("<br>"):a.join(", ")},to_answer:function(e,t,a){function n(e){a.answer=e;var t=i.element.build(a);return t.find("input").attr("disabled","disabled"),t}var i=this.self;return Array.isArray(e)||(e=[]),{user:n(e),right:n(t)}},observer:function(e,t){e.find("input").change(t)}}),generate.register.external("answer","radio",{get_value:function(e){var t=[];return e.find(".m--radio").each(function(e,a){a.querySelector("input").checked&&t.push(e)}),t},get_summary:function(e,t){var a=[],n=!1;return e.forEach(function(e){var i=t.items[e];i.length>20?(i=i.substring(0,17).escape(),i+="&hellip;",n=!0):i=i.escape(),a.push(i)}),a=n?a.join("<br>"):a.join(", ")},to_answer:function(e,t,a){function n(e){a.answer=e;var t=i.element.build(a);return t.find("input").attr("disabled","disabled"),t}var i=this.self;return Array.isArray(e)||(e=[]),{user:n(e),right:n(t)}},observer:function(e,t){e.find("input").change(t)}}),generate.register.external("answer","classify",{get_value:function(e){var t={};return e.children(".__class").each(function(){if(!$(this).hasClass("m--unordered")){var e=$(this).children("h3").text();t[e]=[],$(this).find(".__item").each(function(){t[e].push($(this).text())})}}),t},unwrap_answer:function(e,t){var a=[],n=[];for(class_name in e)for(var i=0;i<e[class_name].length;i++)e[class_name][i].length>20&&t?(e[class_name][i]=e[class_name][i].substring(0,17).escape(),e[class_name][i]=e[class_name][i]+"..."):e[class_name][i]=e[class_name][i].escape(),n.remove(class_name),n.push(class_name),a.push(e[class_name][i]);return{classes:n,items:a,answer:e}},get_summary:function(e,t){if(e=this.unwrap_answer(e,!0),0===e.items.length)return console.log("empty"),"";var a=this.self.element.build(e);return a.find("*").unbind("click"),a},to_answer:function(e,t,a){var n=this,i=function(e){console.log(e),e=n.unwrap_answer(e,!0);var t=n.self.element.build(e);return t.find("*").unbind("click"),t};return{user:i(e),right:i(t)}},observer:function(e,t){e.find(".__items").click(function(e){pull_put.is_pulled&&t()})}}),generate.register.external("answer","text",{get_value:function(e){return e.find("input").val()},get_summary:function(e){return e||(e=""),e.length>20?(e=e.substring(0,17).escape(),e+="&hellip;"):e=e.escape(),e},to_answer:function(e,t,a){function n(e){a.answer=e;var t=i.element.build(a);return t.find("input").attr("disabled","disabled"),t}var i=this.self;return{user:n(e),right:n(t)}},observer:function(e,t){var a,n=1e3;e.keydown(function(){clearTimeout(a),a=setTimeout(function(){e.find(".__value").val();t()},n)})}}),generate.register.edit=function(e,t,a){if(!e||!t)return!1;var n=this.bind_data(e,t,"edit",a);return n.edit.make_template=function(a){return generate.make_template.edit[e](t,a)},n.edit.build=function(t){editor.active_element.item_id=t.item_id;var a=$("<div class='m--edit-wrapper'></div>");if(a.append(n.edit.builder(t)),"answer"===e){var i=render.inputs.text("Макс. балл","worth",t.worth||1);if(a.append(i),n.edit.random_possible){var r=$(loads["Elements/Inputs/checkbox/exports.html"]);r.find("label").text("Случайный порядок"),r.find("input").attr("name","random"),r.find("input")[0].checked=t.random,a.append(r)}}return a},n.edit.parse=function(a){var i=n.edit.parser(a.find(".generate-edit"));return i.item_id=editor.active_element.item_id,"answer"===e&&(i.worth=a.find('[name="worth"]').val()),n.edit.random_possible&&(i.random=a.find('[name="random"]')[0].checked),i.type=e,i.subtype=t,i},!0},generate.register.element=function(e,t,a){if(!e||!t)return!1;var n=this.bind_data(e,t,"element",a);return n.element.make_template=function(a){return generate.make_template.element[e](t,a)},n.element.build=function(e,t){var a=n.element.builder(e);return t?a:(defined(n.edit)&&"undefined"!=typeof editor&&editor.edit.let(a),defined(n.external)&&n.external.observe(a),a)},n.element.sample.build=function(){var e=n.element.build(n.element.sample.value,!0);return e},n.element.parse=this.element.parser,!0},generate.register.external=function(e,t,a){if(!e||!t)return!1;var n=this.bind_data(e,t,"external",a);return n.external.observe=function(e,t,a){return!!defined(a)&&void n.external.observer(e,function(){var i=n.external.get_value(e),r=n.external.get_summary(i,t);a(i,r)})},n.external.make_answer=function(e,t,a,i,r,s){var d=n.external.to_answer(e,t,s);e||(d.user=$("<b> Пропущено </b>"));var l=$(loads.get("Elements/Modules/Test/generate/data/external/answer/__template/")),o=l.find(".__score");return l.find(".__user>.__answer").html(d.user),l.find(".__right>.__answer").html(d.right),o.find(".__current").html(a),o.find(".__max").html(i),summary.set_icon(r,l.find(".__data>.__icon")),setTimeout(function(){accordion.add(l.find(".__right"),"h3");var e=l.find(".m--accordion-toggle");e.css({left:e[0].offsetLeft,right:"auto"}),e.click()},100),l},n.external.make_answer_edit=function(e,t,a,n,i){},!0},generate.register.task=function(e,t){var a=this.bind_data("task",e,"element",t);a.build=t.builder};