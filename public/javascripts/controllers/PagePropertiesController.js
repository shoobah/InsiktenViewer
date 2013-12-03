/*global app */
app.controller('InsiktenCtrl', function ($scope, $http) {
    'use strict';
    $scope.handleIdChange = function () {
        $http.get('/page:' + $scope.pageId).then(function (res) {
            $scope.items = res.data.Properties;
        });
    };
    $scope.randomPage = function () {
        var pid = Math.floor(Math.random() * 40000) + 3;
        $scope.pageId = pid;
        $scope.handleIdChange();
    };
    $scope.getAllData = function () {
        $http.get('/all').then(function (res) {
            var i;
            $scope.pageNames = [];
            for (i = 0; i < res.data.length; i++) {
                $scope.pageNames.push({ pageName: res.data[i].PageName, id: res.data[i].Id });
            }
        });
    };
});