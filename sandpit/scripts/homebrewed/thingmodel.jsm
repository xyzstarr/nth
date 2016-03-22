'use strict';

// expose to the world
//module.exports = thingmodel;

/**
 * Parses structured e-mail addresses from an address field
 *
 * Example:
 *
 *    'Name <address@domain>'
 *
 * will be converted to
 *
 *     [{name: 'Name', address: 'address@domain'}]
 *
 * @param {String} model_name Model,Thing,etc
 * @return {Array} An array of address objects
 */
function updateModelConfig(model_name) {
    var fs = require('fs');
    var shell = require('shelljs')
    var modelInstance = appVariables();
    modelInstance.configData = JSON.parse(fs.readFileSync(modelInstance.loopback_model_config_file, 'utf8'));

    modelInstance.configData[model_name] = {dataSource: "db", public: true};

    
    var modelDotJS = ((model_name).replace(/([A-Z])/g, "-$1").toLowerCase()).replace(/-/, "")
    modelDotJS += ".js"
    var modelDotJSON = modelDotJS + "on"
    var copyJSCMD = 'copy "' + modelInstance.generated_models_folder + modelDotJS + '" "' + modelInstance.loopback_app_folder + 'common/models/' + modelDotJS + '"'
    var copyJSONCMD = 'copy "' + modelInstance.generated_models_folder + modelDotJSON + '" "' + modelInstance.loopback_app_folder + 'common/models/' + modelDotJSON + '"'
    copyJSCMD = copyJSCMD.replace(/\//g, "\\")
    copyJSONCMD = copyJSONCMD.replace(/\//g, "\\")
    //console.log(copyJSONCMD)
    var jsCopied = false
    if ((shell.exec(copyJSCMD)).code == 0){
        jsCopied = true
    };
    
    var jsonCopied = false
    //var s = ;
    //console.log(s.code)
    if ((shell.exec(copyJSONCMD)).code == 0){
        jsonCopied = true
    };
    //
    //
    //if(jsCopy.indexOf('The system cannot find the file specified') < 0){
     //       jsCopied = true
     //   }
    
    //jsCopy = shell.exec(copyJSONCMD, {async: true});
//    jsCopy.stdout.on('data', function (data) {
//        /* ... do something with data ... */
//        //console.log(data)
//        if(data.indexOf('The system cannot find the file specified') < 0){
//            jsCopied = true
//        }
//        
//    });

 //   var jsonCopied = false
   // var jsonCopy = shell.exec(copyJSONCMD);
//        if(jsonCopy.indexOf('The system cannot find the file specified') < 0){
//            jsCopied = true
//        }
  //console.log(jsonCopy)  
    //jsonCopy = shell.exec(copyJSONCMD, {async: true});
//    jsonCopy.stdout.on('data', function (data) {
//        /* ... do something with data ... */
//        //console.log(data)
//        if(data.indexOf('The system cannot find the file specified') < 0){
//            jsonCopied = true
//        }
//    });
if (jsCopied && jsonCopied){
fs.writeFileSync(modelInstance.loopback_model_config_file, JSON.stringify(modelInstance.configData));
console.log('model created')
}
else
{console.log(jsonCopied)
    console.log('model not created')}
}
;
function appVariables() {
    var app = {}
    app.loopback_app_folder = "C:/Users/Admin/Documents/NetBeansProjects/nthing/"
    app.loopback_model_config_file = app.loopback_app_folder + "server/model-config.json"
    app.generated_models_folder = "D:/work/arc-getting-started/common/models/"
    return app
}

//updateModelConfig('DateTime')
//updateModelConfig('MedicalStudy')
//updateModelConfig('MedicalEntity')
//updateModelConfig('MedicalTherapy')
//updateModelConfig('Airport')
//updateModelConfig('DrugStrength')
//updateModelConfig('DrugCost')
//updateModelConfig('MedicalSpecialty')
//updateModelConfig('Organization')
//updateModelConfig('Action')
updateModelConfig('DrugPrescriptionStatus')
//updateModelConfig('DrugPregnancyCategory')
//updateModelConfig('DrugClass')
//updateModelConfig('DrugLegalStatus')
//updateModelConfig('MedicineSystem')
//updateModelConfig('ContactPoint')
//updateModelConfig('Person')
//updateModelConfig('Photograph')
//updateModelConfig('Offer')
//updateModelConfig('Demand')
//updateModelConfig('PropertyValue')
//updateModelConfig('Review')
//updateModelConfig('ImageObject')
//updateModelConfig('OfferCatalog')
//updateModelConfig('Place')
//updateModelConfig('OwnershipInfo')
//updateModelConfig('GeoCoordinates')
//updateModelConfig('QuantitativeValue')
//updateModelConfig('OpeningHoursSpecification')
//updateModelConfig('AggregateRating')
//updateModelConfig('Event')
//updateModelConfig('Thing')
//updateModelConfig('EntryPoint')
//updateModelConfig('MedicalContraindication')
//updateModelConfig('DoseSchedule')
//updateModelConfig('MedicalIndication')
//updateModelConfig('MedicalCode')
//updateModelConfig('MedicalGuideline')
//updateModelConfig('MedicalStudy')
//updateModelConfig('MedicalEntity')
//updateModelConfig('MedicalTherapy')
updateModelConfig('MedicalContraindication')
updateModelConfig('MedicalIndication')
updateModelConfig('MedicalCode')
updateModelConfig('MedicalGuideline')
updateModelConfig('MedicalStudy')
updateModelConfig('MedicalEntity')
updateModelConfig('MedicalTherapy')
updateModelConfig('URL')
updateModelConfig('Text')
updateModelConfig('MedicalSpecialty')
updateModelConfig('Organization')
updateModelConfig('MedicineSystem')
updateModelConfig('Photograph')
updateModelConfig('PropertyValue')
updateModelConfig('Review')
updateModelConfig('ImageObject')
updateModelConfig('Place')
updateModelConfig('OpeningHoursSpecification')
updateModelConfig('Event')
updateModelConfig('AdministrativeArea')
updateModelConfig('DrugCostCategory')
updateModelConfig('CreativeWork')
updateModelConfig('ActionStatusType')
updateModelConfig('Person')
updateModelConfig('DateTime')
updateModelConfig('Property')
updateModelConfig('Language')
updateModelConfig('ContactPointOption')
updateModelConfig('Country')