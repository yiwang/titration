function randOrd(){return (Math.round(Math.random())-0.5); }
//jQuery.noConflict(); 
var s = new Survey();
var et = new Entry();

// get set of IDs
var ids = config.sets[set];
//var ids = config.sets[set].sort(randOrd);
var hint = config.hint;

var cid=0;                // question ID, corresponds to *.yaml file name
var cid_n = ids.length;   // size of the set
var cid_i = 0;            // counter, since cid = ids[cid_i]

var ctype=0;
var csub=0;

var vv=null;
var v_i=null;
var v=null; //$VAR_VALUE
var g = null;
var t = null;

function time(){
  return Math.round((new Date().getTime()-et.start_time)/100);
}

jQuery(document).ready(function(){
  jQuery("sform").bind("submit", function(event){
    event.preventDefault();
  });
  et.lang = lang;
  et.set = set;
  et.start_date = Date();
  et.start_time = new Date().getTime();
  jQuery('#sform').validate({
    rules: {
      ctype0: {
        required: function(e){return ctype == 0;}
      },
      //*
      ctype1: {
        required: function(e){return ctype == 1;},
        number: true,
        range: [30, 40]
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
  new_group();
  log('ready');
  log(cid+'.yaml');
  log(ids);
  log('set: '+ set);
});

var sel_val= null;
var sel_last_var = null;

var low = null;
var high = null;

function new_vv(a,b,n){
  var d = (b-a)/n;
  var r = new Array();
  for (var i=1;i < n;i++) {
    r[i-1] = Math.round(a + i*d);
  }
  return r;
}
function Survey(){
  // passed validation, and forward to next sub-question
  this.next = function (){
    switch(ctype){
      case 0:
        if(1-jQuery('input:checked').attr('value')){
          //select base
          sel_val = q[cid].base;
          low = v;
          if(csub==1){
            if(v_i == vv.length-1){
              goto_ctype1();
            }else{
              v=vv[++v_i];
            }
          }else{
            if(csub==0 && v_i==0){
              // finish ctype0, go to ctype1 directly
              goto_ctype1();
            }else{
              csub = 1;
              vv = new_vv(v,sel_last_var,q[cid].division);
              v=vv[v_i = 0];
            }
          }
        }else{
          // select var
          sel_val = v;
          high = v;
          if(csub==1){
            goto_ctype1();
          }else{
            sel_last_var = sel_val;
            if(v_i == vv.length-1){
              goto_ctype1();
            }else{
              v=vv[++v_i];
            }
          }
        }
        // update g, t
        g.ctype0.push(sel_val);
        t.ctype0.push(time());        
        break;
      case 1:
        g.ctype1 = (+jQuery('input[name="ctype1"]').attr('value'));
        t.ctype1 = time();
        if(!inc_cid()){
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
function goto_ctype1(){
  g.low = low;
  g.high = high;
  ctype = 1;
  notify_change(['hint','ctype1']);
  //*
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
  jQuery('#progressbar').progressbar('option','value',(cid_i+1)/cid_n*100);
  jQuery('#progress').html((cid_i+1)+' / '+cid_n);
  jQuery('#desc').html(q[cid]['desc'][lang].replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>').replace(/\$VAR\_VALUE/g, '<span name="var_value">'+v+'</span>'));
  jQuery('#hint').html(hint[ctype][lang]);
  jQuery('label[name="base"]').html(q[cid]['ans'][lang][0].replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>'));
  jQuery('label[name="var"]').html(q[cid]['ans'][lang][1].replace(/\$VAR\_VALUE/g, '<span name="var_value">'+v+'</span>').replace(/\$BASE\_VALUE/g, '<span name="base_value">'+q[cid].base+'</span>'));
  jQuery('#viz-var').css('width', v/q[cid].base*100+'px');
  jQuery('span[name="var"]').html(q[cid]['ans'][lang][1].replace(/\$VAR\_VALUE/g, '______'));
  jQuery('#note').html(q[cid]['note'][lang]);
  jQuery('#your_ans').html(config.your_ans[lang]);
  jQuery('#next').attr({value:config.nav.next[lang]});
  // td[name="viz"] visiblity depends on whether q[cid].base is 0
  if(q[cid].base == 0){jQuery('td[name="viz"]').css("visibility","hidden");}
  if(q[cid].base != 0){jQuery('td[name="viz"]').css("visibility","visible");}
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
function new_group(){
  low = high = null;
  g = new Group();
  t = new Group();
  et.data.push(g);
  et.time.push(t);
  cid = ids[cid_i];
  ctype = 0;
  csub = 0;
  // reverse the original order, make vv = a large to small copy
  vv = q[cid]['var'].concat().reverse();
  v_i = 0;
  // v =  current var_value, to be displayed along with base_value
  v = vv[v_i];
  refill_html();
  notify_change(['sform']);
}
