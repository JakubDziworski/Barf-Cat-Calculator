var mainApp = angular.module("mainApp", []);

var Entry = function (meat,weight) {
    this.meat=meat;
    this.weight=weight;
};

var Meat = function (name, substancesMap) {
    this.name = name;
    this.substancesMap = substancesMap;
};

Meat.prototype.toStringWithWeight = function () {
    return this.name;
};

var Weight = function (weightValue, weightUnit) {
    this.value = weightValue;
    this.unit = weightUnit;
};

Weight.prototype.toString = function () {
    return this.value + " " + this.unit;
};

var UNIT = {
    GRAM : { value : 'g' },
    MILIGRAM : { value : 'mg' },
    PERCENTAGE : {value : '%'}
};

var Substance = function (name,properWeight) {
    this.name = name;
    this.properWeight=properWeight;
};

mainApp.service('getDataService', function ($http, $q) {
    var deffered = $q.defer();
    $http.get("ajax/getData").then(function (data) {
        deffered.resolve(data);
    });

    this.getData = function () {
        return deffered.promise;
    }
});

mainApp.controller('rootController', function ($scope, getDataService) {
    getDataService.getData().then(function (result) {
        var data = result.data;
        console.log(result);
        $scope.data = data;
        $scope.availableSubstances = $.map(data["jednostka"], function (substanceUnit,substanceName) {
            return new Substance(substanceName,new Weight(5,substanceUnit));
        });
        $scope.availableMeats = $.map(data, function (meatSubstances,meatName ) {
            var substancesMap = {};
            angular.forEach(meatSubstances,function (substanceWeight,substanceName) {
                substancesMap[substanceName]=substanceWeight;
            });
            return new Meat(meatName,substancesMap);
        });
    });
    $scope.entries=[];
    $scope.addNewEntry = function () {
        $scope.entries.push(new Entry($scope.availableMeats[0],new Weight(1000,'m')));
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

mainApp.controller('chooseMeatController', function ($scope) {

});