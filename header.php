<meta content="text/html; charset=UTF-8" http-equiv="content-type"/>
<?php
$lang = $_GET['lang'];
if(empty($lang)){
  $lang = 'en';
}
$set = $_GET['set'];
if(empty($set)){
  $set = 'A';
}
//echo $lang;
?>
<link href='js/themes/flick/jquery-ui-1.7.2.custom.css' type='text/css' rel="Stylesheet" />
<script src="js/jquery-1.3.2" type="text/javascript"></script>
<script src="js/jquery-ui-1.7.2.custom.min" type="text/javascript"></script>
<script src="js/jquery.form.js" type="text/javascript"></script>
<?php
echo '<script src="js/jquery.validate.';
echo $lang;
echo'.js" type="text/javascript"></script>';
?>
<script src="js/prototype.js" type="text/javascript"></script>
<script src="js/scriptaculous.js" type="text/javascript"></script>

<script type="text/javascript">
<?php
require_once('spyc/spyc.php');
$ids = array(1,2,3);
foreach($ids as $i){
	$q[$i] = Spyc::YAMLLoad('questions/'.strval($i).'.yaml');
	/*
	$VAR_VALUE = $q[$i]['var'][0];
	$ans_var = $q[$i]['ans'][$lang][1];
	eval("\$ans_var = \"$ans_var\";");
	echo $ans_var;
	//*/
}
$config = Spyc::YAMLLoad('config.yaml');
echo 'config='.json_encode($config).';';
echo 'q='.json_encode($q).';';
echo 'lang="'.$lang.'";';
echo 'set="'.$set.'";';
?>
</script>
<script src="entry.js" type="text/javascript"></script>
<script src="survey.js" type="text/javascript"></script>
<?php
/*
echo '<pre>';
print_r($config);
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

<div id="debug" style="visibility: hidden;">
<div id="log"></div>
<input name="eval" id="eval" />
<a href="javascript:void(0);" onClick="log(eval(document.getElementById('eval').value));">go</a> 
</div>

