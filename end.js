;jQuery(document).ready(function(){  
    jQuery("#submit-view").bind("submit", function(event){
      event.preventDefault();
    });  
    jQuery('#end-form').html(end['end-form-text'][lang]);
    jQuery('#confirmation-number').html(cnum_str);
    jQuery('#email-form').html(end['email-form-text'][lang]);
    jQuery('#submit').attr({value: end['submit-text'][lang]});
    jQuery('#submit').click(function(){
      jQuery.post('end-save.php',{entry: Object.toJSON([cnum_str,jQuery('input[name="email"]').attr('value')])},show_final,'text');
    });
    jQuery('*').keydown(function(e){
    if(e.which==13){
      //jQuery('#submit').click();
      return false;
    } // disable enter key from submit
  });    
});
function show_final(res){
  jQuery('#submit-view').hide();
  jQuery('#result').html(res);
  jQuery('#final-view').html(end['final-view-text'][lang]);
}
