;jQuery(document).ready(function(){  
    jQuery('#end-form').html(end['end-form-text'][lang]);
    jQuery('#confirmation-number').html(cnum_str);
    jQuery('#email-form').html(end['email-form-text'][lang]);
    jQuery('#submit').attr({value: end['submit-text'][lang]});
    jQuery('#submit').click(function(){
      jQuery.post('end-save.php',{entry: Object.toJSON([cnum_str,jQuery('input[name="email"]').attr('value')])},show_final,'text');
    });    
});
function show_final(res){
  jQuery('#submit-view').hide();
  jQuery('#result').html(res);
  jQuery('#final-view').html(end['final-view-text'][lang]);
}
