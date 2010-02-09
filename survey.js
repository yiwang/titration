function randOrd(){return (Math.round(Math.random())-0.5); }
function sortNumberAscending(a,b){return a - b;}
//jQuery.noConflict(); 
var s = new Survey();
var et = new Entry();

// get set of IDs
//var ids = config.sets[set];
var ids = config.sets[set].sort(randOrd);
if(debug_id){ids=[debug_id];}
var hint = config.hint;

var cid=0;                // current question ID, corresponds to *.yaml file name
var cid_n = ids.length;   // size of the current set
var cid_i = 0;            // counter, since cid = ids[cid_i]

var ctype=null;

var cat=null; //(current var at in Transition Matrix)
var bvs_array=null; // bvs_array=[0 (for exit), base, d, c, c.i, b, b.i, a]

var v=null; //$VAR_VALUE
var data = null; // data

var saved_time = null;
function time(){
  var current_time = new Date().getTime();
  t =  (current_time - saved_time)/1000;
  saved_time = current_time;
  return t;
}

jQuery(document).ready(function(){  
  jQuery("sform").bind("submit", function(event){
    event.preventDefault();
  });
  et.lang = lang;
  et.set = set;
  et.start_date = Date();
  saved_time = et.start_time = new Date().getTime();
  jQuery('#sform').validate({
    rules: {
      ctype0: {
        required: function(e){return ctype == 0;}
      },
      //*
      ctype1: {
        required: function(e){return ctype == 1;},
        number: true
        // range: [30, 40]
      }
      //*/
    }
  }); 
  jQuery('#next').click(function(){
    if(jQuery('#sform').valid()){
      s.next();
    }
  });
  jQuery('#progressbar').progressbar({ value: 100 });
  jQuery('#viz-base').progressbar({ value: 100 });
  jQuery('#viz-base-ctype1').progressbar({ value: 100 });
  jQuery('#viz-var').progressbar({ value: 100 });
  jQuery('#viz-var-ctype1').progressbar({ value: 100 });
  jQuery('input[name="ctype1"]').keyup(function(e){    
    jQuery('#viz-var-ctype1').css('width',(+jQuery('input[name="ctype1"]').val())*100/q[cid].base);
  });
  jQuery('*').keydown(function(e){
    if(e.which==13){
      jQuery('#next').click();
      return false;
    } // disable enter key from submit
  });
  log('debug ready');
  if(!debug_id){  
    log('set: '+ set);
    log('SEQ: '+ ids);
  }
  new_group();  
});

