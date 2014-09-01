var ImageriumApp = ImageriumApp || {};

ImageriumApp.add_thumbnail_click_handlers = function() {
  $(".image-thumbnail").each(function(i, thumbnail){
    var id = $(this).data("id");
    
  });
};

ImageriumApp.setup = function() {
  ImageriumApp.add_thumbnail_click_handlers();
}

$(ImageriumApp.setup);
