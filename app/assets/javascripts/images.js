var ImageriumApp = ImageriumApp || {};

ImageriumApp.selectRandomImageToDisplay = function(thumbnails) {
  var thumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
  var imageId = $(thumbnail).data("id");
  ImageriumApp.revealImage(imageId);
}

ImageriumApp.addThumbnailClickHandlers = function(thumbnails) {
  $.each(thumbnails, function(i, thumbnail){
    var id = $(this).data("id");
  });
};

ImageriumApp.addArrowClickHandler = function(arrowClass) {
  $(arrowClass).click(function() {
    var imageId = $(this).data("id");
    console.log(imageId);
    ImageriumApp.changeImage(imageId);

  });
};

ImageriumApp.revealImage = function(imageId) {
  var imageWrapper = $("#" + imageId).parent();
  var imageViewWrapper = imageWrapper.parent();
  imageViewWrapper.removeClass("hidden-image").addClass("visible-image");
};

ImageriumApp.hideImage = function() {
  $(".visible-image").removeClass("visible-image").addClass("hidden-image");
};

ImageriumApp.changeImage = function(imageId) {
  ImageriumApp.hideImage();
};

ImageriumApp.setup = function() {
  var $thumbnails = $(".image-thumbnail");
  ImageriumApp.addThumbnailClickHandlers($thumbnails);
  ImageriumApp.selectRandomImageToDisplay($thumbnails);
  ImageriumApp.addArrowClickHandler(".direction-arrow-prev");
  ImageriumApp.addArrowClickHandler(".direction-arrow-next");
};

$(ImageriumApp.setup);
