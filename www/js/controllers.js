angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
})

.controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup) {
    var ord = Math.random();
    ord = ord * 10000000000000000000;

    function xajax_processMsg() {
        return xajax.call("\u0070\u0072\157\u0063\145\u0073\u0073\u004d\u0073\u0067", arguments, 1);
        $ionicLoading.hide();
    }

    function xajax_viewSMS() {
        return xajax.call("\u0076\151\145\u0077\u0053\u004d\u0053", arguments, 1);
    }

    function xajax_adBlock() {
        return xajax.call("\141\u0064\u0042\u006c\157\u0063\u006b", arguments, 1);
    }

    function xajax_sel() {
        return xajax.call("\u0073\145\u006c", arguments, 1);
    }

    function sendFree() {
        /*$ionicLoading.show({
            template: 'Please wait...'
        });*/
        xajax_processMsg(xajax.getFormValues("smsform"));
        return false
    }

    $scope.image = 'http://afreesms.com/image.php?o=' + ord;

    $scope.refreshImage = function() {
        var ord = Math.random();
        ord = ord * 10000000000000000000;

        $scope.image = 'http://afreesms.com/image.php?o=' + ord;
    };

    $scope.sendFree = function() {
        if ($('#smsto').val() === '') {
            $ionicPopup.alert({
                title: 'WARNING',
                template: 'Mobile Number is empty'
            });
            return;
        } else if ($('#message').val() === '') {
            $ionicPopup.alert({
                title: 'WARNING',
                template: 'Message is empty'
            });
            return;
        } else if ($('#imgcode').val() === '') {
            $ionicPopup.alert({
                title: 'WARNING',
                template: 'Verification Code is empty'
            });
            return;
        }

        sendFree();
    };

    $(document).ready(function() {
        console.log('x900e45f43df28adb1e558fa3106c2078: ', x900e45f43df28adb1e558fa3106c2078);
        if (x900e45f43df28adb1e558fa3106c2078) {
            eraseCookie("\x61\x64\x62\x78")
        } else {
            xajax_adBlock();
            createCookie("\x61\x64\x62\x78", 1, 1)
        }
    });

    RDset(1);

});
