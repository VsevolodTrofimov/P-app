editor.check.empty=function(){$(".preview .__task").each(function(e,t){var i=$(this).children(".__content");i.find(".editor__m--empty").remove(),0===i.children('[type="question"]').length&&i.find(".__catcher").after(editor.check.create_empty("question"))})},editor.check.create_empty=function(e){var t=$("<div class='editor__m--empty' type='empty'></div>");return t.attr("type","question"),t.text(editor.check.empty_text),pull_put.put_zone.add(t,function(){t.after(editor.active_element.build()),pull_put.reset()}),indicator.add(t,"add",1),t};