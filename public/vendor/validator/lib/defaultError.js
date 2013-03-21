define(["require"], function(require) {

    var __dirname = "/vendor/validator/lib",
    __filename    = "/vendor/validator/lib/defaultError.js",
    module        = { exports: {} },
    exports       = module.exports,
    define        = undefined,
    window        = exports;

    

    var defaultError = module.exports = {
    isEmail: 'Invalid email',
    isUrl: 'Invalid URL',
    isIP: 'Invalid IP',
    isAlpha: 'Invalid characters',
    isAlphanumeric: 'Invalid characters',
    isHexadecimal: 'Invalid hexadecimal',
    isHexColor: 'Invalid hexcolor',
    isNumeric: 'Invalid number',
    isLowercase: 'Invalid characters',
    isUppercase: 'Invalid characters',
    isInt: 'Invalid integer',
    isDecimal: 'Invalid decimal',
    isDivisibleBy: 'Not divisible',
    notNull: 'String is empty',
    isNull: 'String is not empty',
    notEmpty: 'String is empty',
    equals: 'Not equal',
    contains: 'Invalid characters',
    notContains: 'Invalid characters',
    regex: 'Invalid characters',
    notRegex: 'Invalid characters',
    len: 'String is not in range',
    isUUID: 'Not a UUID',
    isDate: 'Not a date',
    isAfter: 'Invalid date',
    isBefore: 'Invalid date',
    isIn: 'Unexpected value or invalid argument',
    notIn: 'Unexpected value or invalid argument',
    min: 'Invalid number',
    max: 'Invalid number',
    isArray: 'Not an array',
    isCreditCard: 'Invalid credit card'
};



    return module.exports;
});