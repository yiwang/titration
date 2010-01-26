// Reference URL http://www.yi-wang.me/web-development/jquery-yaml/documentation#TOC-Transition-Matrix-tm-
// The number (0-7) is actually the index of elements in bvs_array.
// 0 is used as denoting selection of var value, exit('to' field) and Infinite('high' field)
;function TransitionMatrixes(){
// for tm-index: 1, initial base value is more attractive, lose var value in future
  this[1] = {
  //  a
    '7,1': {"to": 5, "low": 1, "high": 7},
    '7,0': {"to": 0, "low": 7, "high": 0},
  //b
    '5,1': {"to": 3, "low": 1, "high": 5},
    '5,0': {"to": 6, "low": 5, "high": 7},
  //  b.i
    '6,1': {"to": 0, "low": 5, "high": 6},
    '6,0': {"to": 0, "low": 6, "high": 7},
  //c
    '3,1': {"to": 2, "low": 1, "high": 3},
    '3,0': {"to": 4, "low": 3, "high": 5},
  //  c.i
    '4,1': {"to": 0, "low": 3, "high": 4},
    '4,0': {"to": 0, "low": 4, "high": 5},
  // d
    '2,1': {"to": 0, "low": 1, "high": 2},
    '2,0': {"to": 0, "low": 2, "high": 3}
  };
// for tm-index: 2, initial var value is more attractive, gain var value in future
  this[2] = {
  //  a
    '7,0': {"to": 5, "low": 1, "high": 7},    
    '7,1': {"to": 0, "low": 7, "high": 0},
  //b
    '5,0': {"to": 3, "low": 1, "high": 5},
    '5,1': {"to": 6, "low": 5, "high": 7},
  //  b.i
    '6,0': {"to": 0, "low": 5, "high": 6},
    '6,1': {"to": 0, "low": 6, "high": 7},
  //c
    '3,0': {"to": 2, "low": 1, "high": 3},
    '3,1': {"to": 4, "low": 3, "high": 5},
  //  c.i
    '4,0': {"to": 0, "low": 3, "high": 4},
    '4,1': {"to": 0, "low": 4, "high": 5},
  // d
    '2,0': {"to": 0, "low": 1, "high": 2},
    '2,1': {"to": 0, "low": 2, "high": 3}
  };
// for tm-index: 3, initial base value is more attractive, gain sth. in future with cost of var value
  this[3] = this[1];
// for tm-index: 4, initial var value is more attractive, lose sth. in future with return of var value  
  this[4] = this[2];
}
var tms = new TransitionMatrixes();
