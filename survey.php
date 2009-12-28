<?php
require_once('header.php');
?>
<style type="text/css">
form { font-family: Verdana; font-size: 14px; }
#progressbar {height:15px;}
#viz-base {height:10px; width:100px;}
#viz-base-ctype1 {height:10px; width:100px;}
#viz-var {height:10px;}
#viz-var-ctype1 {height:10px; width:0px;}

label { float: none; vertical-align: center;}
label.error { float: none; color: red; padding-left: .5em; vertical-align: top; display:none; }
p { clear: both; }
.submit { margin-left: 12em; align: center; }
em { font-weight: bold; padding-right: 1em; vertical-align: top; }

</style>
<div id="progressbar"></div>
<form id = 'sform'>
<fieldset>
<legend id='progress'></legend>
<div id='desc'></div><br/>

<span id='hint'></span>
  <label class="error" for="ctype0">
  <?php
    if($lang=='zh'){
      echo '请选择一个答案.';
    }else{
      echo 'Please select an answer.';
    }
  ?>
  </label>
<br/>
  
<div id='ctype0'><br/>
<table>
  <tr>
    <td> <div><input type="radio" name="ctype0" value="0"/> <label name='base'></label></div> </td>
    <td><div id='viz-base'></div></td>
  </tr>
  <tr id='var'>
    <td><div><input type="radio" name="ctype0" value="1" /> <label name='var'></label></div> </td>
    <td><div id='viz-var'></div></td>
  </tr>
</table>
  
<br/>
  <div id='note'></div>
</div>

<div id='ctype1'><br/>
<table>
  <tr>
    <td><div>A. <label name='base'></label></div> </td>
    <td><div id='viz-base-ctype1'></div></td>
  </tr>
  <tr>
    <td><div>B. <span name='var'></span></div> </td>
    <td><div id='viz-var-ctype1'></div></td>
  </tr>
</table>
  <br/>
  <label id='your_ans'></label><input name='ctype1' type="text"  />
</div>

</fieldset>
</form>
<form id='endform'>
<div id='entry'></div>
</form>
<input id='next' type="button"/>
<div id='result'></div>
