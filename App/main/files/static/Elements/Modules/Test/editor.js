editor.insert_new_task=function(t){var e=$(".preview>.content .__gap").index(t[0]);if("edit"===pull_put.ui.$.find(".__content").attr("state")&&editor.edit.change_value(),defined(editor.active_element.value)){var i=editor.active_element.build(),a=editor.create_new_task();t.before(a),a.find(".__content").append(i),editor.test_data.insert_task(e,editor.active_element.value),editor.check.numbers(),editor.check.empty()}},editor.create_new_task=function(){var t=generate.data.task.default.build(),e=$(t[0]),i=$('<div class="__catcher"></div>');pull_put.put_zone.add(e,function(){editor.insert_new_task(e),pull_put.reset()}),indicator.add(e,"add",1),t.find(".__content").prepend(i),pull_put.put_zone.add(i,function(t,e,i){e.after(editor.active_element.build()),pull_put.reset()}),indicator.add(i,"add",1);var a=t.find(".__overall>.__actions");return button_delete.add(a,t,function(){var e=$(".preview .__task").index(t[1]);editor.test_data.delete_task(e),setTimeout(editor.check.numbers,150)}),t.find(".m--button-delete").removeClass("m--button-delete"),t},pull_put.actions.add=function(){if("edit"===pull_put.ui.$.find(".__content").attr("state")&&editor.edit.change_value(),defined(editor.active_element.value)){var t=editor.active_element.build(),e=editor.create_new_task();$(".preview>.__content").append(e),e.find(".__content").append(t),editor.test_data.add(editor.active_element.value,editor.active_element.type,editor.active_element.subtype),editor.check.numbers(),editor.check.empty()}defined(editor.active_element.position)&&editor.test_data.delete(editor.active_element.position)},editor.assets={_files:[],add:function(t){var e=this._files.length;return this._files.push(t),e},get:function(t){return this._files[t]},replace:function(t,e){this._files[t]=e}};var editor={check:{},edit:{},template_ui:{}};$(document).ready(function(){editor.template_ui.$=$(loads.get("Elements/Modules/Test/editor/__template_ui/")),$("body").append(editor.template_ui.$),editor.template_ui.$.find(".m--close").click(function(){editor.template_ui.hide()})}),editor.fill_item_list=function(t,e){var i='<div class="card"></div>';for(var a in generate.data[e]){var n=generate.data[e][a];if(n.element.show_in_items){var o=$(i).html(n.element.sample.build);o.attr("tip","Кликните, чтобы создать элемент этого типа"),t.append(o),pull_put.puller.add(o,["add"],editor.edit.pull_put_actions.preview,function(){var t=$(".preview .__content").width();pull_put.ui.$.css("margin-left",-t/2+pull_put.ui.additional_margin),pull_put.ui.$.find(".__content").css("width",t-pull_put.ui.additional_margin),editor.edit.start()},!0,!0)}}},$(document).ready(function(){$(".preview").on("keyup","h2",function(){editor.test_data.title=$(this).text()}),$(".preview").on("keyup",".__task .__group",function(){var t=$(".preview .__task").index($(this).parents(".__task"));editor.test_data.tasks[t].group=this.value})}),editor.active_element={is_new:void 0,position:{task:void 0,number:void 0},item_id:void 0,value:{},blueprints:{},build:function(){return editor.edit.change_value(),console.log("building",editor.active_element.value,"using",editor.active_element.blueprints),this.blueprints.element.build(this.value)}},pull_put.pre_actions.pull=function(t){console.log(t),t.attr("subtype")||(t=t.children());var e=generate.get_blueprints(t);if(editor.active_element.blueprints=e,t.parents(".preview").length>0){editor.active_element.is_new=!1;var i=t.parents(".__task"),a={task:$(".preview .__task").index(i[0]),number:i.find(".__content").children("[subtype]").index(t[0])};editor.active_element.position=a,editor.active_element.value=editor.test_data.tasks[a.task].content[a.number]}else editor.active_element.is_new=!0,editor.active_element.position.task=void 0,editor.active_element.position.number=void 0},pull_put.pre_actions.cancel=function(){editor.edit.let(pull_put.ui.proto_element)},pull_put.cancel_action=function(){editor.active_element.is_new=!1,editor.active_element.position.task=void 0,editor.active_element.position.number=void 0,editor.active_element.value={},editor.check.empty(),indicator.hide(1)},editor.test_data={title:"",tasks:[],templates:[],change:function(t,e,i){return t===e?editor.test_data.update(t,i):(editor.test_data.delete(t),void editor.test_data.tasks[e.task].content.splice(e.number,0,i))},update:function(t,e){editor.test_data.tasks[t.task].content[t.number]=e},add:function(t){editor.test_data.tasks.push({content:[t]})},add_template:function(t){t.is_template=!0,editor.test_data.tasks.push(t)},delete:function(t){defined(t)&&defined(t.task)&&editor.test_data.tasks[t.task].content.splice(t.number,1)},delete_task:function(t){editor.test_data.tasks.splice(t,1)},insert_task:function(t,e){editor.test_data.tasks.splice(t,0,{content:[e]})},templates_remove:function(t){editor.test_data.templates.splice(editor.test_data.templates.indexOf(t),1),$(".preview .__task.m--template").each(function(){var t=$(this),e=t.find(".__group").val();console.log("checking",this,"("+e+")","=>",editor.test_data.template_get_parts(e)),editor.test_data.template_get_parts(e)||t.find(".__serialize").click()})},template_get_parts:function(t){for(var e=0;e<editor.test_data.templates.length;e++)if(editor.test_data.templates[e].group===t)return editor.test_data.templates[e].parts;return!1}},editor.test_data.templates.save=function(t,e){t=JSON.parse(JSON.stringify(t)),console.log("saving",t,"as",e);for(var i=0;i<editor.test_data.templates.length;i++)editor.test_data.templates[i].group===e&&(editor.test_data.templates[i]=t,saved=!0)},editor.test_data.templates.add=function(t){var e=!1,i=t.group;console.log("adding",t),t=JSON.parse(JSON.stringify(t));for(var a=0;a<editor.test_data.templates.length;a++)editor.test_data.templates[a].group===t.group&&(e=!0);return e?(i+="+",t.group=i,editor.test_data.templates.add(t)):(editor.test_data.templates.push(t),i)},pull_put.pre_actions.put=function(t,e){if(!t.hasClass("__gap")){var i=editor.edit.change_value(),a=t.parent().children("[subtype]").index(t);a+=1;var n={task:$(".preview .__task").index(t.parents(".__task")),number:a};editor.test_data.change(editor.active_element.position,n,i)}},pull_put.pre_actions.save=function(){editor.edit.change_value();var t=editor.active_element.position,e=editor.active_element.value;editor.edit.stop(),$(".m--pull_put_empty").after(pull_put.ui.element),editor.test_data.update(t,e)},pull_put.pre_actions.delete=function(){editor.test_data.delete(editor.active_element.position)},describe("Test editor",function(){var t=editor.test_data;beforeEach(function(){t.tasks=[]}),describe("Datastruct",function(){it("should be defined",function(){expect(t).toBeDefined()}),describe("Adding",function(){it("to empty",function(){var e={val:"sample"};t.add(e),expect(t.tasks.length).toEqual(1),expect(t.tasks[0].content[0]).toEqual(e)}),it("to big test",function(){for(var e={val:"sample"},i=0;i<10;i++)t.add(i);t.add(e),expect(t.tasks.length).toEqual(11),expect(t.tasks[10].content[0]).toEqual(e)})}),describe("Deleting",function(){it("from signle blank task",function(){var e={val:"sample"};t.add(e),t.delete({task:0,number:0}),expect(t.tasks.length).toEqual(1),expect(t.tasks[0].content.length).toEqual(0)}),it("from end of big task",function(){var e={val:"sample"};t.add(e);for(var i=0;i<10;i++)t.change(void 0,{task:0,number:i+1},{i:i+1});t.delete({task:0,number:10}),expect(t.tasks.length).toEqual(1),expect(t.tasks[0].content.length).toEqual(10),expect(t.tasks[0].content[9].i).toEqual(9)}),it("from start of big task",function(){var e={val:"sample"};t.add(e);for(var i=0;i<10;i++)t.change(void 0,{task:0,number:i+1},{i:i+1});t.delete({task:0,number:0}),expect(t.tasks.length).toEqual(1),expect(t.tasks[0].content.length).toEqual(10),expect(t.tasks[0].content[9].i).toEqual(10),expect(t.tasks[0].content[0].i).toEqual(1)}),it("from middle of big task",function(){var e={val:"sample"};t.add(e);for(var i=0;i<10;i++)t.change(void 0,{task:0,number:i+1},{i:i+1});t.delete({task:0,number:5}),expect(t.tasks.length).toEqual(1),expect(t.tasks[0].content.length).toEqual(10),expect(t.tasks[0].content[9].i).toEqual(10),expect(t.tasks[0].content[0]).toEqual(e)}),it("task",function(){for(var e=0;e<10;e++)t.add({i:e+1});t.delete_task(0),expect(t.tasks.length).toEqual(9),expect(t.tasks[0].content[0].i).toEqual(2),t.delete_task(8),expect(t.tasks.length).toEqual(8),expect(t.tasks[7].content[0].i).toEqual(9),t.delete_task(3),expect(t.tasks.length).toEqual(7),expect(t.tasks[3].content[0].i).toEqual(6)})}),describe("Chnaging",function(){var e={val:"a"},i={val:"b"},a={val:"c"};beforeEach(function(){t.add(e),t.add(i)}),it("should move across tasks",function(){t.change({task:1,number:0},{task:0,number:1},i),expect(t.tasks[0].content[0]).toEqual(e),expect(t.tasks[0].content[1]).toEqual(i),expect(t.tasks[1].content.length).toEqual(0)}),it("should insert in empty task",function(){t.change({task:1,number:0},{task:0,number:1},i),t.change(void 0,{task:1,number:0},a),expect(t.tasks[1].content[0]).toEqual(a),expect(t.tasks[1].content.length).toEqual(1)}),it("should insert in full task",function(){t.change({task:1,number:0},{task:0,number:1},i),t.change(void 0,{task:0,number:1},a),expect(t.tasks[0].content[0]).toEqual(e),expect(t.tasks[0].content[1]).toEqual(a),expect(t.tasks[0].content[2]).toEqual(i)}),it("should update value",function(){t.update({task:0,number:0},a),expect(t.tasks[0].content[0]).toEqual(a)}),it("should redirect update from cahnge",function(){t.change({task:0,number:0},{task:0,number:0},a),expect(t.tasks[0].content[0]).toEqual(a),expect(t.tasks[0].content.length).toEqual(1)})})})}),editor.check.empty=function(){$(".preview .__task").each(function(t,e){var i=$(this).children(".__content");i.find(".editor__m--empty").remove(),0===i.children('[type="question"]').length&&i.find(".__catcher").after(editor.check.create_empty("question"))})},editor.check.create_empty=function(t){var e=$("<div class='editor__m--empty' type='empty'></div>");return e.attr("type","question"),e.text(editor.check.empty_text),pull_put.put_zone.add(e,function(){e.after(editor.active_element.build()),pull_put.reset()}),indicator.add(e,"add",1),e},editor.check.numbers=function(){$(".preview .__task .__number").each(function(t,e){$(this).text(t+1)})},editor.edit.pull_put_actions={edit:{icon:loads["Elements/Icons/edit.svg"],tip:"Редактировать",_action:function(){editor.edit.start()}},preview:{icon:loads["Elements/Icons/visibility.svg"],tip:"Показать элемент",_action:function(){editor.edit.stop()}}},editor.edit.change_value=function(){if("edit"!==pull_put.ui.$.find(".__content").attr("state"))return editor.active_element.value;var t=editor.active_element.blueprints,e=t.edit.parse(pull_put.ui.$.find(".__content"));return editor.active_element.value=e,e},editor.edit.let=function(t){pull_put.puller.add(t,["add","delete","save"],editor.edit.pull_put_actions.edit,function(){console.log("showing"),indicator.show(1)},!1,!0),pull_put.put_zone.add(t,function(t,e,i){e.after(editor.active_element.build()),pull_put.reset()}),indicator.add(t,"down",1)},editor.edit.start=function(){pull_put.ui.$.find(".__content").attr("state","edit"),indicator.show(1);var t=editor.active_element.value;blueprints=editor.active_element.blueprints;var e=blueprints.edit.build(t);pull_put.ui.$.find(".__content").html(e),pull_put.ui.add_action(editor.edit.pull_put_actions.preview)},editor.edit.stop=function(){var t=editor.edit.change_value();pull_put.ui.$.find(".__content").attr("state","preview");var e=blueprints.element.build(t);pull_put.ui.element=e,pull_put.ui.$.find(".__content").html(e),pull_put.ui.add_action(editor.edit.pull_put_actions.edit)},editor.active_task={position:void 0,value:{}},editor.template_ui.hide=function(){editor.template_ui.$.addClass("m--hiding"),setTimeout(function(){editor.template_ui.$.addClass("m--hidden")},500)},editor.template_ui.show=function(){editor.template_ui.$.removeClass("m--hidden"),editor.template_ui.$.find(".__templates").html(""),editor.template_ui.$.removeClass("m--hidden"),editor.test_data.templates.forEach(function(t){var e=[{action:function(){var e=generate.data.task.template.add_to_test(t);setTimeout(function(){e.click()},500)},icon:loads["Elements/Icons/add.svg"],tip:"Добавить в тест задание из этого шаблона"},{action:function(){generate.data.task.template.edit.launch(t)},icon:loads["Elements/Icons/edit.svg"],tip:"Редактировать шаблон"},{action:function(){editor.test_data.templates.add(t),editor.template_ui.show()},icon:loads["Elements/Icons/copy.svg"],tip:"Копировать шаблон"},{action:function(){},icon:loads["Elements/Icons/share.svg"],tip:"Добавить шаблон в открытую библиотеку"}],i=generate.data.task.template.build(t.parts,t.variables,t.group),a=i.find(".__actions");a.find("button").remove(),e.forEach(function(t){var e=$('<button class="m--ghost m--icon"></button>');e.append(t.icon),e.attr("tip",t.tip),e.click(t.action),a.append(e)}),button_delete.add(a,i,function(){editor.test_data.templates_remove(t),editor.template_ui.show()}),a.find(".m--button-delete").removeClass("m--button-delete").attr("tip","Удалить шаблон"),i.find(".__content").children().each(function(){$(this).unbind("click")}),i.find(".__group").attr("tip","Название шаблона"),editor.template_ui.$.find(".__templates").append(i)}),setTimeout(function(){editor.template_ui.$.removeClass("m--hiding")},10)};