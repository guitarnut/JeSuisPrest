<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

/* Handle initial upload */
if (isset($_POST['upload_form_submitted'])) {
    uploadImage();
}

/* Process final image */
if (isset($_GET['edit_image'])) {
    $uploaded_image = imagecreatefromjpeg($_SESSION['newPath']);

    // check for image rotation, certain devices send a rotated image
    $uploaded_image = imagerotate($uploaded_image, array_values([0, 0, 0, 180, 0, 0, -90, 0, 90])[@exif_read_data($filename)['Orientation'] ?: 0], 0);

    // create the new image
    $dest_img = cropAndResize($uploaded_image, $_GET['scale'], $_GET['crop_w'], $_GET['crop_h'], $_GET['crop_l'], $_GET['crop_t']);

    // create the overlay, selecting a template based on user's choice
    $overlay = selectOverlayImage($_GET['template']);
    mergeImages($dest_img, $overlay);

    // wrap up
    saveImg($dest_img);
    complete();
}

/* --------------------------------------- */
/* Functions */
/* --------------------------------------- */

function handleError() {
    session_unset();
    header('Location: error.php');
}

function generateTempImgName() {
    return 'uploads/'.uniqid().'.jpg';
}

function uploadImage() {
    //Prevents malicious uploads, forces jpg extension rather than verifying it
    $newPath = generateTempImgName();

    if (file_exists($newPath)) {
        // handle file duplicates... odds of this are low
        uploadImage();
    } else if (!copy($_FILES['img_upload']['tmp_name'], $newPath)) {
        // handle image save error
        handleError();
    } else {
        $_SESSION['complete'] = false;
        $_SESSION['newPath'] = $newPath;
        $_SESSION['fileExt'] = '.jpg';
    }
}

function adjustRotation() {
    $exif = exif_read_data($_SESSION['newPath']);
    $angle = 0;

    if (!empty($exif['Orientation'])) {

        switch ($exif['Orientation']) {
            case 3:
                $angle = 180 ;
                break;
            case 6:
                $angle = -90;
                break;
            case 8:
                $angle = 90;
                break;
            default:
                $angle = 0;
                break;
        }
    }

    $source = imagecreatefromjpeg($_SESSION['newPath']);
    $source = imagerotate($source, $angle, 0);

    return $source;
}

function cropAndResize($source, $scale, $crop_w, $crop_h, $crop_l, $crop_t) {
    $source_img = $source;

    // get image dimensions
    $width = imagesx($source_img);
    $width = imagesy($source_img);
    //list($height, $height) = getimagesize($source);

    // apply the image scale if specified
    if($scale != 1) {
        $newwidth = $width * $scale;
        $newheight = $height * $scale;

        // create and resize the image
        $resized_img = imagecreatetruecolor($newwidth, $newheight);
        $tempVar = imagecopyresized($resized_img, $source_img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        // reassign the resized image to the original variable
        $source_img = $resized_img;
    }

    // create a new image container sized to the crop dimensions
    $dest_img = imagecreatetruecolor($crop_w, $crop_h);

    // put the current image in the new container, offsetting it if the user has moved it
    imagecopy($dest_img, $source_img, 0, 0, $crop_l, $crop_t, $crop_w, $crop_h);

    return $dest_img;
}

function selectOverlayImage($template) {

    switch($template) {
	    case 1:
	        $overlay = imagecreatefrompng("overlays/frame_green.png");
	        break;
	    case 2:
        	$overlay = imagecreatefrompng("overlays/frame_orange.png");
            break;
        case 3:
            $overlay = imagecreatefrompng("overlays/frame_purple.png");
            break;
        case 4:
            $overlay = imagecreatefrompng("overlays/frame_blue.png");
            break;
	}

	return $overlay;
}

function mergeImages($img, $imgOverlay) {
    $IMG_WIDTH = 400;
    $IMG_HEIGHT = 520;
    imagecopyresampled($img, $imgOverlay, 0, 0, 0, 0, $IMG_WIDTH, $IMG_HEIGHT, $IMG_WIDTH, $IMG_HEIGHT);
}

function saveImg($img) {
    // save the image and replace the existing image
    imagejpeg($img, $_SESSION['newPath'], 100);
}

function complete() {
    // reload the ui
	header('Location: index.php');
	$_SESSION['complete'] = true;

	//clear memory
	imagedestroy($overlay);
	imagedestroy($dest_img);
}

?>