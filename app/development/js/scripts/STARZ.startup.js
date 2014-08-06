// namespace
var STARZ = STARZ || {};
var UTIL = UTIL || {};
var UI = UI || {};

// svg image fallback
//svgeezy.init('nosvg', 'png');

// preload overlays
(function () {
    var imageArray = ["overlays/frame_lightText_40.png", "overlays/frame_lightText_65.png", "overlays/frame_lightText_90.png", "overlays/frame_darkText_40.png", "overlays/frame_darkText_65.png", "overlays/frame_darkText_90.png"];

    for (var i = 0; i < imageArray.length; i++) {
        var tempImage = new Image();
        tempImage.src = imageArray[i];
    }
})();