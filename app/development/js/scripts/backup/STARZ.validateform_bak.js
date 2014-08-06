(function () {
    STARZ.ValidateForm = function () {

        var errorList, uploadData, $errors, $imgForm, $upload, $submit, $loading, filesize = 0, maxFilesize = 3500000, OVERLAY_ALPHA = 0.7;

        function init() {
            $errors = $errors || $("#errors");
            $imgForm = $imgForm || $("#imgForm");
            $upload = $upload || $("#img_upload");
            $submit = $submit || $("#img_upload_submit");
            $loading = $loading || $('#loading');

            $upload.bind("change", function () {
                filesize = this.files[0].size;

                // submit the form when they select an image
                $submit.click();

                // show loading interstitial
                $loading.fadeTo('fast', OVERLAY_ALPHA);
            });

            $imgForm.on('submit', function(e) {
                errorList = [];
                uploadData = $upload.val();

                if(validate()) {
                    $imgForm.submit();
                } else {
                    e.preventDefault();
                    error();
                }
            })
        }

        function validate() {
            var valid = true;

            if(!checkUpload(uploadData)) {
                errorList.push("<p>You must select a JPEG file.</p>");
                valid = false;
            }

            if(filesize > maxFilesize) {
                errorList.push("<p>Your image must be 3MB or smaller</p>");
                valid = false;
            }

            return valid;
        }

        function error() {
            if ((uploadData = null) || (errorList.length > 0)) {
                for (var a = 0; a < errorList.length; a++)$(errorList[a]).appendTo($errors);
                STARZ.CustomElements.screenOne();

                $loading.fadeTo('fast', 0, function() {
                    $loading.hide();
                });
            }
        }

        function checkUpload(file) {
            file = file.toLowerCase();
            return (/\.(jpg|jpeg)$/i).test(file);
        }

        function clearErrors() {
            $errors.empty();
        }

        return {
            init: init,
            clearErrors: clearErrors
        }
    }();
})();
