;jQuery(document).ready(function(){  
    jQuery('#consent-form').html(consent['consent-form-text'][lang]);
    jQuery('#digital-signature').attr({value: consent['digital-signature-text'][lang]});
    jQuery('#digital-signature').click(function(){
      location.href = 'survey.php?lang='+lang;
    });
    
  // hide all
  jQuery('#consent-form').hide();
  jQuery('#digital-signature').hide();
  
});
