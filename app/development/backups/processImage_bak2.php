<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);


if (isset($_POST['upload_form_submitted'])) {

	$png = imagecreatefrompng('overlays/frame_orange.png');
    $jpg = imagecreatefromjpeg('uploads/demo.jpg');

    $container = imagecreatetruecolor(400, 520);

    // Copy and merge
    imagecopyresampled($jpg, $png, 0, 0, 0, 0, 400, 520, 400, 520);

    // Output and free from memory
    // save the image and replace the existing image
    header('Content-Type: image/jpg');
    imagejpeg($jpg);

    imagedestroy($png);
    imagedestroy($jpg);
}

?>