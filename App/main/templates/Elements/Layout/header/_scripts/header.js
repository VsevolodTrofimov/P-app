function header_build() {
  $(".header>.__breadcrumbs").removeAttr('style');
  $(".header>.__user").removeAttr('style');

  var breadcrumbs_width = $(".header>.__breadcrumbs").innerWidth();
  var user_width = $(".header>.__user-info").innerWidth();
  var max_width = Math.max(breadcrumbs_width, user_width);

  console.log('b', breadcrumbs_width, 'u', user_width, 'm', max_width);

  $(".header>.__breadcrumbs").css('width', max_width+10+"px");
  $(".header>.__user-info").css('width', max_width+10+"px");

  if(window.innerWidth < 768) {
    $(".header>.__breadcrumbs svg").slice(1).hide();
    $(".header>.__breadcrumbs svg").eq(0).click(function() {
      window.location = $(".header>.__breadcrumbs a").eq(-2).attr('href');
    });
    $(".header>.__breadcrumbs a").eq(-1).click(function() {
      window.location = $(".header>.__breadcrumbs a").eq(-2).attr('href');
    });
    $(".header>.__breadcrumbs a").hide();
    $(".header>.__breadcrumbs a").eq(-1).show();
  } else {
    $(".header>.__breadcrumbs svg").slice(1).show();
    $(".header>.__breadcrumbs a").show();
    $(".header>.__breadcrumbs svg, .header>.__breadcrumbs a").unbind('click');
  }
}

$(window).resize(function(event) {
  header_build();

  try {
    tooltip.hide();
  } catch(err) {}

  try {
    context_menu.hide();
  } catch(err) {}
});

$(document).ready(function() {
  header_build();
});
