var ImageriumApp = ImageriumApp || {};

ImageriumApp.selectRandomImageToDisplay = function(thumbnails) {
  var thumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
  var id = $(thumbnail).data("id");
  $("#" + id).removeClass("hidden-image").addClass("visible-image");
}

ImageriumApp.add_thumbnail_click_handlers = function(thumbnails) {
  $.each(thumbnails, function(i, thumbnail){
    var id = $(this).data("id");
  });
};

ImageriumApp.setup = function() {
  var $thumbnails = $(".image-thumbnail");
  ImageriumApp.add_thumbnail_click_handlers($thumbnails);
  ImageriumApp.selectRandomImageToDisplay($thumbnails);
}

$(ImageriumApp.setup);
