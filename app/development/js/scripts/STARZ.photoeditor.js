(function () {
    STARZ.PhotoEditor = function () {
        // when using the smaller screen CSS settings, we need to adjust all values by whatever percent we've reduced the frame.
        // currently, the smaller screen elements are 66% of the original size, so we adjust by 1.33.
        var MOBILE_SCALE = 1.33;

        var $imageFrame,
            $frameContainer,
            $photoEditorContainer,
            domPhotoUIWrapper,
            $scaleUp,
            $scaleDown,
            $opacityButtons,
            $textButtons,
            $save,
            $confirm,
            $image,
            domImage,
            s,
            inactiveAlpha = .5,
            scale = 1,
            selectedFrame = 3,
            scaleIncrement = .1,
            dragMode = !1;

        var opacityInterval = 2,
            totalFrames = 6;

        function init() {
            // assign jquery values
            assignElements();

            // need a dom object when using event listeners
            domPhotoUIWrapper.addEventListener('navEvent', handleNavEvent);

            $confirm.hide();

            $save.click(function () {
                $frameContainer.show();
                dragMode = !1;

                // decide if we need to scale for smaller screen
                if (window.innerWidth <= 450) {
                    MOBILE_SCALE = 1.333333;
                } else {
                    // or not
                    MOBILE_SCALE = 1;
                }

                var frameOffset = $frameContainer.offset(),
                    imageOffset = $image.offset(),
                    data = {
                        left: Math.round(frameOffset.left * MOBILE_SCALE) - Math.round(imageOffset.left * MOBILE_SCALE),
                        top: Math.round(frameOffset.top * MOBILE_SCALE) - Math.round(imageOffset.top * MOBILE_SCALE),
                        width: Math.round($frameContainer.width() * MOBILE_SCALE),
                        height: Math.round($frameContainer.height() * MOBILE_SCALE)
                    };

                scale = scale * MOBILE_SCALE;

                location.href = "index.php?edit_image=true&crop_l=" + data.left + "&crop_t=" + data.top + "&crop_w=" + data.width + "&crop_h=" + data.height + "&scale=" + scale + "&template=" + selectedFrame;
            });

            setupTextColorButtons();
            setupOpacityButtons();
            setupScaleButtons();
            setupDrag();
            g();
            centerImage();

            $frameContainer.hide();
            dragMode = true;
        }

        function assignElements() {
            $imageFrame = $("#imageFrame");
            $photoEditorContainer = $("#photoEditorContainer");
            $frameContainer = $("#frameContainer");
            $scaleUp = $("#scaleUp");
            $scaleDown = $("#scaleDown");
            $textButtons = $("[data-text]");
            $opacityButtons = $('[data-opacity]');
            $save = $photoEditorContainer.find(".save");
            $confirm = $photoEditorContainer.find(".confirm");
            domPhotoUIWrapper = document.getElementById('photoUIWrapper');
        }

        function handleNavEvent(e) {
            switch (e.detail) {
                case 1:
                    dragMode = true;
                    $frameContainer.fadeTo('fast', 0, function () {
                        $frameContainer.hide();
                    });
                    break;
                case 2:
                    dragMode = false;
                    $frameContainer.fadeTo('fast', 1);
                    break;
                case 3:
                    break;
                case 4:
                    break;
            }
        }

        function centerImage() {
            domImage.onload = function () {
                var xPos, yPos;

                // handle smaller images
                if ($image.width() < $frameContainer.width()) {
                    xPos = ($frameContainer.width() - $image.width()) / 2;
                } else {
                    xPos = -1 * ($image.width() - $frameContainer.width()) / 2;
                }
                if ($image.height() < $frameContainer.height()) {
                    yPos = ($frameContainer.height() - $image.height()) / 2;
                } else {
                    yPos = -1 * ($image.height() - $frameContainer.height()) / 2;
                }

                $image.css({
                    'left': xPos + 'px',
                    'top': yPos + 'px'
                })
            };
        }

        function setupTextColorButtons() {
            $textButtons.each(function () {
                var a = $(this);
                var frameOption = a.attr("data-text");
                a.addClass(frameOption);
                a.click(function () {
                    setFrameImage(frameOption);
                })
            })
        }

        function setupOpacityButtons() {
            $opacityButtons.each(function () {
                var $this = $(this);
                var opacity = Number($this.attr('data-opacity'));

                $this.click(function () {

                    if (opacity === -1) {
                        selectedFrame -= opacityInterval;
                    } else {
                        selectedFrame += opacityInterval;
                    }

                    // if opacity is out of bounds, don't change the image
                    if (selectedFrame > totalFrames) {
                        selectedFrame -= opacityInterval;
                    } else if (selectedFrame < 1) {
                        selectedFrame += opacityInterval;
                    } else {
                        // if we're back in range, undim all the buttons
                        $opacityButtons.css('opacity', '1');
                        setFrameImage(String(selectedFrame));
                        dimOpacityButtons($this);
                    }
                })
            })
        }

        function dimOpacityButtons($this) {
            // dim the button if it's at its limit
            if ((selectedFrame === totalFrames) || (selectedFrame === totalFrames - 1))$this.css('opacity', '0.5');
            if ((selectedFrame === 1) || (selectedFrame === 2))$this.css('opacity', '0.5');
        }

        function setFrameImage(i) {
            var newFrame,
                currentFrame = $imageFrame.attr("src");

            switch (i) {
                case "1":
                    selectedFrame = 1;
                    newFrame = "overlays/frame_lightText_90.png";
                    break;
                case"2":
                    selectedFrame = 2;
                    newFrame = "overlays/frame_darkText_90.png";
                    break;
                case"3":
                    selectedFrame = 3;
                    newFrame = "overlays/frame_lightText_65.png";
                    break;
                case"4":
                    selectedFrame = 4;
                    newFrame = "overlays/frame_darkText_65.png";
                    break;
                case"5":
                    selectedFrame = 5;
                    newFrame = "overlays/frame_lightText_40.png";
                    break;
                case"6":
                    selectedFrame = 6;
                    newFrame = "overlays/frame_darkText_40.png";
                    break;
            }

            if (newFrame != currentFrame) {
                $imageFrame.fadeTo("fast", 0, function () {
                    $frameContainer.show();
                    $imageFrame.attr("src", newFrame);
                    $imageFrame.fadeTo("fast", 1);
                });
            } else {
                $frameContainer.show()
            }
        }

        function setupScaleButtons() {
            $scaleUp.click(function () {
                1 > scale ? (scale += scaleIncrement, scaleImage(scale), TweenLite.to($scaleDown, .5, {alpha: 1})) : TweenLite.to($scaleUp, .5, {alpha: inactiveAlpha})
            });
            $scaleDown.click(function () {
                scale > .2 ? (scale -= scaleIncrement, scaleImage(scale), TweenLite.to($scaleUp, .5, {alpha: 1})) : TweenLite.to($scaleDown, .5, {alpha: inactiveAlpha})
            });
            TweenLite.to($scaleUp, .5, {alpha: inactiveAlpha})
        }

        function scaleImage(scale) {
            TweenLite.to($image, .25, {scaleX: scale, scaleY: scale})
        }

        function setupDrag() {
            s = $image.css("z-index"), Draggable.create($image, {type: "x,y", onDragEnd: function () {
                $image.css("z-index", s)
            }});

            $("#dragToggle").on("click", function () {
                dragMode = !dragMode;
                dragMode ? $frameContainer.hide() : $frameContainer.show()
            })
        }

        function g() {
            var a,
                b,
                c = $image.attr("width"),
                d = $image.attr("height"),
                e = $frameContainer.width(),
                f = $frameContainer.height();
            a = d > f ? -1 * (d - f) / 2 : (f - d) / 2;
            b = c > e ? -1 * (c - e) / 2 : (e - c) / 2;
            $image.css({position: "absolute", left: b + "px", top: a + "px"})
        }

        function setImage() {
            var imgSrc = $("[data-image]").attr("data-image");
            $("#userImage").attr("src", imgSrc);
            $image = $("#imgContainer").children("img");
            domImage = document.getElementById('imgContainer').children[0];
            init();
        }

        return {
            setImage: setImage
        }
    }()
})();