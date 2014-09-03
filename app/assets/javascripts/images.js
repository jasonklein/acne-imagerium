var ImageriumApp = ImageriumApp || {};

ImageriumApp.selectRandomImageToDisplay = function(thumbnails) {
  var thumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
  var imageId = $(thumbnail).data("id");
  ImageriumApp.revealImage(imageId);
}

ImageriumApp.addThumbnailClickHandlers = function(thumbnails) {
  $.each(thumbnails, function(i, thumbnail){
    var imageId = $(this).data("id");
    $(this).click(function() {
      ImageriumApp.changeImage(imageId);
    });
  });
};

ImageriumApp.addArrowClickHandler = function(arrowClass) {
  $(arrowClass).click(function() {
    var imageId = $(this).data("id");
    ImageriumApp.changeImage(imageId);
  });
};

ImageriumApp.revealImage = function(imageId) {
  var imageWrapper = $("#" + imageId).parent();
  var imageViewWrapper = imageWrapper.parent();
  imageViewWrapper.removeClass("hidden-image").addClass("visible-image");
  var thumbnail = $("#" + imageId + "-thumb");
  thumbnail.removeClass("unselected-image-opacity").addClass("selected-image-opacity");
  ImageriumApp.setImageViewWrapperWidth(imageViewWrapper);
};

ImageriumApp.setImageViewWrapperWidth = function(imageViewWrapper) {
  if(window.innerWidth <= 640) {
    imageViewWrapper.css("width", window.innerWidth + "px");
  };
};

ImageriumApp.hideImage = function() {
  $(".visible-image").removeClass("visible-image").addClass("hidden-image");
  $(".selected-image-opacity").removeClass("selected-image-opacity").addClass("unselected-image-opacity");
};

ImageriumApp.changeImage = function(imageId) {
  ImageriumApp.hideImage();
  ImageriumApp.revealImage(imageId);
};

ImageriumApp.addSwipeToThumbnails = function(thumbnails) {
  if(window.innerWidth > 640) {
    var thumbnailWidth = 120 * 5;
  } else {
    var thumbnailWidth = 80 * 3;
  }
  var currentThumbnail = 0;
  var maxImages = thumbnails.length;
  var speed = 500;

  var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 50
  };

  $(function () {
    thumbnailsContainer = $("#thumbnails-container");
    thumbnailsContainer.swipe(swipeOptions);
  });

  function swipeStatus(event, phase, direction, distance) {
    if (phase == "move" && (direction == "left" || direction == "right")) {
      var duration = 0;

      if (direction == "left") {
          scrollImages((thumbnailWidth * currentThumbnail) + distance, duration);
      } else if (direction == "right") {
          scrollImages((thumbnailWidth * currentThumbnail) - distance, duration);
      }
    } else if (phase == "cancel") {
      scrollImages(thumbnailWidth * currentThumbnail, speed);
    } else if (phase == "end") {
      if (direction == "right") {
          previousImage();
      } else if (direction == "left") {
          nextImage();
      }
    }
  }

  function previousImage() {
    currentThumbnail = Math.max(currentThumbnail - 1, 0);
    scrollImages(thumbnailWidth * currentThumbnail, speed);
  }

  function nextImage() {
    currentThumbnail = Math.min(currentThumbnail + 1, maxImages - 1);
    scrollImages(thumbnailWidth * currentThumbnail, speed);
  }

  function scrollImages(distance, duration) {
    thumbnailsContainer.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    thumbnailsContainer.css("transform", "translate(" + value + "px,0)");
  }
}

ImageriumApp.setThumbnailsContainerWidth = function(thumbnails) {
  $("#thumbnails-container").css("width", function() {
    if(window.innerWidth > 640) {
      return thumbnails.length * 120 + "px";
    } else {
      return thumbnails.length * 80 + "px";
    }
  });
};

ImageriumApp.setup = function() {
  var $thumbnails = $(".image-thumbnail");
  ImageriumApp.setThumbnailsContainerWidth($thumbnails);
  ImageriumApp.addThumbnailClickHandlers($thumbnails);
  ImageriumApp.selectRandomImageToDisplay($thumbnails);
  ImageriumApp.addArrowClickHandler(".direction-arrow-prev");
  ImageriumApp.addArrowClickHandler(".direction-arrow-next");
  ImageriumApp.addSwipeToThumbnails($thumbnails);
};

$(ImageriumApp.setup);
