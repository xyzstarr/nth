//var current_object_type
var projects_folder = "D:/work/dev/projects/"
var data_dumps_folder = projects_folder+"data_dumps/"

var raw_csv_files_folder = data_dumps_folder +"schema_models/csv/raw/"
var processed_csv_files_folder = data_dumps_folder +"schema_models/csv/processed/"
var properties_file_suffix = '_properties.csv'
var db_destination_table = 'object_schemas'
var main_object_type = ''
var all_raw_csvs_processed = false
function setMainObjectType(csv_data_file){
	main_object_type = csv_data_file.replace(properties_file_suffix,'')
}
function createCleanCSVDataFile(csv_data_file){
	var current_object_type = main_object_type
	var properties_from = 'Properties from'
	var triple_commas = ',,, '
	var data = ''
	var lineNumber = 0
	//console.log(csv_data_file)
	raw_csv_file = raw_csv_files_folder + csv_data_file
	var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream(raw_csv_file)
	});

	lineReader.on('line', function (line){
		
		setMainObjectType(csv_data_file)
		if(line.indexOf(properties_from) > 0){
			current_object_type = line.replace(properties_from,'').trim()
			current_object_type = current_object_type.replace(triple_commas,'')
		}
		else{
			if (lineNumber == 0){
				data += ('ObjectType,ReferencedType,'+line+'\r\n').replace(triple_commas,',').replace(' ','')
			}
			else
			{	
				data += (main_object_type+','+current_object_type+','+line+'\r\n').replace(triple_commas,',')				
			}
		}
		lineNumber += 1
	}
	).on('close', () => {	
	  setMainObjectType(csv_data_file)
	  var new_csv_data_file = processed_csv_files_folder+main_object_type+'.csv'	
	  require('fs').writeFileSync(new_csv_data_file,data,'utf8');
	  console.log('Finished writing...'+new_csv_data_file);
	  //process.exit(0);
	});
}

function getFiles(){
	require('fs').readdir(raw_csv_files_folder, function(err, items) {
		for (var i=0; i<(items.length + 1); i++) {
			if (i == items.length){
					importIntoMySQL()
				}
				else{
			if (items[i].indexOf(properties_file_suffix)>0){
				setMainObjectType(items[i])
				//createCleanCSVDataFile(items[i],importIntoMySQL(items[i].replace(properties_file_suffix,'.csv')))
				createCleanCSVDataFile(items[i])//,importIntoMySQL(items[i].replace(properties_file_suffix,'.csv')))
				}
			}
		}
	});
	//generateLoopbackModel()
}

getFiles()
function importIntoMySQL(){
		require('fs').readdir(processed_csv_files_folder, function(err, items) {
		for (var i=0; i<items.length; i++) {			
			//if (items[i].indexOf(properties_file_suffix)>0){
				setMainObjectType(items[i])
				csv_data_file = items[i].replace(properties_file_suffix,'.csv')
				//importIntoMySQL(items[i].replace(properties_file_suffix,'.csv'))
				//todo: check if mysql is running	
				var full_path_to_file = processed_csv_files_folder + csv_data_file
				console.log(full_path_to_file)
				var strSQL = "LOAD DATA INFILE '"+full_path_to_file+"'"// 
				strSQL += " INTO TABLE `"+db_destination_table+"` FIELDS TERMINATED BY ','"//
				strSQL += " ENCLOSED BY '\"'"//
				strSQL += " LINES TERMINATED BY '\\r\\n' IGNORE 1 LINES;"
				//console.log(strSQL)
				//process.exit(0)
				mySQLCommandExec(strSQL)
			//}
		}
	});
	

	
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
	});
		
	connection.end()
}