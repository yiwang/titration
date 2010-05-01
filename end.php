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
$debug = intval($_GET['debug']);
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
<script src="lib/js/jquery.serialScroll-1.2.2/jquery.scrollTo.js" type="text/javascript"></script>
<script src="lib/js/jquery.serialScroll-1.2.2/jquery.serialScroll.js" type="text/javascript"></script>
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
echo 'debug='.$debug.';';

$followup = Spyc::YAMLLoad('conf.d/followup.yaml');
$demography = Spyc::YAMLLoad('conf.d/demography.yaml');
if($debug){
  $followup['valid-question-ids'] = array($followup['valid-question-ids'][0]);
  $demography['valid-question-ids'] = array($demography['valid-question-ids'][0]);
}
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

<?php
require_once('conf.d/server/ga.php');
?>

<style type="text/css">
#header {color: red;}
label.choice:hover {background-color: yellow; cursor:pointer; cursor:hand;}
input:focus {background: yellow; }
#comment-end-input {width: 500px; }
label.error { float: none; color: red; padding-left: .5em; vertical-align: top; display:none; }
</style>


<div id="header"></div>

<form id='followup-form'>
<div id='followup-view'>
<div id='followup-desc'></div><br/>
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
</form>

<form id='Chinese-in-America-form'>
<div id='demography-desc'></div><br/>
  <label>1. 您现在哪里居住?</label>
  <?php
    echo '<label class="error" for="residency" ><br />';
      if($lang=='zh'){
        echo '请选择一个答案.';
      }else{
        echo 'Please select an answer.';
      }
    echo "</label><br />";
  ?>
  <label class="choice"><input type="radio" name="residency" value="1" /> <span class="choice">美国</span> </label><br/>
  <label class="choice"><input type="radio" name="residency" value="2" /> <span class="choice">加拿大</span> </label><br/>
  <label class="choice"><input type="radio" name="residency" value="3" /> <span class="choice">中国</span> </label><br/>
  <label class="choice"><input type="radio" name="residency" value="4" /> <span class="choice">其他</span> </label><br/>

  <br/>       
  <div id='not-live-in-China'>
    <label>如果您现在不在中国居住, 您是哪一年出国的?</label><br/>
    <input name='year-abroad' type="text" size="6"/>年<label class="error" for="year-abroad" >&nbsp&nbsp&nbsp&nbsp&nbsp请输入年份数字</label>
  </div>
  <br/>
  <div id='live-in-China'>
    <label>如果您现在在中国居住, 但是曾经在国外居住一段时间, 请问您曾在国外呆了多长时间?</label><br/>
    <input id="years" name='years' type="text" size="2"/>年<label class="error" for="years" >&nbsp&nbsp&nbsp&nbsp&nbsp请输入数字(0 ~ 100)</label><br/>
    <input id="months" name='months' type="text" size="2"/>月<label class="error" for="months" >&nbsp&nbsp&nbsp&nbsp&nbsp请输入数字(0 ~ 12)</label>
  </div>
</form>

<form id='demography-form'>
<?php
foreach($demography['valid-question-ids'] as $i){
echo "<label id='demography-".$i."-desc'></label>";
echo '<label class="error" for="demography-'.$i.'" ><br />';
    if($lang=='zh'){
      echo '请选择一个答案.';
    }else{
      echo 'Please select an answer.';
    }
echo "</label><br />";
  $count = count($demography['questions-answers'][$i]['answer'][$lang]);
  for($j=1; $j<=$count; $j++){
  echo '<label class="choice"><input type="radio" name="demography-'.$i.'" value="'.$j.'" /> <span class="choice" id="demography-'.$i.'-answer-'.$j.'" ></span>&nbsp&nbsp&nbsp&nbsp&nbsp</label><br/>';
  }
echo "<br /><br />";
}
?>
</form>

<form id='final-form'>

<div id='end-desc'></div>
<div id='confirmation-number'></div>
<br/>

<div id='email-desc'></div>
<input id='email' name='email' type="text"/>
<br /><br />

  <label id='comment-end-label'></label><br />
  <input id='comment-end-input' type="text" /><br />


</form>

<input id='submit' type="button"/>

<div id='result'></div>
<div id='final-view'></div>
