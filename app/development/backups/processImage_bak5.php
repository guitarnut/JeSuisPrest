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
    $uploaded_image = imagecreatefromjpeg($_SESSION['newPath']);;

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
        adjustUserUpload($newPath);

        $_SESSION['complete'] = false;
        $_SESSION['newPath'] = $newPath;
        $_SESSION['fileExt'] = '.jpg';
    }
}

function adjustUserUpload($image_path) {
    // create starting image
    $image = imagecreatefromjpeg($image_path);

    // check for image rotation
    $exif = exif_read_data($image_path);
    $exif_orient = isset($exif['Orientation'])?$exif['Orientation']:0;
    $rotateImage = 0;

    if (6 == $exif_orient) {
        $rotateImage = -90;
        $imageOrientation = 1;
    } elseif (3 == $exif_orient) {
        $rotateImage = 180;
        $imageOrientation = 1;
    } elseif (8 == $exif_orient) {
        $rotateImage = 90;
        $imageOrientation = 1;
    }

    //print_r($exif);

    // create a new rotated image file
    if($rotateImage) {
        //print_r('Rotating');
        $rotate = imagerotate($image, $rotateImage, 0);
        imagejpeg($rotate, $image_path);
    } else {
        //print_r('Not rotating');
        imagejpeg($image, $image_path, 100);
    }
}

function cropAndResize($source, $scale, $crop_w, $crop_h, $crop_l, $crop_t) {
    $source_img = $source;

    // get image dimensions
    $width = imagesx($source_img);
    $height = imagesy($source_img);

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
    $path;

    switch($template) {
	    case 1:
	        $path = "overlays/frame_lightText.png";
	        break;
	    case 2:
        	$path = "overlays/frame_darkText.png";
            break;
	}

    $overlay = imagecreatefrompng($path);

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