<link href='js/themes/ui-lightness/ui.all.css' type='text/css' rel='stylesheet'/>
<script src="js/jquery-1.3.2" type="text/javascript"></script>
<script src="js/jquery-ui-1.7.2.custom.min" type="text/javascript"></script>

<style type="text/css">
		.toggler { width: 500px; height: 200px; position: relative;}
		#button { padding: .5em 1em; text-decoration: none; }
		#effect { width: 240px; height: 135px; padding: 0.4em; position: relative; }
		#effect h3 { margin: 0; padding: 0.4em; text-align: center; }
		.ui-effects-transfer { border: 2px dotted gray; } 
	</style>
	<script type="text/javascript">
	$(function() {
		
		//run the currently selected effect
		function runEffect(){
			//get effect type from 
			var selectedEffect = $('#effectTypes').val();
			
			//most effect types need no options passed by default
			var options = {};
			//check if it's scale, transfer, or size - they need options explicitly set
			if(selectedEffect == 'scale'){ options = {percent: 0}; }
			else if(selectedEffect == 'transfer'){ options = { to: "#button", className: 'ui-effects-transfer' }; }
			else if(selectedEffect == 'size'){ options = { to: {width: 200,height: 60} }; }
			
			//run the effect
			$("#effect").effect(selectedEffect,options,500,callback);
		};
		
		//callback function to bring a hidden box back
		function callback(){
			setTimeout(function(){
				$("#effect:hidden").removeAttr('style').hide().fadeIn();
			}, 1000);
		};
		
		//set effect from select menu value
		$("#button").click(function() {
			runEffect();
			return false;
		});
	});
	</script>



<div class="demo">

<div class="toggler">
	<div id="effect" class="ui-widget-content ui-corner-all">
		<h3 class="ui-widget-header ui-corner-all">Effect</h3>
		<p>
			Etiam libero neque, luctus a, eleifend nec, semper at, lorem. Sed pede. Nulla lorem metus, adipiscing ut, luctus sed, hendrerit vitae, mi.
		</p>
	</div>
</div>

<select name="effects" id="effectTypes">
	<option value="blind">Blind</option>
	<option value="bounce">Bounce</option>
	<option value="clip">Clip</option>
	<option value="drop">Drop</option>
	<option value="explode">Explode</option>
	<option value="fold">Fold</option>
	<option value="highlight">Highlight</option>
	<option value="puff">Puff</option>
	<option value="pulsate">Pulsate</option>
	<option value="scale">Scale</option>
	<option value="shake">Shake</option>
	<option value="size">Size</option>
	<option value="slide">Slide</option>
	<option value="transfer">Transfer</option>
</select>

<a bitly="BITLY_PROCESSED" href="#" id="button" class="ui-state-default ui-corner-all">Run Effect</a>


</div><!-- End demo -->

<div style="display: none;" class="demo-description">

<p>Click the button above to show the effect.</p>

</div><!-- End demo-description -->
