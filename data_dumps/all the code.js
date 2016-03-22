var shell = require('shelljs');
shell.exec("D:\\work\\tools\\wget\\wget64 http://localhost:8086/schema/api/v1/create-object-models");

//var current_object_type
var projects_folder = "D:/work/dev/projects/"
var data_dumps_folder = projects_folder+"data_dumps/"

var raw_csv_files_folder = data_dumps_folder +"schema_models/csv/raw/"
var processed_csv_files_folder = data_dumps_folder +"schema_models/csv/processed/"
var properties_file_suffix = '_properties.csv'
var db_destination_table = 'object_schemas'
var main_object_type = ''
function setMainObjectType(csv_data_file){
	main_object_type = csv_data_file.replace(properties_file_suffix,'')
}
function createCleanCSVDataFile(csv_data_file,callback){
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
		for (var i=0; i<items.length; i++) {
			if (items[i].indexOf(properties_file_suffix)>0){
				setMainObjectType(items[i])
				createCleanCSVDataFile(items[i],importIntoMySQL(items[i].replace(properties_file_suffix,'.csv')))
			}
		}
	});
	//generateLoopbackModel()
}


function importIntoMySQL(csv_data_file){
	//todo: check if mysql is running	
	var full_path_to_file = processed_csv_files_folder + csv_data_file
	//console.log(full_path_to_file)
	var strSQL = "LOAD DATA INFILE '"+full_path_to_file+"'"// 
	strSQL += " INTO TABLE `"+db_destination_table+"` FIELDS TERMINATED BY ','"//
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
	});
		
	connection.end()
}

getFiles()





var loopback_app_folder = "D:/work/arc-getting-started/"
var loopback_model_config_file = loopback_app_folder+"server/model-config.json"
var schema_models_folder = "D:/work/dev/projects/data_dumps/schema_models/"
var generated_models_folder = schema_models_folder+"generated_loopback_models/"
var loopback_model_templates_folder = schema_models_folder+"loopback_model_templates/"
//var config_file_to_add = "D:/work/dev/projects/data_dumps/schema_models/generated_loopback_models/AcceptAction.JSON"
var models_folder = loopback_app_folder+"/common/models/"

var app_config_data = JSON.parse(fs.readFileSync(loopback_model_config_file, 'utf8'));

//var new_model = JSON.parse(fs.readFileSync(config_file_to_add, 'utf8'));
//var new_model_js_template = (fs.readFileSync(loopback_model_templates_folder+"app_model_template.js", 'utf8')).replace("model_name",new_model.name)

function getModelDefintions(){
	console.log("Retrieving contents of "+generated_models_folder)
	require('fs').readdir(generated_models_folder, function(err, items) {
		for (var i=0; i<items.length; i++) {
			var item = (items[i]).toLowerCase()
			if (item.indexOf("json")>0){
				//Create new Loopback formatted JSON and JS files
				//Also update the Loopback shipped model-config.json
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+items[i].replace(".json","")+"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
				console.log("\tGenerating model for " + items[i].replace(".json",""))
				generateLoopbackModel(items[i])
			}
			
		}
	});
}

function generateLoopbackModel(json_file){
	config_file_to_add = generated_models_folder + json_file
	
	
	file_contents = fs.readFileSync(config_file_to_add, 'utf8')
	if(file_contents.length < 1){
		console.log("\t"+json_file.replace(".json","") + " is empty, skipping file.")
		return
	}
	
	new_model = JSON.parse(file_contents);
	new_model_js_template = (fs.readFileSync(loopback_model_templates_folder+"app_model_template.js", 'utf8')).replace("model_name",new_model.name)
	new_model_filename = ((new_model.name).replace(/([A-Z])/g,"-$1").toLowerCase()).replace(/-/,"")
	
	app_config_data[new_model.name].dataSource = "db" 
	app_config_data[new_model.name].public = true 
	
	console.log("\tGenerating files for " + new_model.name)
	fs.writeFileSync(loopback_model_config_file, JSON.stringify(app_config_data));
	fs.writeFileSync(models_folder+new_model_filename+".json", JSON.stringify(new_model));
	fs.writeFileSync(models_folder+new_model_filename+".js", new_model_js_template);

	//fs.writeFileSync(models_folder+new_model.name+".JSON", JSON.stringify(new_model));
}

//generateLoopbackModels
getModelDefintions()
