;function Entry(){
  this.lang = null;
  this.set = null;
  this.start_date = null;
  this.start_time = null;
  this.end_time = null; // in ms
  this.duration = null; // in second
  this.ds = new Object();
}

// Data collected within one ID (questions)
function Data(){
  this.ctype1 = null;
  this.low = null;
  this.high = null;
  this.time = []; // array of intervals in second of user's actions
}

// encode Entry Object to CSV one line format
function flat(e){
  //var r = [e.lang, e.set, e.start_date, e.start_time/1000, e.end_time/1000, e.duration];
  var r = [e.lang, e.set, e.start_date, e.start_time+'', e.end_time+'', e.duration];
  var ids_sorted = ids.concat([]);
  ids_sorted.sort(sortNumberAscending); // for alignment
  for(var j=0; j<ids_sorted.length; j++){
    var i = ids_sorted[j];
    r.push('ID'+i);
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
  r.push("SEQ");
  r = r.concat(ids);
  //log("r: "+r);
  return r;
}
