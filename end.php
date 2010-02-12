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
$cnum_str = $_GET['cnum_str'];
$et = json_decode(stripslashes($_POST['entry']), true);
//*
echo '<pre>';
print_r($et);
echo '</pre>';
//*/
?>
<link href='lib/js/themes/flick/jquery-ui-1.7.2.custom.css' type='text/css' rel="Stylesheet" />
<script src="lib/js/jquery-1.3.2" type="text/javascript"></script>
<script src="lib/js/jquery-ui-1.7.2.custom.min" type="text/javascript"></script>
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
var pageTracker = _gat._getTracker("UA-1108486-4");
pageTracker._trackPageview();
} catch(err) {}</script>

<style type="text/css">
input:focus {background: yellow; }
</style>

<form id='submit-view'>
<div id='end-form'></div>
<div id='confirmation-number'></div>
<br/>

<div id='email-form'></div>
<input id='email' name='email' type="text"/>
<br/>
<input id='submit' type="button"/>

</form>

<div id='result'></div>
<div id='final-view'></div>
