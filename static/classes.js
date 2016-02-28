/**
 * Created by kuba on 27.02.16.
 */

var Entry = function (component,weight) {
    this.component=component;
    this.weight=weight;
};

var Component = function (name, substancesMap) {
    this.name = name;
    this.substancesMap = substancesMap;
};

Component.prototype.toStringWithWeight = function () {
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
    GRAM :  { name : 'g', multiplier : 0.01 } ,
    MILIGRAM  : { name : 'mg' , multiplier : 0.001 } ,
    PERCENTAGE  : { name : '%' , multiplier : 0.1 }
};

var Substance = function (name,norm) {
    this.name = name;
    this.norm=norm;
};