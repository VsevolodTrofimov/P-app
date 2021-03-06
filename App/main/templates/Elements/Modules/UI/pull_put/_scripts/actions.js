$(document).ready(function() {
  $("body").append(pull_put.ui.$)

  $(".pull_put_ui .__actions .m--cancel").click(function(event) {
    pull_put.pre_actions.cancel();

    //restoring defaut element
    pull_put.ui.element = pull_put.ui.proto_element;

    pull_put.ui.element.removeClass('m--pullable');
    pull_put.ui.element.removeClass('m--put-zone');

    pull_put.puller.cancel();
  });

  $(".pull_put_ui .__actions .m--save").click(function(event) {
    pull_put.pre_actions.save();

    pull_put.puller.cancel();
  });

  $(".pull_put_ui .__actions .m--delete").click(function(event) {
    pull_put.pre_actions.delete();

    pull_put.ui.element = $("");
    pull_put.reset();
  });

  $(".pull_put_ui .__actions .m--add").click(function(event) {
    pull_put.pre_actions.add();

    pull_put.actions.add();
    pull_put.reset();
  });
});
