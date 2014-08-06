<?php
session_start();
require_once(__DIR__.'/includes/processImage.php');
?>
<!DOCTYPE html>

<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Jes Sui Prest</title>
    <script src="vendor/jquery/dist/jquery.min.js" type="text/javascript">
</script>
    <script src="vendor/greensock/src/minified/TweenLite.min.js" type="text/javascript">
</script>
    <script src="vendor/greensock/src/minified/plugins/CSSPlugin.min.js" type="text/javascript">
</script>
    <script src="vendor/greensock/src/minified/utils/Draggable.min.js" type="text/javascript">
</script>
    <script src='js/UTIL.url.js' type="text/javascript">
</script>
    <script src='js/STARZ.validateform.js' type="text/javascript">
</script>
    <script src='js/STARZ.photoeditor.js' type="text/javascript">
</script>
    <script src='js/STARZ.customelements.js' type="text/javascript">
</script>
    <script src='js/STARZ.social.js' type="text/javascript">
</script>
    <link rel="stylesheet" type="text/css" href="css/css.css">
</head>

<body class="fullBackground">
    <div id="wrapper">
    <p class="center"><img src="img/text_jsp.png" alt="Je Suis Prest"></p>
        <?php if (!isset($_SESSION['newPath']) || isset($_GET['new'])) { ?>

        <div id="screenOne">
            <form method='post' action='<?php __DIR__ ?>index.php' id='imgForm' enctype='multipart/form-data'>
                <p class="center large">Select an image that shows the world you're ready for Outlander.</p>
                <p class="medium center">Tip: Choose an image that has good lighting.</p>

                <p class="center"><img src="img/button_select.png" alt="Select Image" id="pseudo_upload" class="buttonPad hotspot"></p>

                <p class="center"><img src="img/button_next.png" alt="Next" id="pseudo_submit" class="buttonPad hotspot"></p>

                <div class="hiddenDiv">
                    <input type='file' name='img_upload' id='img_upload'>
                </div>

                <div class="hiddenDiv">
                    <input type='submit' name='upload_form_submitted' id='img_upload_submit'>
                </div>

            </form>

            <p class="center medium" id="errors"></p><script type="text/javascript">
STARZ.ValidateForm.init();
            STARZ.CustomElements.screenOne();
            </script>
        </div><?php } else { ?>
<?php if (!isset($_GET['share_image'])) { ?>
        <div id="ScreenTwo">
            <p class="center"><a href="index.php?new=true"><img src="img/button_change.png" alt="Change Image" class="buttonPad hotspot"></a> <img src="img/button_save.png" alt="Save Image" id="pseudo_save" class="buttonPad hotspot"></p>

            <div id="photoEditorContainer">
                <p class="large center">Adjust your image. Click 'Save Image' when it's ready.</p>
                <p class="medium center">Tip: Make sure you cannot see any of the transparent background in the image frame.</p>

                <div id="photoEditor">
                    <div id="imgContainer" class="fixedElement" data-image="<?php echo $_SESSION['newPath'].'?'.rand(0, 100000); ?>"><img id="userImage" src=""></div>

                    <div id="frameContainer" class="fixedElement"><img src="overlays/frame_green.png" width="400" height="520" id="imageFrame"></div>
                </div>
<div id="photoUIWrapper">
                <div id="photoUI" class="uiElement">
                    <p class="center"><span class="photoUIElement hotspot" id="scaleUp"></span><span class="photoUIElement button2 hotspot" id="scaleDown"></span><span class="photoUIElement button3 hotspot" id="dragToggle"></span><span class="photoUIElement button4 hotspot" id="resetImage"></span></p>
                </div>

                <div id="colorEditor" class="uiElement">
                    <p class="center"><span class="swatch color1 hotspot" data-color="color1"></span><span class="swatch color2 hotspot" data-color="color2"></span></p>
                </div>
</div>

                <div class="hiddenDiv">
                    <button class="save center uiElement" id="img_save" class="hotspot">Save</button>
                </div>
            </div><script type="text/javascript">
STARZ.PhotoEditor.setImage();
                STARZ.CustomElements.screenTwo();
            </script>
        </div><?php } else { ?>

        <div id="screenThree">
            <p class="large center">Share your image and show the world you're ready for Outlander!</p>

            <p align="center"><img src="img/button_fb.png" alt="Next" class="buttonPad hotspot" id="shareFB"><img src="img/button_tw.png" alt="Next" class="buttonPad hotspot" id="shareTW" data-image="<?php echo $_SESSION['newPath'].'?'.rand(0, 100000); ?>"></p>

            <p align="center"><img id="finalImage" src="<?php echo $_SESSION['newPath'].'?'.rand(0, 100000); ?>" width="400" height="520"></p>

            <p align="center"><img src="img/button_createnew.png" alt="Next" class="buttonPad hotspot" id="createNew"></p>

            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

            <script>
                STARZ.CustomElements.screenThree();
                STARZ.Social.init();
                var STARZ_img =  UTIL.getPath() + '<?php echo $_SESSION['newPath'].'?'.rand(0, 100000); ?>';
            </script>

            <?php } ?><?php } ?>

        </div>
    </div>
</body>
</html>