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
     * @throws {TypeError} `name` is not a string.
     * @throws {TypeError} `reader` is not a function.
     */
    constructor(name, reader) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        if (typeof reader !== "function") {
            throw new TypeError("reader must be a function");
        }
        this.name   = name;
        this.reader = reader;
    }

    /**
     * Returns a string used as a placeholder of the argument of a short-named option.
     * @returns {string} A string used as a placeholder.
     */
    toShortPlaceholder() {
        return this.name;
    }

    /**
     * Returns a string used as a placeholder of the argument of a long-named option.
     * @returns {string} A string used as a placeholder.
     */
    toLongPlaceholder() {
        return `=${this.name}`;
    }

    /**
     * Calls `reader` with arguments `val` and `accum`, and returns the result.
     * @param {string} val The string value given to `reader` as an argument.
     * @param accum  The accumulated value.
     * @returns The return value of the function call of `reader`.
     * @throws {TypeError} `val` is not a string.
     */
    read(val, accum) {
        if (typeof val !== "string") {
            throw new TypeError("val must be a string");
        }
        return this.reader.call(undefined, val, accum);
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

    /**
     * Returns a string used as a placeholder of the argument of a short-named option.
     * @returns {string} A string used as a placeholder.
     */
    toShortPlaceholder() {
        return `[${this.name}]`;
    }

    /**
     * Returns a string used as a placeholder of the argument of a long-named option.
     * @returns {string} A string used as a placeholder.
     */
    toLongPlaceholder() {
        return `[=${this.name}]`;
    }
}

/**
 * An instance of `Option` represents a command-line option of command.
 * @static
 */
class Option {
    /**
     * Creates an new instance of `Option`
     * @param {(string | undefined)} shortName Short name of the option.
     * @param {(string | undefined)} longName Long name of the option.
     * @param {(module:option.OptionArgument | null)} arg Argument of the option.
     * If `null` is specified, the option has no argument.
     * @param {string} desc Description of the option.
     * @throws {TypeError} `shortName` is not a string nor undefined.
     * @throws {Error} The length of `shortName` is not 1.
     * @throws {TypeError} `longName` is not a string nor undefined.
     * @throws {Error} The length of `longName` is 0.
     * @throws {Error} Both `shortName` and `longName` are undefined.
     * @throws {TypeError} `arg` is not an instance of OptionArgument nor null.
     * @throws {TypeError} `desc` is not a string.
     */
    constructor(shortName, longName, arg, desc) {
        if (typeof shortName !== "string" && typeof shortName !== "undefined") {
            throw new TypeError("shortName must be a string or undefined");
        }
        if (typeof shortName === "string" && shortName.length !== 1) {
            throw new Error("the length of shortName must be 1");
        }
        if (typeof longName !== "string" && typeof longName !== "undefined") {
            throw new TypeError("longName must be a string or undefined")
        }
        if (typeof longName === "string" && longName.length === 0) {
            throw new Error("the length of longName must be greater than 0");
        }
        if (typeof shortName === "undefined" && typeof longName === "undefined") {
            throw new Error("one of shortName or longName must be specified");
        }
        if (!(arg instanceof OptionArgument) && arg !== null) {
            throw new TypeError("arg must be an instance of OptionArgument or null");
        }
        if (typeof desc !== "string") {
            throw new TypeError("desc must be a string");
        }
        this.shortName = shortName;
        this.longName  = longName;
        this.arg       = arg;
        this.desc      = desc;
    }
}

endModule();
