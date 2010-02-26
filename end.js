;jQuery(document).ready(function(){  
    jQuery("#submit-view").bind("submit", function(event){
      event.preventDefault();
    });
    jQuery('#submit-view').validate({
      rules: {
        email: {
          required: true,
          email: true
        }
      }
    });
    var len = followup['valid-question-ids'].length;
    for(var i=0;i<len;i++){
      var i_str = followup['valid-question-ids'][i];
      jQuery('#followup-'+i_str+'-desc').html(followup['questions'][i_str][lang]);
      //jQuery('#followup-'+i_str).html(i_str+'. '+followup['questions'][i_str][lang]);
      for(var j=1;j<=5;j++){
        jQuery('#followup-'+i_str+'-answer-'+j).html(followup['answers'][lang][j-1]);  
      }
      jQuery('input[name="followup-'+i_str+'"]').rules("add", {required: true});
    }
    
    
    jQuery('#end-form').html(end['end-form-text'][lang]);
    jQuery('#confirmation-number').html(cnum_str);
    jQuery('#email-form').html(end['email-form-text'][lang]);
    jQuery('#comment-end-label').html(end['comment-end-label'][lang]);
    jQuery('#submit').attr({value: end['submit-text'][lang]});
    jQuery('#submit').click(function(){
      if(jQuery('#submit-view').valid()){
        jQuery.post('end-save.php',{entry: Object.toJSON([cnum_str,jQuery('input[name="email"]').attr('value'),jQuery('#comment-end-input').attr('value').replace(/,/g,";"),ip,navigator.userAgent])},show_final,'text');
      }
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
