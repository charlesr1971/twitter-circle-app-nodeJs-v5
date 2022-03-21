"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTheme = void 0;
function readTheme(materialThemes, id) {
    var result = {};
    materialThemes.map(function (currentValue, index) {
        if (currentValue['id'] === id) {
            result = currentValue;
        }
    });
    return result;
}
exports.readTheme = readTheme;
//# sourceMappingURL=readTheme.js.map