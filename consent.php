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
$consent = Spyc::YAMLLoad('conf.d/consent.yaml');

echo 'consent='.json_encode($consent).';';
echo 'lang="'.$lang.'";';
?>  
</script>
<script src="consent.js" type="text/javascript"></script>
<?php
//*
echo '<pre>';
//print_r($consent);
echo '</pre>';
//*/
?>
<style type="text/css">
#consent-form {width: 600;}
</style>
</head>

<?php
require_once('conf.d/server/ga.php');
?>

<div id='consent-form'></div>
<input id='digital-signature' type="button"/>

