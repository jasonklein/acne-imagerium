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

ImageriumApp.makeAllImagesVisibleIfMobile = function() {
  if(window.innerWidth <= 640) {
    ImageriumApp.setImagesContainerWidth();
    $(".hidden-image").removeClass("hidden-image").addClass("visible-image");
    ImageriumApp.addSwipeToImages();
  };
};

ImageriumApp.setImagesContainerWidth = function() {
  var imagesCount = $(".image-view-wrapper").length;
  $("#images-container").css("width", window.innerWidth * imagesCount);
  $(".image-view-wrapper").css("width", window.innerWidth + "px");
  $(".full-image").css("width", window.innerWidth + "px");
};

ImageriumApp.addSwipeToImages = function() {
  var imageWidth = window.innerWidth
  var currentImage = 0;
  var maxImages = $(".image-view-wrapper").length;
  var speed = 500;

  var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 50
  };

  $(function () {
    imagesContainer = $("#images-container");
    imagesContainer.swipe(swipeOptions);
  });

  function swipeStatus(event, phase, direction, distance) {
    if (phase == "move" && (direction == "left" || direction == "right")) {
      var duration = 0;

      if (direction == "left") {
          scrollImages((imageWidth * currentImage) + distance, duration);
      } else if (direction == "right") {
          scrollImages((imageWidth * currentImage) - distance, duration);
      }
    } else if (phase == "cancel") {
      scrollImages(imageWidth * currentImage, speed);
    } else if (phase == "end") {
      if (direction == "right") {
          previousImage();
      } else if (direction == "left") {
          nextImage();
      }
    }
  }

  function previousImage() {
    currentImage = Math.max(currentImage - 1, 0);
    scrollImages(imageWidth * currentImage, speed);
  }

  function nextImage() {
    currentImage = Math.min(currentImage + 1, maxImages - 1);
    scrollImages(imageWidth * currentImage, speed);
  }

  function scrollImages(distance, duration) {
    imagesContainer.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    imagesContainer.css("transform", "translate(" + value + "px,0)");
  }
}

ImageriumApp.setup = function() {
  var $thumbnails = $(".image-thumbnail");
  ImageriumApp.setThumbnailsContainerWidth($thumbnails);
  ImageriumApp.addThumbnailClickHandlers($thumbnails);
  ImageriumApp.selectRandomImageToDisplay($thumbnails);
  ImageriumApp.addArrowClickHandler(".direction-arrow-prev");
  ImageriumApp.addArrowClickHandler(".direction-arrow-next");
  ImageriumApp.addSwipeToThumbnails($thumbnails);
  ImageriumApp.makeAllImagesVisibleIfMobile();
  $(window).resize(ImageriumApp.makeAllImagesVisibleIfMobile);
};

$(ImageriumApp.setup);
