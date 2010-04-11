<?php
 
$logFile = 'out.d/data';
// $post is string
$post = $_POST['entry'];

//$et = json_decode(stripslashes($_POST['entry']), true);
//$res = json_decode($_POST['entry'],true);
//error_log("result: ".$_POST['entry'].", res=".json_encode($et), 3, $logFile);

//error_log(str_replace(array('[',']','"'),array('','',''),json_encode($et)), 3, $logFile);
error_log($post, 3, $logFile);

//error_log(", sales1_lastname: ".$res['sales'][1]['lastname'], 3, $logFile);
error_log("\n", 3, $logFile);
 
//echo $_POST['entry'];
echo stripslashes($_POST['entry']);
//header("Content-type: text/plain");
//echo json_encode($res);
//*
echo '<pre>';
//print_r($post);
var_dump($post);
//print_r($et);
//var_dump($et);  
echo '</pre>';
//*/
?>

<?php
// increase count
$fn = 'out.d/count';
if (file_exists($fn)){
  $file = fopen($fn, r);
  $counter = fread($file, filesize($fn));
  fclose($file);
  
  $file = fopen($fn, w);
  fwrite($file, $counter+1);
  fclose($file);
}else{
  $file = fopen($fn, w);
  fwrite($file, '1');
}
?>
