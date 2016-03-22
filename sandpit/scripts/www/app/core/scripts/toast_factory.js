(function(){
    angular.module('loadshedding.app')
            .factory('ToastFactory',[fnToast]);
    function fnToast(){
        var fnToastWarning;
        var fnToastInfo;
        var fnToastError;
        var fnToastSuccess;
        var toastOptions;
        toastr.options={
            "closeButton":true,
            //"debug":true,
            "newestOnTop":true,
            "progressBar":true,
            "positionClass":"toast-bottom-center",
            "preventDuplicates":true,
            "showDuration":"2000",
            "hideDuration":"1000",
            "timeOut":0,
            "extendedTimeOut":0,
            "showEasing":"easeOutBounce",
            "hideEasing":"easeOutElastic",
            "showMethod":"slideDown",
            "hideMethod":"slideUp",
            "tapToDismiss":false
        };
        //toastr.success('Your have successfully signed up. However, we need you to activate your email address within 48 hours. Otherwise, we\'ll have to deactivate your account. In which case you will need to request a new activation key. Thank You<br /><br /><button type="button" class="button clear">OK</button>',"Well Done");

        toastOptions=function(){
            return {
                "closeButton":true,
                //"debug":true,
                "newestOnTop":true,
                "progressBar":true,
                "positionClass":"toast-bottom-center",
                "preventDuplicates":true,
                "showDuration":"5000",
                "hideDuration":"5000",
                "timeOut":3000,
                "extendedTimeOut":0,
                "showEasing":"easeOutBounce",
                "hideEasing":"easeOutElastic",
                "showMethod":"slideDown",
                "hideMethod":"slideUp",
                "tapToDismiss":false
            };
        };
        fnToastSuccess=function(result){
            toastr.options=toastOptions();
            toastr.success(result.data.message);
        };
        fnToastError=function(result){
            toastr.options=toastOptions();
            if(typeof result.data!=='undefined')
            {
                toastr.error(result.data.message);
            }
        };
        fnToastInfo=function(result){
            toastr.options=toastOptions();
            toastr.info(result.data.message);
        };
        fnToastWarning=function(result){
            toastr.options=toastOptions();
            toastr.warning(result.data.message);
        };
        return{
            success:fnToastSuccess,
            error:fnToastError,
            info:fnToastInfo,
            warning:fnToastWarning
        };
    }
})();
