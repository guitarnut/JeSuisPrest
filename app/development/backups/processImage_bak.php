<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);


    /* ------------------------------------------------------------------
        HANDLE UPLOAD AND FORM DATA
    ------------------------------------------------------------------ */

if (isset($_POST['upload_form_submitted'])) {

    $randomname = uniqid();

    //Prevents malicious uploads, forces jpg extension rather than verifying it
    $newPath = 'uploads/'.$randomname.'.jpg';

    if (file_exists($newPath)) {
        // handle file duplicates... this shouldn't happen?
    } else if (!copy($_FILES['img_upload']['tmp_name'], $newPath)) {
        // handle upload/server error
    } else {
        $_SESSION['newPath'] = $newPath;
        $_SESSION['fileExt'] = '.jpg';
    }
}

    /* ------------------------------------------------------------------
        IMAGE PROCESSING
    ------------------------------------------------------------------ */

if (isset($_GET['edit_image'])) {

    // get crop dimensions and offset
    $crop_w = $_GET['crop_w'];
    $crop_h = $_GET['crop_h'];
    $crop_l = $_GET['crop_l'];
    $crop_t = $_GET['crop_t'];

    // adjust scaling
    $scale = $_GET['scale'];

    // selects PNG overlay
    $template = $_GET['template'];

	// new image size will be stored here
	$resized_img;

	// grab the saved image from the server
    $source_img = imagecreatefromjpeg($_SESSION['newPath']);

    /* ------------------------------------------------------------------
        SCALE AND CROP
    ------------------------------------------------------------------ */

    // get image dimensions
    list($width, $height) = getimagesize($_SESSION['newPath']);

    // apply the image scale if specified
	if($scale != 1) {
	    $newwidth = $width * $scale;
	    $newheight = $height * $scale;

        // create and resize the image
	    $resized_img = imagecreatetruecolor($newwidth, $newheight);
	    $suc = imagecopyresized($resized_img, $source_img, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        // reassign the resized image to the original variable
	    $source_img = $resized_img;
	}

	/* ------------------------------------------------------------------
        CREATE OVERLAY
    ------------------------------------------------------------------ */

	// create a new image container sized to the crop dimensions
	$dest_img = imagecreatetruecolor($crop_w, $crop_h);

    // put the current image in the new container, offsetting it if the user has moved it
	imagecopy($dest_img, $source_img, 0, 0, $crop_l, $crop_t, $crop_w, $crop_h);

	// create the overlay, selecting a template based on user's choice
	$overlay;

	switch($template) {
	    case 1:
	        $overlay = imagecreatefrompng("overlays/frame_green.png");
	        break;
	    case 2:
        	$overlay = imagecreatefrompng("overlays/frame_orange.png");
            break;
	}

	imagealphablending($dest_img, false);
	imagesavealpha($dest_img, true);

	// set transparancy
	imagecolortransparent($overlay, imagecolorat($overlay, 30, 30));

    /* ------------------------------------------------------------------
        MERGE IMAGES
    ------------------------------------------------------------------ */
    // merge the images
	imagecopymerge($dest_img, $overlay, 0, 0, 0, 0, $width, $height, 100);

	/* ------------------------------------------------------------------
        SAVE IMAGE
    ------------------------------------------------------------------ */

	// save the image and replace the existing image
	imagejpeg($dest_img, $_SESSION['newPath'], 100);

    // reload the ui
	header('Location: index.php?share_image=true');

	//clear memory
	imagedestroy($overlay);
	imagedestroy($dest_img);
}

?>