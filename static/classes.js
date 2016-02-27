/**
 * Created by kuba on 27.02.16.
 */

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