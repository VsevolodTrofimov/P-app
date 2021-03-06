var Search = function(requester,
  types, types_names, types_active,
  ui,
  templates, builders) {
  var ui = ui || "Elements/Modules/UI/search/exports.html";

  //building
  this.$ = $(loads[ui]);

  this.url = window.location.pathname;
  this.is_shown = false;

  this.show = function() {
      this.$.removeClass('m--hidden');
      this.$.find('input').focus();
      this.is_shown = true;
  }
  this.hide = function() {
      this.$.addClass('m--hidden');
      this.is_shown = false;
  }

  this.types = types;
  this.types_active = types_active;
  var self = this;
  this.request = function() {
    requester(this)
      .success(function(data) {
        self.fill(data);
      })
      .fail(function() {
        notification.show('error', 'Не удалось подключиться к поиску')
      });
  }

  this.fill = function(data) {
    Search._.fill(this, data);
  }

  this.filter = function() {
    Search._.filter(this);
  }

  //adding templates
  this.templates = $.extend({}, Search._.templates);
  for(var key in templates) {
    this.templates[key] = templates[key];
  }

  //enabling builders
  this.build = $.extend({}, Search._.build);
  for(var key in builders) {
    this.build[key] = builders[key];
  }

  //building filters
  for(var i = 0; i < types.length; i++) {
    var $new_checkbox = $(loads.get('Elements/Inputs/checkbox/'));
    $new_checkbox.find('input').addClass('filter-'+types[i]);
    $new_checkbox.find('label').text(types_names[i]);

    this.$.find('.__filters').append($new_checkbox);
  }

  //enabling UI in DOM
  $('body').append(this.$);

  Search._.enable_query_listener(this);
  Search._.enable_checkbox_listener(this);
}

Search._ = {};
