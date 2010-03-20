<head>
<meta content="text/html; charset=UTF-8" http-equiv="content-type"/>
<!meta http-equiv="Content-Script-Type" content="text/javascript; charset=utf-8">
<script src="debug.js" type="text/javascript"></script>
<?php
$lang = $_GET['lang'];
if(empty($lang)){
  $lang = 'en';
}
//echo $lang;
$debug_id = intval($_GET['id']);
//echo $debug_id;
?>
<link href='lib/js/themes/flick/jquery-ui-1.7.2.custom.css' type='text/css' rel="Stylesheet" />
<script src="lib/js/jquery-1.3.2.js" type="text/javascript"></script>
<script src="lib/js/jquery-ui-1.7.2.custom.min.js" type="text/javascript"></script>
<script src="lib/js/jquery.form.js" type="text/javascript"></script>
<?php
echo '<script src="lib/js/jquery.validate.';
echo $lang;
//echo'.js" type="text/javascript" charset="utf-8"></script>';
echo'.js" type="text/javascript"></script>';
?>
<script src="lib/js/prototype.js" type="text/javascript"></script>
<script src="lib/js/scriptaculous.js" type="text/javascript"></script>

<script type="text/javascript">
<?php
require_once('lib/spyc/spyc.php');
function alert($val){
  echo 'val="'.$val.'";';
  echo 'alert('.val.');';
}
$config = Spyc::YAMLLoad('conf.d/config.yaml');
$set = $_GET['set'];
$set_value = $config['sets'][$set];
//alert(isset($config[$set]));
//randomization of set
if(!isset($set_value)){
  $set = array_rand($config['sets']);
  //alert($set);
}
$ids = $config['all-ids'];
foreach($ids as $i){
	$q[$i] = Spyc::YAMLLoad('conf.d/questions/'.strval($i).'.yaml');
	/*
	$VAR_VALUE = $q[$i]['var'][0];
	$ans_var = $q[$i]['ans'][$lang][1];
	eval("\$ans_var = \"$ans_var\";");
	echo $ans_var;
	//*/
}

echo 'config='.json_encode($config).';';
echo 'q='.json_encode($q).';';
echo 'lang="'.$lang.'";';
echo 'set="'.$set.'";';
echo 'debug_id='.$debug_id.';';

// check count against quota
$fn = 'out.d/count';
if (file_exists($fn)){
  $file = fopen($fn, r);
  $counter = fread($file, filesize($fn));
  fclose($file);
  echo 'counter='.$counter.';';
  // assign set according to counter value
  $remainder = $counter % 2;
  if ($remainder == 1) $set='A';
  if ($remainder == 0) $set='B';
}else{
  $file = fopen($fn, w);
  fwrite($file, '0');
  fclose($file);
  echo 'counter=0;';
}

?>
</script>
<script src="tm.js" type="text/javascript"></script>
<script src="entry.js" type="text/javascript"></script>
<script src="survey.js" type="text/javascript"></script>
<?php
/*
echo $remainder.' '.$set;
echo '<pre>';
//print_r(array_rand($config['sets']));
//print_r($ids);
//print_r($config);
echo '</pre>';
//*/
/*
echo '<pre> loaded into PHP:<br/>';
print_r($q[$i]);
echo '</pre>';
//*/
/*
echo '<pre>YAML Data dumped back:<br/>';
echo Spyc::YAMLDump($q[$i]);
echo '</pre>';
//*/

?>
<?php
require_once('conf.d/server/ga.php');
?>
</head>



