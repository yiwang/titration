<?php
 
$logFile = 'out.d/email';
$et = json_decode(stripslashes($_POST['entry']), true);
//$res = json_decode($_POST['entry'],true);
//error_log("result: ".$_POST['entry'].", res=".json_encode($et), 3, $logFile);
error_log(str_replace(array('[',']','"'),array('','',''),json_encode($et)), 3, $logFile);
//error_log(", sales1_lastname: ".$res['sales'][1]['lastname'], 3, $logFile);
error_log("\n", 3, $logFile);
 
//echo $_POST['entry'];
echo stripslashes($_POST['entry']);
//header("Content-type: text/plain");
//echo json_encode($res);
/*
echo '<pre>';
print_r($et);
echo '</pre>';
//*/
?>
