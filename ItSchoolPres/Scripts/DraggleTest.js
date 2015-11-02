$(document).ready(function () {
    var $draggable = $('.draggable').draggabilly();
    var p = $("p:first");
    var position = p.position();
    $("p:last").text("left: " + position.left + ", top: " + position.top);
});