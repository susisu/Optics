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
     * Returns whether the argument is required.
     * This method always returns `true`.
     * @returns {boolean} `true`.
     */
    isRequired() {
        return true;
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
     * Returns the default value, which is used when the argument is not specified.
     * @throws {Error} No default value for a requried argument.
     */
    getDefaultValue() {
        throw new Error("no default value");
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
     * Returns whether the argument is required.
     * This method always returns `false`.
     * @returns {boolean} `false`.
     */
    isRequired() {
        return false;
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
     */
    constructor(shortName, longName, arg, desc) {
        this.shortName = shortName;
        this.longName  = longName;
        this.arg       = arg;
        this.desc      = desc;
    }
}

endModule();
