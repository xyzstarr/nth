var AppData=[];
AppData={
    API:{
        BaseURL:{
            allonia:"http://allonia.co.za",
            thitos:"http://thitos:8080/webapps/apis",
            localhost:"http://localhost:8080/webapps/apis",
            techkc:"http://169.254.80.80:8080",
            calmcarnage:"http://169.254.80.80:8080"
        },
        APIEndPoint:"/loadshedding-api/api/",
        APIVersion:"v1/"
    },
    ErrorAlerts:0,
    UserSettings:{},
    Messages:{},
    Logs:[]
};

function addToLogs(obj){
    AppData.Logs.push(obj);
}
;

function ViewLogs(){
    console.log(AppData);
}
;

var apiURI=AppData.API.BaseURL.localhost;
var apiEndPoint=AppData.API.APIEndPoint;
var apiVersion=AppData.API.APIVersion;
var serviceBase=apiURI+apiEndPoint+apiVersion;
