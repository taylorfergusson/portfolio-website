var perspective = 1000;
var x, y, rX, rY;

(function($) {
  var card = $(".warp");

  card.on("mousemove", function(e) {
    x = e.clientX - $(this).offset().left + $(window).scrollLeft();
    y = e.clientY - $(this).offset().top + $(window).scrollTop();

    rY = map(x, 0, $(this).width(), -20, 20);
    rX = map(y, 0, $(this).height(), -20, 20);

    $(this).css(
      "transform",
      "perspective(" + perspective + "px)" + " " + "rotateY(" + rY + "deg)" + " " + "rotateX(" + -rX + "deg)" + "scale(1.1)"
    );
  });

  card.on("scroll", function() {
    console.log("Event Fired");
  });

  card.on("mouseenter", function() {
    $(this).css({
      transition: "all " + 0.1 + "s" + " linear"
    });
  });

  card.on("mouseleave", function() {
    $(this).css({
      transition: "all " + 0.2 + "s" + " linear"
    });

    $(this).css(
      "transform",
      "rotateY(" + 0 + "deg)" + " " + "rotateX(" + 0 + "deg)"
    );
  });

  function map(x, in_min, in_max, out_min, out_max) {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }
})(jQuery);