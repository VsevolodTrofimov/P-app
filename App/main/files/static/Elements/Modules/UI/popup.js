var popup = (function() {
  $popup = $(loads.get('Elements/Modules/UI/popup/exports.html'));
  exports = {
    $: $popup,
    show: function(content, _callback, css, no_prefocus) {
      $popup.find(".__content").children().remove();
      $popup.find(".__content").append(content);
      $popup.removeClass('m--hidden');
      $popup.removeClass('m--hiding');

      $popup.find(".m--select").each(function(index, el) {
        add_menu_caller(this);
      });

      $popup.find(".m--sectioned").each(function(index, el) {
        add_menu_caller_sectioned(this);
      });


      if (css) {
        $popup.find('.__modal').css(css);
      }

      //added post factum
      if( ! no_prefocus) {
        $popup.find("input").first().focus();
      }

      if (typeof tooltip !== 'undefined') {
        tooltip.hide();
      }

      if (_callback) {
        _callback();
      }
    },
    hide: function() {
      $popup.removeAttr('style');
      $popup.addClass('m--hiding');
      $popup.find('__modal').removeAttr('style');

      if (typeof tooltip !== 'undefined') {
        tooltip.hide();
      }
      if (typeof context_menu !== 'undefined') {
        context_menu.hide()
      }

      setTimeout(function() {
        $popup.addClass('m--hidden');
        $popup.find(".__content").html('');

      }, 300);
    }
  }
  return exports;
})();

$(document).ready(function() {
  $('body').append(popup.$)
  popup.$.find('.__close').click(function(e) {
    popup.hide();
  });
});
