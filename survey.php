<?php
require_once('survey-header.php');
?>
<style type="text/css">
#header {color: red;}
#note1 {color: red;}
form { font-family: Verdana; font-size: 14px; }
#progressbar {height:15px;}
#viz-base {height:10px; width:100px;}
#viz-base-ctype1 {height:10px; width:100px;}
#viz-var {height:10px;}
#viz-var-ctype1 {height:10px; width:0px;}

label { float: none; vertical-align: center;}
input.radio {white-space: nowrap;}
label {white-space: pre;} 
label.choice:hover {background-color: yellow; cursor:pointer; cursor:hand;}
input:focus {background: yellow; }
label.error { float: none; color: red; padding-left: .5em; vertical-align: top; display:none; }
p { clear: both; }
.submit { margin-left: 12em; align: center; }
em { font-weight: bold; padding-right: 1em; vertical-align: top; }
#comment-question-input {width: 500px; }
</style>

<div id="all-body">

<div id="header"></div>
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
    <td> <div><label class="choice"><input type="radio" name="ctype0" value="1"/> <span class="choice" name='base'></span></label></div> </td>
    <td name="viz"><div id='viz-base'></div></td>
  </tr>
  <tr id='var'>
    <td><div><label class="choice"><input type="radio" name="ctype0" value="0" /> <span class="choice" name='var'></span></label></div> </td>
    <td name="viz"><div id='viz-var'></div></td>
  </tr>
</table>
  
<br/>
  <div id='note'></div>
</div>

<div id='ctype1'><br/>
<table>
  <tr>
    <td><div>A. <span name='base'></span></div> </td>
    <td name="viz"><div id='viz-base-ctype1'></div></td>
  </tr>
  <tr>
    <td><div>B. <span name='var-ctype1'></span></div> </td>
    <td name="viz"><div id='viz-var-ctype1'></div></td>
  </tr>
</table>
  <br/>
  <label id='your-ans'></label><input name='ctype1' type="text"  />

  <div id='note1'> </div>
  <br /><br />
  <label id='comment-question-label'></label><br />
  <input id='comment-question-input' type="text" />
</div>

</fieldset>
</form>
<form id='endform'>
<div id='entry'></div>
</form>
<input id='next' type="button"/>
<div id='result'></div>

<div id="debug" style="visibility: hidden;">
<div id="log"></div>
<input name="eval" id="eval" />
<a href="javascript:void(0);" onClick="log(eval(document.getElementById('eval').value));">go</a> 
</div>

</div>
