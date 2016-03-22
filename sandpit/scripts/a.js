function camelCase(str) {
		x = (str.replace(/([A-Z])/g,"-$1").toLowerCase()).replace(/-/,"")
  console.log(x)
	
	x = str.replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : "";
  })
  console.log(x)
		return str.replace(/[A-Z](\w|$)/g, function (_,x) {
		//return str.replace(/[_.-](\w|$)/g, function (_,x) {
		//return str.replace(/[A-Z]/g, function (_,x) {
        return x.toUpperCase();
    });
}


console.log(camelCase("AcceptAction"))
//console.log(camelCase("hello-there"))
//console.log(camelCase("i-am-The-REALmcCoy"))