var ctm = null;
function Survey(){
  // passed validation, and forward to next sub-question
  this.next = function (){
    data.time.push(time());
    switch(ctype){      
      case 0: // for choice 
        ctm = tms[q[cid]['tm-index']][cat+','+jQuery('input:checked').attr('value')];
        if(v = bvs_array[cat=ctm.to]){ 
        }else{ // 0, exit
          goto_ctype1(bvs_array[ctm.low], bvs_array[ctm.high]);
        }        
        break;
      case 1: // for filling blank
        data.ctype1 = (+jQuery('input[name="ctype1"]').attr('value'));
        if(!inc_cid()){
          et.end_time = new Date().getTime();
          et.duration = (et.end_time - et.start_time)/1000;
          //jQuery('#next').attr({value:config.nav.submit[lang]});
          jQuery('#entry').html(Object.toJSON(flat(et)));
          jQuery('#next').hide();
          jQuery('#sform').hide();
          jQuery.post('save.php',{entry: Object.toJSON(flat(et))},show_result,'text');
          log('end survey!');
          return;
        }
        break;
    }
    jQuery('#sform').resetForm();
    refill_html();
    if(1-ctype){
      notify_change(['var','viz-var']);
      notify_emphasize('var_value',2,'#fff000');
    }
    //log('end next,cid_i:'+cid_i+',cid:'+cid+',ctype:'+ ctype);
  }  
}
function goto_ctype1(low,high){
  data.low = low;
  data.high = high;
  log('user\'s preference range: ('+data.low+','+data.high+')');
  ctype = 1;
  notify_change(['hint','ctype1']);
  /*
  jQuery('input[name="ctype1"]').rules("remove","range min");
  if(low!=null && high!=null){
    jQuery('input[name="ctype1"]').rules("add",{range: [low, high]});
  }else if(low!=null){
    jQuery('input[name="ctype1"]').rules("add",{min: low});
  }else if(high!=null){
    jQuery('input[name="ctype1"]').rules("add",{range: [0, high]});
  }
  //*/
}
function show_result(res){
  jQuery('#result').html(res);
}
//
function notify_emphasize(name,dur,c){
  jQuery("*[name="+name+"]").effect('highlight',{color: c},dur*1000);
}
// yellow fade
function notify_change(id_list,dur,c){
  if(dur === undefined){
    dur = 1;
  }
  if(c === undefined){
    c = '#ffff99';
  }
  for (var i = id_list.length - 1; i>= 0; i--){
    new Effect.Highlight(id_list[i], {duration: dur, startcolor: c});  
  }
}
function refill_html(){
  jQuery('#header').html(config.header[lang]);
  jQuery('#progressbar').progressbar('option','value',(cid_i+1)/cid_n*100);
  jQuery('#progress').html((cid_i+1)+' / '+cid_n);
  jQuery('#desc').html(q[cid]['desc'][lang].replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>').replace(/\$VAR\_VALUE/g, '<span name="var_value">'+v+'</span>'));
  jQuery('#hint').html(hint[ctype][lang]);
  jQuery('span[name="base"]').html(q[cid]['ans'][lang][0].replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>'));
  jQuery('span[name="var"]').html(q[cid]['ans'][lang][1].replace(/\$VAR\_VALUE/g, '<span name="var_value">'+v+'</span>').replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>'));
  jQuery('#viz-var').css('width', v/q[cid].base*100+'px');
  jQuery('span[name="var-ctype1"]').html(q[cid]['ans'][lang][1].replace(/\$VAR\_VALUE/g, '______').replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>'));
  jQuery('#note').html(q[cid]['note'][lang]);
  jQuery('#your_ans').html(config.your_ans[lang]);
  jQuery('#next').attr({value:config.nav.next[lang]});
  /* td[name="viz"] visiblity depends on whether q[cid].base is 0
  if(q[cid].base == 0){jQuery('td[name="viz"]').css("visibility","hidden");}
  if(q[cid].base != 0){jQuery('td[name="viz"]').css("visibility","visible");}
  //*/
  jQuery('td[name="viz"]').css("visibility","hidden");
  // visibility
  show_hide();
}
function show_hide(){
  jQuery('#ctype'+(1-ctype)).hide();
  jQuery('#ctype'+ctype).show();
}
// move to next group of question
function inc_cid(){
  cid_i++;
  if(cid_i < cid_n){
    new_group();
    return true;
  }else{
    return false;
  }
}
// initialization of a new question (content of one .yaml file)
function new_group(){
  low = high = null;
  cid = ids[cid_i];
  data = new Data();
  et.ds[cid] = data;
  ctype = 0;
  //try{
    if(q[cid]['var-zh']){
      if(lang == 'zh'){
        q[cid]['base']=q[cid]['base-zh'];
        q[cid]['var']=q[cid]['var-zh'];
        q[cid]['sub']=q[cid]['sub-zh'];
      }
    }
  //}catch(e){}
  bvs_array = [0].concat(q[cid]['base']).concat(q[cid]['var']).concat(q[cid]['sub']).sort(sortNumberAscending);
  cat = bvs_array.length-1;
  v = bvs_array[cat];
  refill_html();
  notify_change(['sform']);
  log(cid+'.yaml');
  log('tm-index: '+ q[cid]["tm-index"]);
  log('bvs_array: '+bvs_array);
}
