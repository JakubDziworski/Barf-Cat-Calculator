var mainApp = angular.module("mainApp", []);

mainApp.controller('rootController', function ($scope, getDataService,parseDataService,calculatorService) {
    $scope.entries=[];

    getDataService.getData().then(function (result) {
        var data = result.data;
        $scope.availableSubstances = parseDataService.getAvailableSubstances(data);
        $scope.availableComponents = parseDataService.getAvaialableComponents(data);
    });
    $scope.addNewEntry = function () {
        $scope.entries.push(new Entry($scope.availableComponents[0],new Weight(1000,UNIT.GRAM)));
    };
    $scope.removeEntry = function (component) {
        var array = $scope.entries;
        var index = array.indexOf(component);
        array.splice(index, 1);
    };

    $scope.substanceAmountForEntry = function(entry,substance) {
        var component = entry.component;
        return entry.weight.unit.multiplier*entry.weight.value*component.substancesMap[substance.name];
    };

    $scope.sumForSubstance = function (substance) {
        var total = 0;
        angular.forEach($scope.entries, function (entry) {
           total += $scope.substanceAmountForEntry(entry,substance);
        });
        return total.toFixed(2);
    };

    $scope.diffForSubstance = function (substance) {
        var diff = $scope.sumForSubstance(substance) - substance.norm.value;
        if(diff > 0) return "+" + diff.toFixed(2);
        return diff.toFixed(2);
    };

    $scope.diffStatus = function (substance) {
        var diff = $scope.sumForSubstance(substance) - substance.norm.value;
        if (Math.abs(diff) < 0.2*substance.norm.value) return 0;
        return Math.sign(diff);
    }
});