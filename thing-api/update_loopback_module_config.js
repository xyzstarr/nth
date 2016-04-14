var fs = require('fs');
var loopback = require('loopback');

var loopback_app_folder = "D:/work/dev/nth/thing-api/"
var loopback_model_config_file = loopback_app_folder+"server/model-config.json"
var schema_models_folder = "D:/work/dev/nth/data_dumps/schema_models/"
var generated_models_folder = schema_models_folder+"generated_loopback_models/"
var loopback_model_templates_folder = schema_models_folder+"loopback_model_templates/"
//var config_file_to_add = "D:/work/dev/projects/data_dumps/schema_models/generated_loopback_models/AcceptAction.JSON"
var models_folder = loopback_app_folder+"common/models/"

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
	//console.log(new_model_js_template)
	//console.log(new_model_filename)
	//console.log(new_model.name)
	if (json_file =="AchieveAction.json"){
		console.log(app_config_data[new_model.name])
	}
	this_model = app_config_data[new_model.name]
	//console.log(app_config_data)
	//console.log(new_model_filename)
	app_config_data[new_model.name] = {}//dataSource:'db',public:true}
	if((typeof app_config_data[new_model.name]) !== typeof undefined){
		app_config_data[new_model.name].dataSource = "db" 
		app_config_data[new_model.name].public = true 
	
		console.log("\tGenerating files for " + new_model.name)
		fs.writeFileSync(loopback_model_config_file, JSON.stringify(app_config_data));
		fs.writeFileSync(models_folder+new_model_filename+".json", JSON.stringify(new_model));
		fs.writeFileSync(models_folder+new_model_filename+".js", new_model_js_template);
		console.log("remember to move used json files...")
	}
	else
	{
		console.log("\t"+(typeof app_config_data[new_model.name]))
		console.log("\tFailed to generate files for " + new_model.name+"\n\tCheck that undefined bug!!!")
	}
	//fs.writeFileSync(models_folder+new_model.name+".JSON", JSON.stringify(new_model));
}

//generateLoopbackModels
getModelDefintions()
