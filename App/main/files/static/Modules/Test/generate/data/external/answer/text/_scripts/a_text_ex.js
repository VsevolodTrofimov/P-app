generate.register.external("answer","text",{get_value:function(e){return e.find("input").val()},get_summary:function(e){return e||(e=""),e.length>20?(e=e.substring(0,17).escape(),e+="&hellip;"):e=e.escape(),e},to_answer:function(e,n,t){function r(e){t.answer=e;var n=i.element.build(t);return n.find("input").attr("disabled","disabled"),n}var i=this.self;return{user:r(e),right:r(n)}},observer:function(e,n){var t,r=1e3;e.keydown(function(){clearTimeout(t),t=setTimeout(function(){e.find(".__value").val();n()},r)})}});