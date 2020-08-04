var preloader = $("#preloader");

$(window).on("load", function() {
    preloader.fadeOut("slow", function() {});
});