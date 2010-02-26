<head>
<meta content="text/html; charset=UTF-8" http-equiv="content-type"/>
<meta http-equiv="Content-Script-Type" content="text/javascript; charset=utf-8">
<script src="debug.js" type="text/javascript"></script>
<?php
$lang = $_GET['lang'];
if(empty($lang)){
  $lang = 'en';
}
//echo $lang;
$cnum_str = $_GET['cnum_str'];
$et = json_decode(stripslashes($_POST['entry']), true);
//*
echo '<pre>';
print_r($et);
echo '</pre>';
//*/
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
$end = Spyc::YAMLLoad('conf.d/end.yaml');

echo 'end='.json_encode($end).';';
echo 'lang="'.$lang.'";';
echo 'cnum_str="'.$cnum_str.'";';
echo 'ip="'.$_SERVER['REMOTE_ADDR'].'";';

$followup = Spyc::YAMLLoad('conf.d/followup.yaml');
$demography = Spyc::YAMLLoad('conf.d/demography.yaml');
echo 'followup='.json_encode($followup).';';
echo 'demography='.json_encode($demography).';';
?>  
</script>
<script src="end.js" type="text/javascript"></script>
<?php
//*
echo '<pre>';
//print_r($consent);
echo '</pre>';
//*/
?>

</head>

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-13068958-1");
pageTracker._trackPageview();
} catch(err) {}</script>

<style type="text/css">
label.choice:hover {background-color: yellow; cursor:pointer; cursor:hand;}
input:focus {background: yellow; }
#comment-end-input {width: 500px; }
label.error { float: none; color: red; padding-left: .5em; vertical-align: top; display:none; }
</style>

<form id='submit-view'>

<div id='followup-view'>
<?php
foreach($followup['valid-question-ids'] as $i){
echo "<label id='followup-".$i."-desc'></label>";
echo '<label class="error" for="followup-'.$i.'" ><br />';
    if($lang=='zh'){
      echo '请选择一个答案.';
    }else{
      echo 'Please select an answer.';
    }
echo "</label><br />";
  
  for($j=1; $j<=5; $j++){
  echo '<label class="choice"><input type="radio" name="followup-'.$i.'" value="'.$j.'" /> <span class="choice" id="followup-'.$i.'-answer-'.$j.'" ></span>&nbsp&nbsp&nbsp&nbsp&nbsp</label>';
  }
echo "<br /><br />";
}
?>
</div>

<div id='demography-view'>

</div>

<div id='end-form'></div>
<div id='confirmation-number'></div>
<br/>

<div id='email-form'></div>
<input id='email' name='email' type="text"/>
<br /><br />

  <label id='comment-end-label'></label><br />
  <input id='comment-end-input' type="text" /><br />

<input id='submit' type="button"/>

</form>

<div id='result'></div>
<div id='final-view'></div>
