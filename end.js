;
var cstage = null;
jQuery(document).ready(function(){  
  jQuery('#followup-form').validate();
  jQuery('#demography-form').validate();
  jQuery('#final-form').validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });
  jQuery('#Chinese-in-America-form').validate({
    rules: {
      residency: {
        required: true
      },
      "year-abroad": {
        required: function(e){var checked_val = jQuery('input[name="residency"]:checked').val(); return (checked_val != 3) && (checked_val!=undefined);},
        number: true,
        range: [1900, 2010]
      },
      "years": {
        required: function(e){var checked_val = jQuery('input[name="residency"]:checked').val(); return checked_val == 3;},
        number: true,
        range: [0, 100]
      },
      "months": {
        required: function(e){var checked_val = jQuery('input[name="residency"]:checked').val(); return checked_val == 3;},
        number: true,
        range: [0, 12]
      }
    }
  }); 
  jQuery('input[name="residency"]').change(function(e){
    var checked_val = jQuery('input[name="residency"]:checked').val();
    if(checked_val == 3){
      jQuery('#not-live-in-China').hide();
      jQuery('#live-in-China').show();
    }
    if((checked_val != 3) && (checked_val!=undefined)){
      jQuery('#not-live-in-China').show();
      jQuery('#live-in-China').hide();
    }
    
  });
  
  jQuery('#header').html(end.header[lang]);
  fill_html_followup();
  fill_html_demography(); jQuery('#demography-form').hide();
  jQuery('#Chinese-in-America-form').hide();
  jQuery('#not-live-in-China').hide();
  jQuery('#live-in-China').hide();
  fill_html_final(); jQuery('#final-form').hide();
  cstage = 0;
  jQuery('#submit').click(function(){
    next();
  });
  jQuery('*').keydown(function(e){
    if(e.which==13){
      //jQuery('#submit').click();
      return false;
    } // disable enter key from submit    
  });    
});
function flat_end(){
  var r = [cnum_str,jQuery('input[name="email"]').attr('value')];
  r.push('FOLLOWUP');
  var len = followup['valid-question-ids'].length;
  for(var i=0;i<len;i++){
    r = r.concat();
    var i_str = followup['valid-question-ids'][i];
    r.push(jQuery('input[name="followup-'+i_str+'"]:checked').attr('value'));
  }
  r.push('DEMOGRAPHY');
  len = demography['valid-question-ids'].length;
  for(var i=0;i<len;i++){
    var i_str = demography['valid-question-ids'][i];
    r.push(demography['questions-answers'][i_str]['answer'][lang][jQuery('input[name="demography-'+i_str+'"]:checked').attr('value')-1].replace(/,/g,";"));
  }  
  r.push('COMMENT');
  r = r.concat(jQuery('#comment-end-input').attr('value').replace(/,/g,";"));
  r.push('IP');
  r = r.concat([ip,navigator.userAgent]);
  
  // extra questions
  r.push('Chinese in America');
  r = r.concat([jQuery('input[name="residency"]:checked').attr('value'), jQuery('#year-abroad').attr('value'), jQuery('#years').attr('value'), jQuery('#months').attr('value')]);
  
  return r;
}
function next(){
  jQuery.scrollTo(0);
  if(cstage==0){
    if(jQuery('#followup-form').valid()){
      jQuery('#followup-form').hide();
      jQuery('#demography-form').show();
      jQuery('#Chinese-in-America-form').show();
      cstage=1;
    } 
    return;
  }
  if(cstage==1){
    if(jQuery('#Chinese-in-America-form').valid() && jQuery('#demography-form').valid()){
      jQuery('#demography-form').hide();
      jQuery('#Chinese-in-America-form').hide();
      jQuery('#final-form').show();
      cstage=2;
    } 
    return;
  }
  if(cstage==2){
    if(jQuery('#final-form').valid()){
      jQuery('#submit').hide();
      //jQuery.post('end-save.php',{entry: Object.toJSON(flat_end())},show_final,'text');
      jQuery.post('end-save.php',{entry: flat_end().join()},show_final,'text');
    }
    return;
  }
}
function show_final(res){
  jQuery('#header').hide();
  jQuery('#final-form').hide();
  jQuery('#result').html(res);
  jQuery('#final-view').html(end['final-view-text'][lang]);
}
function fill_html_followup(){
    jQuery('#followup-desc').html(followup['desc'][lang]);
    var len = followup['valid-question-ids'].length;
    for(var i=0;i<len;i++){
      var i_str = followup['valid-question-ids'][i];
      jQuery('#followup-'+i_str+'-desc').html(i_str+'. '+followup['questions'][i_str][lang]+'.');
      for(var j=1;j<=5;j++){
        jQuery('#followup-'+i_str+'-answer-'+j).html(followup['answers'][lang][j-1]);  
      }
      jQuery('input[name="followup-'+i_str+'"]').rules("add", {required: true});
    }
}
function fill_html_demography(){
    jQuery('#demography-desc').html(demography['desc'][lang]);
    var len = demography['valid-question-ids'].length;
    for(var i=0;i<len;i++){
      var i_str = demography['valid-question-ids'][i];
      jQuery('#demography-'+i_str+'-desc').html(i_str+'. '+demography['questions-answers'][i_str]['question'][lang]);
      var count = demography['questions-answers'][i_str]['answer'][lang].length;
      for(var j=1;j<=count;j++){
        jQuery('#demography-'+i_str+'-answer-'+j).html(demography['questions-answers'][i_str]['answer'][lang][j-1]);  
      }
      jQuery('input[name="demography-'+i_str+'"]').rules("add", {required: true});
    }
}
function fill_html_final(){
    jQuery('#confirmation-number').html(cnum_str);
    jQuery('#end-desc').html(end['end-desc'][lang]);
    jQuery('#email-desc').html(end['email-desc'][lang]);
    jQuery('#comment-end-label').html(end['comment-end-label'][lang]);
    jQuery('#submit').attr({value: end['nav']['next'][lang]});
}
