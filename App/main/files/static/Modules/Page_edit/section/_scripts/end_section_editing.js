section_editor.end_section_editing=function(e,t){var i=e.children(section_editor.item_selector);i.each(function(e,t){$(this).removeAttr("tip")}),e.find(section_editor.heading_selector).removeClass("m--editing").attr("contenteditable","false"),e.find(".m--button-delete").remove(),!section_editor.replace||defined(t)&&t||i.replaceTag(section_editor.items_old_tag,!0)};