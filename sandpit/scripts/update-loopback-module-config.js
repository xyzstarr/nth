var fs = require('fs');
var loopback = require('loopback');
var Color = loopback.createModel('color', { 'name': String });
var obj;
var loopback_model_config_file = "D:/work/dev/projects/mnike/foobar/server/model-config.JSON"
var loopback_model_config_file = "g:/18/work/arc-getting-started/server/model-config.JSON"
var config_file_to_add = "D:/work/tools/XAMPP/htdocs/schema_api/api/v1/models_folder/AcceptAction.JSON"
var models_folder = "g:/18/work/arc-getting-started/common/models/"
var file1 = JSON.parse(fs.readFileSync(loopback_model_config_file, 'utf8'));
var file2 = JSON.parse(fs.readFileSync(config_file_to_add, 'utf8'));
var file3 = (fs.readFileSync("g:/18/work/arc-getting-started/app_model_template.js", 'utf8')).replace("model_name",file2.name)
function writeit(){
	file1[file2.name] = file1.grotes
	fs.writeFileSync(loopback_model_config_file, JSON.stringify(file1));
	fs.writeFileSync(models_folder+file2.name+".JSON", JSON.stringify(file2));
}

function copyit(){
	//file1[file2.name] = file1.sekolo
	//fs.writeFileSync(loopback_model_config_file, JSON.stringify(file1));
	fs.writeFileSync(models_folder+file2.name+".JSON", JSON.stringify(file2));
	fs.writeFileSync(models_folder+file2.name+".js", file3);
	//module.exports = function(Sekolo){
		//console.log(loopback.createModel(file2.name))
}
writeit()
copyit()
//console.log(file1)
