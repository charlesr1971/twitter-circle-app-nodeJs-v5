"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = void 0;
function createTheme(theme) {
    var debug = false;
    var themeObj = theme;
    var atheme = themeObj['themeName'].toString() === '0' ? '' : themeObj['themeName'];
    var result = {
        default: 'theme-1-dark',
        id: 1,
        stem: 'theme-1',
        light: 'theme-1-light',
        dark: 'theme-1-dark',
        colorName: '',
        primaryIndex: '',
        primaryHex: '',
        colorNameTitle: ''
    };
    if (debug) {
        console.log('http.service: createTheme(): atheme ', atheme);
    }
    if (atheme !== '') {
        result['default'] = atheme + '-dark';
        var themeArray = atheme.split('-');
        if (Array.isArray(themeArray) && themeArray.length === 2) {
            var id = parseInt(themeArray[1], 10);
            result['id'] = id;
            result['stem'] = 'theme-' + id;
            result['light'] = 'theme-' + id + '-light';
            result['dark'] = 'theme-' + id + '-dark';
            result['colorName'] = themeObj['colorName'];
            result['primaryIndex'] = themeObj['primaryIndex'];
            result['primaryHex'] = themeObj['primaryHex'];
            var colorNameTitle = themeObj['colorName'].replace('$', '').replace(/[-]+/gim, ' ');
            result['colorNameTitle'] = colorNameTitle;
        }
    }
    if (debug) {
        console.log('util: createTheme(): result ', result);
    }
    return result;
}
exports.createTheme = createTheme;
//# sourceMappingURL=createTheme.js.map