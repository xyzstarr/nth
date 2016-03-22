var fs = require('fs');
var csv_data = []
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line,last);
      index = remaining.indexOf('\n', last);
    }
    remaining = remaining.substring(last);
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data,index) {
  //console.log('Line: ' + data);
  csv_data[index] = data
  //console.log(csv_data[0])
}

var input = fs.createReadStream('DiagnosticLab_properties.csv');
readLines(input, func);


	console.log(csv_data[0])

