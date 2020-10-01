<?php
  error_reporting(E_ALL); ini_set('display_errors','1');
  $control = "";
  $filePath = "drawing.json";
  if (!empty($_GET['put'])){
      $control=$_GET['put'];
    }
  $file = fopen($filePath, "w") or die("can't open file");
  fwrite($file, $control);
  fclose($file);
?>
