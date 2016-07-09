/*
 * Optics / command.js
 * copyright (c) 2016 Susisu
 */

/**
 * @module command
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Argument,
        OptionalArgument,
        CommandBase,
        Command
    });
}

/**
 * An instance of the `Argument` class represents a (required) argument of command.
 * @static
 */
class Argument {
    /**
     * Creates a new `Argument` instance.
     * @param {string} name A string used in placeholder.
     * @param {Function} reader A function which reads value given as argument.
     * @throws {Error} `name` is not a string.
     * @throws {Error} `reader` is not a function.
     */
    constructor(name, reader) {
        if (typeof name !== "string") {
            throw new Error("name must be a string");
        }
        if (typeof reader !== "function") {
            throw new Error("reader must be a function");
        }
        this.name   = name;
        this.reader = reader;
    }

    /**
     * Returns if the argument is required.
     * This returns always `true` (i.e. an instance of `Argument` is always required).
     * @returns {boolean} `true`.
     */
    isRequired() {
        return true;
    }

    /**
     * Returns a string which is used as a placeholder in command description.
     * @returns {string} A string which is used as a placeholder.
     */
    toPlaceholder() {
        return `<${this.name}>`;
    }

    /**
     * Returns the default value, which is used when the argument is not specified.
     * @throws {Error} No default value for a required argument.
     */
    getDefaultValue() {
        throw new Error("No default value");
    }
}

/**
 * An instance of the `OptionalArgument` class represents an optional argument of command with a default value.
 * @static
 * @extends {module:command.Argument}
 */
class OptionalArgument extends Argument {
    /**
     * Creates a new `OptionalArgument` instance.
     * @param {string} name A string used in placeholder.
     * @param defaultVal The default value, which is used when the argument is not specified.
     * @param {Function} reader A function which reads value given as argument.
     * @throws {Error} `name` is not a string.
     * @throws {Error} `reader` is not a function.
     */
    constructor(name, defaultVal, reader) {
        super(name, reader);
        this.defaultVal = defaultVal;
    }

    /**
     * Returns if the argument is required.
     * This returns always `false` (i.e. an instance of `OptionalArgument` is always not required).
     * @returns {boolean} `false`.
     */
    isRequired() {
        return false;
    }

    /**
     * Returns a string which is used as a placeholder in command description.
     * @returns {string} A string which is used as a placeholder.
     */
    toPlaceholder() {
        return `[${this.name}]`;
    }

    /**
     * Returns the default value, which is used when the argument is not specified.
     * @returns The default value specified at the constructor.
     */
    getDefaultValue() {
        return this.defaultVal;
    }
}

/**
 * The `CommandBase` class is the base class of commands.
 * @static
 */
class CommandBase {
    /**
     * Creates an instance of `CommandBase`.
     */
    constructor() {
    }

    /**
     * Parse `argv` and run action associated with the command.
     * @param {module:output.Output} out Output target.
     * @param {string[]} argv Command-line arguments.
     * @throws {Error} Not implemented.
     */
    run(out, argv) {
        throw new Error("not implemented");
    }
}

/**
 * An instance of the `Command` class represents an ordinary command.
 * @extends module:command.CommandBase
 * @static
 */
class Command extends CommandBase {
    /**
     * Creates an instance of `Command`.
     * @param {string} desc
     * @param {module:command.Argument[]} args
     * @param {module:option.Option[]} opts
     * @param {Function} action
     */
    constructor(desc, args, opts, action) {
        super();
        this.desc   = desc;
        this.args   = args;
        this.opts   = opts;
        this.action = action;
    }
}

endModule();
