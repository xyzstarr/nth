//var currObjectType
var filesDIR = 'D:/work/dev/nth/data_dumps/schema_models/csv/raw/'
var propertiesFileSuffix = '_properties.csv'
var destinationTable = 'object_schemas'
var mainObjectType = ''
function setMainObjectType(csvFile){
	mainObjectType = csvFile.replace(propertiesFileSuffix,'')
}
function createCleanCSVFile(csvFile,callback){
	var currObjectType = mainObjectType
	var propertiesFrom = 'Properties from'
	var tripleCommas = ',,, '
	var data = ''
	var lineNumber = 0
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream(csvFile)
	});
	lineReader.on('line', function (line){
		setMainObjectType(csvFile)
		if(line.indexOf(propertiesFrom) > 0){
			currObjectType = line.replace(propertiesFrom,'').trim()
			currObjectType = currObjectType.replace(tripleCommas,'')
		}
		else{
			if (lineNumber == 0){
				data += ('ObjectType,ReferencedType,'+line+'\r\n').replace(tripleCommas,',').replace(' ','')
			}
			else
			{	
				data += (mainObjectType+','+currObjectType+','+line+'\r\n').replace(tripleCommas,',')				
			}
		}
		lineNumber += 1
	}
	).on('close', () => {	
	  setMainObjectType(csvFile)
	  var newCSVFile = mainObjectType+'.csv'	
	  require('fs').writeFileSync(newCSVFile,data,'utf8');
	  console.log('Finished writing...'+newCSVFile);
	  //process.exit(0);
	});
}
function getFiles(){
	require('fs').readdir(filesDIR, function(err, items) {
		for (var i=0; i<items.length; i++) {
			if (items[i].indexOf(propertiesFileSuffix)>0){
				setMainObjectType(items[i])
				createCleanCSVFile(items[i],importIntoMySQL(items[i].replace(propertiesFileSuffix,'.csv')))
			}
		}
	});
	//generateLoopbackModel()
}
function importIntoMySQL(csvFile){
	//todo: check if mysql is running	
	var fullPathToFile = filesDIR + csvFile
	//console.log(fullPathToFile)
	var strSQL = "LOAD DATA INFILE '"+fullPathToFile+"'"// 
	strSQL += " INTO TABLE `"+destinationTable+"` FIELDS TERMINATED BY ','"//
	strSQL += " ENCLOSED BY '\"'"//
	strSQL += " LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;"
	//console.log(strSQL)
	//process.exit(0)
	mySQLCommandExec(strSQL)
	
}
function generateLoopbackModel(){
	strSQL = 'SELECT * FROM object_schemas'
	var res= mySQLCommandExec(strSQL)
	console.log(res)
}	
function mySQLCommandExec(strSQL){
	var mysql = require('mysql');
	var connection = mysql.createConnection(
		{
		  host     : '127.0.0.1',
		  port		:3306,
		  user     : 'root',
		  //password : 'webuser',
		  database : 'csv_db',
		}
	);
	
	connection.connect();
	var dbResponse = {}
	connection.query(strSQL, function(err, rows, fields) {
	if (err) throw err;
	
		//dbResponse.responseRows=rows,
		//dbResponse.responseFileds='fields'
//		console.log(dbResponse.responseRows[82].ObjectType)
	//console.log(fields[3].name)
		//return JSON.stringify(dbResponse)
	});
		
	connection.end()
}
getFiles()