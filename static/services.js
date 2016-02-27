/**
 * Created by kuba on 27.02.16.
 */

mainApp.service('getDataService', function ($http, $q) {
    var deffered = $q.defer();

    $http.get("ajax/getData").then(function (data) {
        deffered.resolve(data);
    });

    this.getData = function () {
        return deffered.promise;
    };
});

mainApp.service('parseDataService', function () {

    this.getAvaialableComponents = function (data) {
        return $.map(data["SubstancesForComponent"], function (meatSubstances, meatName) {
            var substancesMap = {};
            angular.forEach(meatSubstances, function (substanceWeight, substanceName) {
                substancesMap[substanceName] = substanceWeight;
            });
            return new Meat(meatName, substancesMap);
        });
    };

    this.getAvailableSubstances = function (data) {
        return $.map(data["Substances"], function (substanceValue,substanceName) {
            return new Substance(substanceName,new Weight(substanceValue["Norm"],substanceValue["Unit"]));
        });
    };
});
