/*
 * Optics / option.js
 * copyright (c) 2016 Susisu
 */

/**
 * @module option
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        OptionArgument,
        OptionalOptionArgument,
        Option
    });
}

/**
 * An instance of `OptionArgument` represents an argument of option.
 * @static
 */
class OptionArgument {
    /**
     * Creates a new `OptionArgument` instance.
     * @param {string} name A string used in placeholder.
     * @param {Function} reader A function which reads value given as argument.
     */
    constructor(name, reader) {
        this.name   = name;
        this.reader = reader;
    }
}

/**
 * An instance of `OptionalOptionArgument` represents an optional argument of option.
 * @static
 * @extends {module:option.OptionArgument}
 */
class OptionalOptionArgument extends OptionArgument {
    /**
     * Creates a new `OptionalOptionArgument` instance.
     * @param {string} name A string used in placeholder.
     * @param defaultVal The default value, which is used when the argument is not specified.
     * @param {Function} reader A function which reads value given as argument.
     */
    constructor(name, defaultVal, reader) {
        super(name, reader);
        this.defaultVal = defaultVal;
    }
}

class Option {
    constructor(shortName, longName, arg, desc) {
        this.shortName = shortName;
        this.longName  = longName;
        this.arg       = arg;
        this.desc      = desc;
    }
}

endModule();
