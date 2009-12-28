<script src="js/jquery-1.3.2" type="text/javascript"></script>
<script src="js/jquery-ui-1.7.2.custom.min" type="text/javascript"></script>

<script>
$(document).ready(function(){
  var newDiv = $('#sites-canvas-main').clone();
	newDiv.attr("id","myNewDiv").prependTo("#body");
  $('#body').css('background-color','white');
  $('#buf').hide();
  $('#title-crumbs').hide();
  $('.sites-list-showing-items').hide();
  $('#goog-ws-list-sort-row').hide();
});
</script>

<div id='buf' style='visibility: hidden;'>
<?php
$response = http_get("http://sites.google.com/a/yi-wang.me/www/web-development/jquery-yaml/progress", array("timeout"=>1), $info);
//print_r($response);

echo $response;
?>
</div>
