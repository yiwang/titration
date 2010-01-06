;function TransitionMatrix(){
  //  a
  this['7,0']={"to": 5, "low": 1, "high": 7};
  this['7,1']={"to": 0, "low": 7, "high": 0};
  //b
  this['5,0']={"to": 3, "low": 1, "high": 5};
  this['5,1']={"to": 6, "low": 5, "high": 7};
  //  b.i
  this['6,0']={"to": 0, "low": 5, "high": 6};
  this['6,1']={"to": 0, "low": 6, "high": 7};
  //c
  this['3,0']={"to": 2, "low": 1, "high": 3};
  this['3,1']={"to": 4, "low": 3, "high": 5};
  //  c.i
  this['4,0']={"to": 0, "low": 3, "high": 4};
  this['4,1']={"to": 0, "low": 4, "high": 5};
  // d
  this['2,0']={"to":0, "low": 1, "high": 2};
  this['2,1']={"to":0, "low": 2, "high": 3};
}
var tm = new TransitionMatrix();
// The number (0-7) is actually the index of elements in bvs_array.
