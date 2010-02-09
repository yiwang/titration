;jQuery(document).ready(function(){  
    jQuery('#consent_form').html(consent['consent_form_text'][lang]);
    jQuery('#digital_signature').attr({value: consent['digital_signature_text'][lang]});
    jQuery('#digital_signature').click(function(){
      location.href = 'survey.php?lang='+lang;
    });
});
