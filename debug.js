// debug
function log(str){
	var log = document.getElementById("log");
	if (log){ // log!=null
	log.innerHTML = str + "<br/>" + log.innerHTML;
	}
}
