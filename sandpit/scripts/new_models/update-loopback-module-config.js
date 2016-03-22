var fs = require('fs');
var loopback = require('loopback');
var Color = loopback.createModel('color', { 'name': String });
var obj;
var loopback_model_config_file = "D:/work/projects/mnike/foobar/server/model-config.JSON"
var loopback_model_config_file = "D:/work/arc-getting-started/server/model-config.JSON"
var config_file_to_add = "D:/work/tools/XAMPP/htdocs/schema_api/api/v1/models_folder/AcceptAction.JSON"
var models_folder = "D:/work/arc-getting-started/new_models"
var models_folder = "D:/work/tools/XAMPP/htdocs/schema_api/api/v1/models_folder"
//models_folder = models_folder.replace("\\","//")
var tmp_model_config = JSON.parse(fs.readFileSync(loopback_model_config_file, 'utf8'));
var tmp_new_model = JSON.parse(fs.readFileSync(config_file_to_add, 'utf8'));
var tmp_new_model_constr = (fs.readFileSync("D:/work/arc-getting-started/app_model_template.js", 'utf8')).replace("model_name",tmp_new_model.name)
console.log(models_folder)
function getFiles(){
	
	require('fs').readdir(models_folder, function(err, items) {
		for (var i=0; i<items.length; i++) {
			var item = (items[i]).toLowerCase()
			if (item.indexOf("json")>0){
				//setMainObjectType(items[i])
				//createCleanCSVFile(items[i],importIntoMySQL(items[i].replace(propertiesFileSuffix,'.csv')))
				console.log(items[i])
			}
			
		}
	});
	//generateLoopbackModel()
}

function writeit(){
	tmp_model_config[tmp_new_model.name] = {}//JS'{"dataSource": "db","public": true}'
	tmp_model_config[tmp_new_model.name].dataSource = "db" 
	tmp_model_config[tmp_new_model.name].public = true 
	
	fs.writeFileSync(loopback_model_config_file, JSON.stringify(tmp_model_config));
	//fs.writeFileSync(models_folder+tmp_new_model.name+".JSON", JSON.stringify(tmp_new_model));
}

function copyit(){
	//tmp_model_config[tmp_new_model.name] = tmp_model_config.sekolo
	//fs.writeFileSync(loopback_model_config_file, JSON.stringify(tmp_model_config));
	var model_filename = ((tmp_new_model.name).replace(/([A-Z])/g,"-$1").toLowerCase()).replace(/-/,"")
	
	fs.writeFileSync(models_folder+model_filename+".json", JSON.stringify(tmp_new_model));
	fs.writeFileSync(models_folder+model_filename+".js", tmp_new_model_constr);
	//module.exports = function(Sekolo){
		//console.log(loopback.createModel(tmp_new_model.name))
}
//writeit()
//copyit()
getFiles()
//console.log(tmp_model_config)
