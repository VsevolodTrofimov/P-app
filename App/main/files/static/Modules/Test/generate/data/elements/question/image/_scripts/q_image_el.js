generate.register.element("question","image",{show_in_items:!0,builder:function(e){var t=this.make_template(e),a=$(document.createElement("img"));return a.attr("src",e.url||e.href),a.css("max-width","100%"),t.css({display:"flex","align-items":"center","justify-content":"center"}),t.append(a),t},sample:{value:{url:"/media/samples/image.jpg"}}});