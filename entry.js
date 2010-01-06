;function Entry(){
  this.lang = null;
  this.set = null;
  this.start_date = null;
  this.start_time = null;
  this.end_time = null;
  this.duration = null; // in second
  this.ds = [];
}
function Data(){
  this.ctype1 = null;
  this.low = null;
  this.high = null;
  this.time = [];
}

function flat(e){
  var r = [e.lang, e.set, e.start_date, e.start_time/1000, e.end_time/1000, e.duration];
  for(var i=0; i<e.ds.length; i++){
    r.push('ID'+ids[i]);
    //data
    //if(e.ds[i].high==0){e.ds[i].high=Infinity;}
    r = r.concat([e.ds[i].ctype1, e.ds[i].low, e.ds[i].high],e.ds[i].time);
    r = r.concat(new Array(config.depth + 1 - e.ds[i].time.length));
    
  }
  //* make undefined and null empty string '' for later encoding
  for(var i=r.length-1;i>=0;i--){
    if(r[i]==undefined){r[i]='';}
    if(r[i]==null){r[i]='';}
  }
  //*/
  return r;
}
