//stop the pop or the back navigation
history.pushState(null, null, location.href);
window.onpopstate = function () {
   history.go(1);
};
