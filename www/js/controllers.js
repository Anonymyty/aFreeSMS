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

.controller('PlaylistCtrl', function($scope, $stateParams, $ionicLoading, $ionicPopup, $http) {

    $scope.imgcode = "";
    $scope.smsto = "";
    $scope.message = "";
    $scope.msgLen = "900";
    $scope.imgcode = "";

    function sendFree() {
        console.log('$scope.message: ',$scope.message);
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

        var un = 'jbagaresgaray';
        var pwd = 'bagares30';
        var dstno = $scope.smsto || $('#smsto').val();
        var msg = $scope.message || $('#message').val();
        var sendid = '09394049310';

        $http.get('http://isms.com.my/isms_send.php?un=' + un + '&pwd=' + pwd + '&dstno=' + dstno + '&msg=' + msg + '&type=1&sendid=' + sendid)
            .success(function(data, status, headers, config) {
                console.log('status: ', status);
                console.log('success: ', data);
            })
            .error(function(data, status, headers, config) {
                console.log('status: ', status);
                console.log('error: ', data);
            });
    }

    $scope.sendFree = function() {
        sendFree();
    };
});
