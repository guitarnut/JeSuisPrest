(function () {
    STARZ.ValidateForm = function () {

        var errorList, uploadData, $pseudoUpload, $errors, $imgForm, $upload, $submit, $loading, filesize = 0, maxFilesize = 3500000, OVERLAY_ALPHA = 0.7, ieWorkaround = false;

        function init() {
            $errors = $errors || $("#errors");
            $imgForm = $imgForm || $("#imgForm");
            $upload = $upload || $("#img_upload");
            $submit = $submit || $("#img_upload_submit");
            $loading = $loading || $('#loading');
            $pseudoUpload = $pseudoUpload || $('#pseudo_upload');

            // click() is blocked in IE 9 and 10.  work around here...
            if (navigator.appName.indexOf("Internet Explorer") != -1) {
                ieWorkaround = (
                    navigator.appVersion.indexOf("MSIE 9") > -1
                    || navigator.appVersion.indexOf("MSIE 10") > -1
                    );
            }

            // handle UI display based on browser
            if(!ieWorkaround) {
                $upload.css('display', 'none');
                $submit.css('display', 'none');
            } else {
                $pseudoUpload.parent('p').hide();
            }

            // handle upload proxy button
            if (!ieWorkaround) {
                $upload.bind("change", function () {
                    filesize = this.files[0].size;
                    // submit the form when they select an image
                    $submit.click();
                });
            }

            // handle form submit based on browser
            if (!ieWorkaround) {
                $imgForm.on('submit', function (e) {
                    $loading.fadeTo('fast', OVERLAY_ALPHA);

                    errorList = [];
                    uploadData = $upload.val();

                    if (validate()) {
                        return true;
                    } else {
                        e.preventDefault();
                        error();
                    }
                })
            } else {
                $imgForm.on('submit', function () {
                    $loading.fadeTo('fast', OVERLAY_ALPHA);
                    return true;
                })
            }
        }

        function validate() {
            var valid = true;

            if (!checkUpload(uploadData)) {
                errorList.push("<p>You must select a JPEG file.</p>");
                valid = false;
            }

            if (filesize > maxFilesize) {
                errorList.push("<p>Your image must be 3MB or smaller</p>");
                valid = false;
            }

            return valid;
        }

        function error() {
            if ((uploadData = null) || (errorList.length > 0)) {
                for (var a = 0; a < errorList.length; a++)$(errorList[a]).appendTo($errors);
                STARZ.CustomElements.screenOne();

                $loading.fadeTo('fast', 0, function () {
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