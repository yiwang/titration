;function Entry(){
  this.lang = null;
  this.set = null;
  this.start_date = null;
  this.start_time = null;
  this.data = [];
  this.time = [];
}
function Group(){
  this.ctype1 = null;
  this.low = null;
  this.high = null;
  this.ctype0 = [];
}

function flat(e){
  var r = [e.lang, e.set, e.start_date, Math.round(e.start_time/100)];
  for(var i=0; i<e.data.length; i++){
    r.push('ID'+ids[i]);
    //data
    r = r.concat([e.data[i].low, e.data[i].high, e.data[i].ctype1]); // range and input number
    r = r.concat(e.data[i].ctype0);
    r = r.concat(new Array(10-e.data[i].ctype0.length)); // fix length
    //time
    r = r.concat(e.time[i].ctype1);
    r = r.concat(e.time[i].ctype0);
    r = r.concat(new Array(10-e.time[i].ctype0.length));
  }
  for(var i=r.length-1;i>=0;i--){
    if(r[i]==undefined){r[i]='';}
    if(r[i]==null){r[i]='';}
  }
  return r;
}
