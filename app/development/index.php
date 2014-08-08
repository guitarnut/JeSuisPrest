<?php
  session_start();
  require_once(__DIR__.'/includes/processImage.php');
?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="initial-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Je Suis Prest </title>
    <script src="vendor/jquery/dist/jquery.min.js"></script>
    <script src="vendor/greensock/src/minified/TweenLite.min.js"></script>
    <script src="vendor/greensock/src/minified/plugins/CSSPlugin.min.js"></script>
    <script src="vendor/greensock/src/minified/utils/Draggable.min.js"></script>
    <script src="vendor/svgeezy/svgeezy.min.js"></script>
    <script src="js/JSP.js"></script>
    <link rel="stylesheet" type="text/css" href="css/css.css">
  </head>
  <body class="fullBackground">
    <div id="wrapper">
      <p class="center"><img id="jspHeader" src="img/text_jsp.svg" alt="Je Suis Prest"></p>
      <p class="prompt center medium">Please rotate your device or expand your browser.<br><img src="img/rotate_icon.svg" alt="Rotate Device" width="220" height="210"></p>
      <div id="loading" class="fixedElement"><img src="img/loadIcon.gif" width="100" height="100" class="centerElement"></div><?php if ($_SESSION['step'] == 1 || isset($_GET['new'])) { ?>
      <div id="screenOne">
        <form method="POST" action="index.php" id="imgForm" enctype="multipart/form-data">
          <p class="center large">Select an image that shows the world you're ready for Outlander.</p>
          <p class="center"><img id="pseudo_upload" src="img/ui_selectimage.svg" alt="Select Image" class="UIelementLarge hotspot"></p>
          <p align="center"><input id="img_upload" type="file" name="img_upload"></p>
          <p align="center"><input id="img_upload_submit" type="submit" name="upload_form_submitted" value="Upload Image"></p>
        </form>
        <p id="errors" class="center medium"></p>
        <div id="legal">
          <p class="center small">&copy; 2014 Starz Entertainment, LLC. Outlander &copy; 2014 Sony Pictures Television Inc. All Rights Reserved.<br><a href="terms.php">Terms of Submission</a></p>
        </div>
        <script type="text/javascript">
          STARZ.ValidateForm.init();
          STARZ.CustomElements.screenOne();
        </script>
      </div><?php } ?>
      <?php if ($_SESSION['step'] == 2 && !isset($_GET['new'])) { ?>
      <div id="screenTwo">
        <div id="photoUIWrapper">
          <div id="stepWrapper" ui-stepwrapper>
            <div id="step1" ui-step class="step">
              <p class="center">Move and zoom the image.</p>
              <p class="center"><a href="index.php?new=true"><img src="img/ui_prev.svg" alt="" class="UIelement prev hotspot"></a><img id="scaleUp" src="img/ui_enlarge.svg" alt="" class="UIelement hotspot button1"><img id="scaleDown" src="img/ui_reduce.svg" alt="" class="UIelement hotspot button2"><img src="img/ui_next.svg" alt="" ui-next class="UIelement next hotspot"></p>
            </div>
            <div id="step2" ui-step class="step">
              <p class="center">Chose light or dark text.</p>
              <p class="center"><img src="img/ui_prev.svg" alt="" ui-prev class="UIelement prev hotspot"><img src="img/ui_lighttext.svg" alt="" data-text="3" class="UIelement textLight hotspot"><img src="img/ui_darktext.svg" alt="" data-text="4" class="UIelement textDark hotspot"><img src="img/ui_next.svg" alt="" ui-next class="UIelement next hotspot"></p>
            </div>
            <div id="step3" ui-step class="step">
              <p class="center">Adjust the text transparancy.</p>
              <p class="center"><img src="img/ui_prev.svg" alt="" ui-prev class="UIelement prev hotspot"><img src="img/ui_opacityup.svg" alt="" data-opacity="1" class="UIelement opacityDark hotspot"><img src="img/ui_opacitydown.svg" alt="" data-opacity="-1" class="UIelement opacityLight hotspot"><img src="img/ui_next.svg" alt="" ui-next class="UIelement next hotspot"></p>
            </div>
            <div id="step4" ui-step class="step">
              <p class="center">If everything looks good, click 'Save'.</p>
              <p class="center"><img src="img/ui_prev.svg" alt="" ui-prev class="UIelement prev hotspot"><img id="pseudo_save" src="img/ui_save.svg" alt="Save Image" class="UIelement hotspot"></p>
            </div>
          </div>
        </div>
        <div id="photoEditorContainer">
          <div id="photoEditor" class="photoSize">
            <div id="imgContainer" data-image="<?php echo $_SESSION['newPath'].'?'.rand(0, 100000); ?>" class="photoSize absoluteElement"><img id="userImage" src=""></div>
            <div id="frameContainer" class="absoluteElement"><img id="imageFrame" src="overlays/frame_lightText_65.png" class="photoSize"></div>
            <div id="moveIcon"><img src="img/icon_moveimage.svg"></div>
          </div>
          <div class="hiddenDiv">
            <button id="img_save" class="save center uiElement">Save</button>
          </div>
        </div>
        <script type="text/javascript">
          STARZ.PhotoEditor.setImage();
          STARZ.CustomElements.screenTwo();
          UI.StepNav.init('#photoUIWrapper');
        </script>
      </div><?php } ?>
      <?php if ($_SESSION['step'] == 3 && !isset($_GET['new'])) { ?>
      <div id="screenThree">
        <p class="center large">Share your image and show the world you're ready for Outlander!</p>
        <p class="center"><img id="shareFB" src="img/ui_facebook.svg" alt="Share on Facebook" height="64" width="64" data-image="<?php echo $_SESSION['imgPath'].'?'.rand(0, 100000); ?>" class="UIelement hotspot"><img id="shareTW" src="img/ui_twitter.svg" alt="Share on Twitter" height="64" width="64" data-image="<?php echo $_SESSION['imgPath'].'?'.rand(0, 100000); ?>" class="UIelement hotspot"><img id="createNew" src="img/ui_replay.svg" alt="New Image" height="64" width="220" class="UIelement hotspot"></p>
        <p class="center"><img id="finalImage" src="<?php echo $_SESSION['imgPath'].'?'.rand(0, 100000); ?>" alt="Je Suis Prest" class="photoSize"></p>
        <script type="text/javascript">
          !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
          STARZ.CustomElements.screenThree();
          STARZ.Social.init();
          var STARZ_img =  "<?php echo $_SESSION['imgPath'].'?'.rand(0, 100000); ?>";
        </script>
      </div><?php } ?>
    </div>
  </body>
</html>