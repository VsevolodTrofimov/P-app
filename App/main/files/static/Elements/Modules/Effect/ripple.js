var ripple = (function() {
  var $ripple = $('<div id="ripple_effect"></div>');

  function reset() {
    $ripple.removeAttr('style');
    $ripple.removeClass('m--hide').removeClass('m--shown');
    $(".ripple_target").removeClass("ripple_target");
  }



  exports = {
    $: $ripple,
    show: function($element, position, css) {
      reset();
      $element.append($ripple);
      $element.addClass('ripple_target');

      var radius = Math.max($element.width(), $element.height()) * Math.PI;

      $ripple.css({
        width: radius,
        height: radius
      })

      position.left -= radius / 2
      position.top -= radius / 2

      $ripple.css(position);

      if (typeof css !== 'undefined') {
        $ripple.css(css);
      }

      $ripple.addClass('m--shown');
    },
    hide: function() {
      $ripple.addClass('m--hide');
    }
  }
  return exports;
})();


$(document).ready(function() {
  $("body").on({
    "mousedown": function(e) {
      if($(this).parents('#popup')[0]) return;
      var element_rect = this.getBoundingClientRect();
      var position = {
        left: e.clientX - element_rect.left,
        top: e.clientY - element_rect.top
      }
      ripple.show($(this), position);
    },
    "mouseup": function() {
      ripple.hide();
    },
    "mouseout": function() {
      ripple.hide();
    }
  }, "button, a.m--card .card");
});
