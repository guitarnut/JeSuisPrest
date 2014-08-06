(function () {
    STARZ.CustomElements = function () {
        var OVERLAY_ALPHA = 0.8;
        var $upload, $submit, $uploadButton, $save, $saveButton, $moveIcon, $userImage, $loading, $loadingIcon, $replay, $loadTween;

        // setup listeners
        window.onresize = function () {
            adjustFullscreenElements();
        };

        function adjustFullscreenElements() {
            $loading.css({'height': window.innerHeight + 'px'});
        }

        function screenOne() {
            $upload = $upload || $("#img_upload");
            $submit = $submit || $("#img_upload_submit");
            $uploadButton = $uploadButton || $("#pseudo_upload");
            $loading = $loading || $('#loading');

            adjustFullscreenElements();

            $uploadButton.show();
            $uploadButton.fadeTo("fast", 1);
            $uploadButton.unbind("click");

            $uploadButton.click(function () {
                STARZ.ValidateForm.clearErrors();
                $upload.click();
            });
        }

        function screenTwo() {
            $moveIcon = $moveIcon || $('#moveIcon');
            $userImage = $userImage || $('#userImage');
            $save = $save || $("#img_save");
            $saveButton = $saveButton || $("#pseudo_save");
            $saveButton.unbind("click");
            $loading = $loading || $('#loading');

            adjustFullscreenElements();

            // show loading interstitial
            $loading.fadeTo('fast', OVERLAY_ALPHA);

            // don't do anything until the uploaded image shows
            $userImage.load(function () {
                // demo image moving feature
                $moveIcon.fadeTo('fast', 1);

                $loading.fadeTo('fast', 0, function() {
                    $loading.hide();
                });

                setTimeout(function () {
                    var position = $userImage.position();
                    $userImage.animate({left: position.left - 50 + 'px', top: position.left - 50 + 'px'}, 1000).animate({left: position.left + 'px', top: position.top + 'px'}, 1000);

                    var position2 = $moveIcon.position();
                    $moveIcon.animate({left: position2.left - 50 + 'px', top: position2.left - 50 + 'px'}, 1000).animate({left: position2.left + 'px', top: position2.top + 'px'}, 1000, function () {
                        $moveIcon.fadeTo('show', 0, function () {
                            $(this).hide();
                        });
                    });
                }, 1000);
            });

            $saveButton.click(function () {
                $save.click()
            })
        }

        function screenThree() {
            $loading = $loading || $('#loading');
            $replay = $replay || $('#createNew');

            $replay.click(function () {
                window.open(UTIL.getPath() + 'index.php?new=true', '_parent');
            })
        }

        return {
            screenOne: screenOne,
            screenTwo: screenTwo,
            screenThree: screenThree
        }
    }();

})();