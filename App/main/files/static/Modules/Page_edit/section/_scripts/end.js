edit.end=function(){section_editor.block_editing(),section_editor.edit_end(),section_editor.$parent.find(section_editor.section_selector).each(function(e,i){section_editor.end_section_editing($(this))}),section_editor._save_callback()};