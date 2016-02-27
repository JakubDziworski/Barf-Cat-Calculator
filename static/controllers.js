var mainApp = angular.module("mainApp", []);

mainApp.controller('rootController', function ($scope, getDataService,parseDataService) {
    $scope.entries=[];

    getDataService.getData().then(function (result) {
        var data = result.data;
        $scope.availableSubstances = parseDataService.getAvailableSubstances(data);
        $scope.availableComponents = parseDataService.getAvaialableComponents(data);
    });
    $scope.addNewEntry = function () {
        $scope.entries.push(new Entry($scope.availableComponents[0],new Weight(1000,'m')));
    };
    $scope.removeEntry = function (meat) {
        var array = $scope.entries;
        var index = array.indexOf(meat);
        array.splice(index, 1);
    };

    $scope.sumForSubstance = function (substance) {
        var total = 0;
        angular.forEach($scope.entries, function (entry) {
            var meat=entry.meat;
            var substancesMap=meat.substancesMap;
           total += substancesMap[substance.name]*1.0;
        });
        return total;
    };
});