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
        Command,
        SpecialOption
    });
}

const option = require("./option.js");

/**
 * An instance of the `Argument` class represents a (required) argument of command.
 * @static
 */
class Argument {
    /**
     * Creates a new `Argument` instance.
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
     * This method always returns `true` (i.e. an instance of `Argument` is always required).
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
        throw new Error("no default value");
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
     * Returns whether the argument is required.
     * This method always returns `false` (i.e. an instance of `OptionalArgument` is always not required).
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
     * @param {string} desc Description of the command.
     * @param {module:command.Argument[]} args Arguments of the command.
     * @param {module:option.Option[]} opts Options of the command.
     * @param {Function} action Action function, called when the command is invoked.
     * @throws {TypeError} `desc` is not a string.
     * @throws {TypeError} `args` is not an array of {@link module:command.Argument}.
     * @throws {TypeError} `opts` is not an array of {@link module:option.Option}.
     * @throws {TypeError} `action` is not a function.
     * @throws {Error} A required argument appears after an optional argument.
     */
    constructor(desc, args, opts, action) {
        if (typeof desc !== "string") {
            throw new TypeError("desc must be a string");
        }
        if (!Array.isArray(args) || !args.every(arg => arg instanceof Argument)) {
            throw new TypeError("args must be an array of Argument");
        }
        if (!Array.isArray(opts) || !opts.every(opt => opt instanceof option.Option)) {
            throw new TypeError("opts must be an array of Option");
        }
        if (typeof action !== "function") {
            throw new TypeError("action must be a function");
        }
        void args.reduce((ctx, arg) => {
            let isRequired = arg.isRequired();
            if (!ctx && isRequired) {
                throw new Error("A required argument must appear before all the optional arguments");
            }
            return ctx && isRequired;
        }, true);
        super();
        this.desc   = desc;
        this.args   = args;
        this.opts   = opts;
        this.action = action;
    }
}

/**
 * An instance of the `SpecialOption` class represents a special option.
 * The action associated to a special option is invoked on parsing command-line arguments,
 * and can interrupt its process.
 * @static
 * @extends {module:option.Option}
 */
class SpecialOption extends option.Option {
    /**
     * Creates a new instance of `SpecialOption`.
     * @param {(string | undefined)} shortName Short name of the option.
     * @param {(string | undefined)} longName Long name of the option.
     * @param {(module:option.OptionArgument | null)} arg Argument of the option.
     * If `null` is specified, the option has no argument.
     * @param {string} desc Description of the option.
     * @param {Function} action A function associated to the option.
     * @throws {TypeError} `action` is not a function.
     */
    constructor(shortName, longName, arg, desc, action) {
        if (typeof action !== "function") {
            throw new TypeError("action must be a function");
        }
        super(shortName, longName, arg, desc);
        this.action = action;
    }

    /**
     * Returns if the option is a special option.
     * This method always returns `true`.
     * @returns {boolean} `true`.
     */
    isSpecial() {
        return true;
    }

    /**
     * Invokes the action associated to the option.
     * @param {module:command.CommandBase} cmd The command by which the option is invoked.
     * @param {module:output.Output} out Output target.
     * @param arg Argument given to the option.
     */
    invoke(cmd, out, arg) {
        return this.action.call(this, cmd, out, arg);
    }
}

endModule();
