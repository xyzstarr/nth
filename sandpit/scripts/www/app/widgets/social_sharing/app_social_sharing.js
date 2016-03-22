(function(){
    "use strict";
    angular
            .module('loadshedding.app')
            .directive('socialSharingButtons',fnSocialSharingDirective)
            .controller('SocialSharingController',['$scope','$ionicPlatform','$cordovaContacts','$cordovaSocialSharing','$ionicActionSheet','toast',fnSocialSharingController]);
    function fnSocialSharingDirective(){
        return {
            restrict: 'E',
            scope: true,
            controller: 'SocialSharingController',
            templateUrl: 'app/widgets/social_sharing/app_social_sharing.html'
        };
    }
    ;

    function fnSocialSharingController($scope,$ionicPlatform,$cordovaContacts,$cordovaSocialSharing,$ionicActionSheet,toast){
        $scope.rateUs = function(){
            if($ionicPlatform.is('ios')){
                window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
            } else if($ionicPlatform.is('android')){
                window.open('market://details?id=<package_name>');
            }
        };
        $scope.showSocialSharingActionsheet = function(){
            $ionicActionSheet.show({
                buttons: [
                    {
                        text: '<i class="icon ion-social-twitter"></i> Twitter'
                    },//Index = 0
                    {
                        text: '<i class="icon ion-social-whatsapp"></i> WhatsApp'
                    },
                    {
                        text: '<i class="icon ion-social-facebook"></i> Facebook'
                    },
                    {
                        text: '<i class="icon ion-chatbubble-working"></i> SMS'
                    },
                    {
                        text: '<i class="icon ion-android-mail"></i> Mail'
                    },
                    {
                        text: '<i class="icon ion-android-share-alt"></i> More Sharing Options...'
                    },
                    {
                        text: '<i class="icon ion-android-star" ng-click="rateUs()"></i> Rate Us'
                    }
                ],
                //destructiveText: 'Delete',
                titleText: 'Share the Love',
                cancelText: 'Cancel',
                buttonClicked: function(index){
                    switch(index) {
                        case 0 :
                            tweet();
                            return true;
                        case 1 :
                            wapp();
                            return true;
                        case 2 :
                            fb();
                            return true;
                        case 3 :
                            sms();
                            return true;
                        case 4 :
                            mail();
                            return true;
                        case 5 :
                            share();
                            return true;
                    }
                }
            });

        };

        $scope.getContactList = function(){
            $cordovaContacts.find({
                filter: '',
                multiple: true
            })
                    .then(function(result){
                        $scope.contacts = result;
                    },function(error){
                        console.log("ERROR: "+error);
                    });
        };

        //Stuff for the invite message
        var thankYouMessage = "Thanks for spreading the word!!!";
        var message = "Check out this awesome Load Shedding app.";
        var subject = "Stay on top of Load shedding!";
        var file = "file";
        var link = "https://github.com/a3rosol/huggr";
        var image = "https://github.com/a3rosol/huggr/blob/master/huggr/www/img/icon.png";

        var share = function(){
            $cordovaSocialSharing.share(message,subject,file,link) // Share via native share sheet
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });

        };
        var tweet = function(){
            $cordovaSocialSharing
                    .shareViaTwitter(message,image,link)
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });
        };
        var wapp = function(){
            $cordovaSocialSharing
                    .shareViaWhatsApp(message,image,link)
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });
        };
        var fb = function(){
            $cordovaSocialSharing
                    .shareViaFacebook(message,image,link)
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });

        };
        var sms = function(){
            // access multiple numbers in a string like: '0612345678,0687654321'
            $cordovaSocialSharing
                    .shareViaSMS(message)
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });
        };
        var mail = function(){
            // TO, CC, BCC must be an array, Files can be either null, string or array
            $cordovaSocialSharing
                    .shareViaEmail(message,subject)
                    .then(function(result){
                        toast.pop(thankYouMessage);
                    },function(err){
                        console.log(err);
                    });
        };


    }
})();
