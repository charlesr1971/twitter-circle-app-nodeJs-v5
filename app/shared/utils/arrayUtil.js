"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toObject = exports.arrayExclude = exports.arrayInclude = void 0;
function arrayInclude(array1, array2) {
    var array = array1.filter(function (item) {
        return array2.includes(item);
    });
    return array;
}
exports.arrayInclude = arrayInclude;
function arrayExclude(array1, array2) {
    var array = array1.filter(function (item) {
        return !array2.includes(item);
    });
    return array;
}
exports.arrayExclude = arrayExclude;
function toObject(arr) {
    var obj = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var pair = arr_1[_i];
        if (Object(pair) !== pair) {
            throw new TypeError('iterable for fromEntries should yield objects');
        }
        // Consistency with Map: contract is that entry has "0" and "1" keys, not
        // that it is an array or iterable.
        var key = pair[0], val = pair[1];
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: val,
        });
    }
    return obj;
}
exports.toObject = toObject;
//# sourceMappingURL=arrayUtil.js.map