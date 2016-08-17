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
const output = require("./output.js");

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
     * Returns a string which is used as a placeholder in command description.
     * @returns {string} A string which is used as a placeholder.
     */
    toPlaceholder() {
        return `<${this.name}>`;
    }

    /**
     * Calls `reader` with an argument `val` and returns the result.
     * @param {string} val The string value given to `reader` as an argument.
     * @returns The return value of the function call of `reader`.
     * @throws {TypeError} `val` is not a string.
     */
    read(val) {
        if (typeof val !== "string") {
            throw new TypeError("val must be a string");
        }
        return this.reader.call(undefined, val);
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
     * Returns a string which is used as a placeholder in command description.
     * @returns {string} A string which is used as a placeholder.
     */
    toPlaceholder() {
        return `[${this.name}]`;
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
     * Parses `argv` and calls the associated action.
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
            let isRequired = !(arg instanceof OptionalArgument);
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

    /**
     * Parses `argv` and calls the associated action.
     * @param {string} cmdName The name used when the command was invoked.
     * @param {module:output.Output} out Output target.
     * @param {string[]} argv Command-line arguments.
     * @throws {TypeError} `cmdName` is not a string.
     * @throws {TypeError} `out` is not an instance of {@link module:output.Output}.
     * @throws {TypeError} `argv` is not an array of string.
     */
    run(cmdName, out, argv) {
        if (typeof cmdName !== "string") {
            throw new TypeError("cmdName must be a string");
        }
        if (!(out instanceof output.Output)) {
            throw new TypeError("out must be an instance of Output");
        }
        if (!Array.isArray(argv) || !argv.every(arg => typeof arg === "string")) {
            throw new TypeError("argv must be an array of string");
        }
        let optShortNames = new Map();
        let optLongNames  = new Map();
        for (let opt of this.opts) {
            if (opt.shortName !== undefined) {
                optShortNames.set(opt.shortName, opt);
            }
            if (opt.longName !== undefined) {
                optLongNames.set(opt.longName, opt);
            }
        }
        let optShortRE = /^-([^\-])(.+)?$/;
        let optLongRE  = /^--([^\-=]*)(=(.*))?$/;
        let argVals = {};
        let optVals = {};
        let argIndex = 0;
        let pendingOpt     = null;
        let pendingOptSpec = undefined;
        for (let rawArg of argv) {
            if (pendingOpt !== null) {
                let normOptName = pendingOpt.longName || pendingOpt.shortName;
                let optArg      = pendingOpt.arg.read(rawArg, optVals[normOptName]);
                if (pendingOpt instanceof SpecialOption && pendingOpt.invoke(this, cmdName, out, optArg)) {
                    return;
                }
                optVals[normOptName] = optArg;
                pendingOpt     = null;
                pendingOptSpec = undefined;
                continue;
            }
            // short name option
            let s = optShortRE.exec(rawArg);
            if (s !== null) {
                let optName   = s[1];
                let optArgStr = s[2];
                while (true) {
                    if (optShortNames.has(optName)) {
                        let opt         = optShortNames.get(optName);
                        let normOptName = opt.longName || opt.shortName;
                        if (opt.arg !== null) {
                            if (optArgStr !== undefined && optArgStr.length > 0) {
                                let optArg = opt.arg.read(optArgStr, optVals[normOptName]);
                                if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, optArg)) {
                                    return;
                                }
                                optVals[normOptName] = optArg;
                            }
                            else {
                                if (opt.arg instanceof option.OptionalOptionArgument) {
                                    if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, opt.arg.defaultVal)) {
                                        return;
                                    }
                                    optVals[normOptName] = opt.arg.defaultVal;
                                }
                                else {
                                    pendingOpt     = opt;
                                    pendingOptSpec = `-${optName}`;
                                }
                            }
                        }
                        else {
                            if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, true)) {
                                return;
                            }
                            optVals[normOptName] = true;
                            if (optArgStr !== undefined && optArgStr.length > 0) {
                                optName   = optArgStr[0];
                                optArgStr = optArgStr.substr(1);
                                continue;
                            }
                        }
                    }
                    else {
                        out.error(`error: unknown option \`-${optName}'\n`);
                        return;
                    }
                    break;
                }
                continue;
            }
            // long name option
            let l = optLongRE.exec(rawArg);
            if (l !== null) {
                let optName   = l[1];
                let optArgStr = l[3];
                if (optLongNames.has(optName)) {
                    let opt         = optLongNames.get(optName);
                    let normOptName = opt.longName || opt.shortName;
                    if (opt.arg !== null) {
                        if (optArgStr !== undefined && optArgStr.length > 0) {
                            let optArg = opt.arg.read(optArgStr, optVals[normOptName]);
                            if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, optArg)) {
                                return;
                            }
                            optVals[normOptName] = optArg;
                        }
                        else {
                            if (opt.arg instanceof option.OptionalOptionArgument) {
                                if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, opt.arg.defaultVal)) {
                                    return;
                                }
                                optVals[normOptName] = opt.arg.defaultVal;
                            }
                            else {
                                pendingOpt     = opt;
                                pendingOptSpec = `--${optName}`;
                            }
                        }
                    }
                    else {
                        if (opt instanceof SpecialOption && opt.invoke(this, cmdName, out, true)) {
                            return;
                        }
                        optVals[normOptName] = true;
                    }
                }
                else {
                    out.error(`error: unknown option \`--${optName}'\n`);
                    return;
                }
                continue;
            }
            // argument
            if (argIndex < this.args.length) {
                argVals[this.args[argIndex].name] = this.args[argIndex].read(rawArg);
                argIndex++;
            }
        }
        if (pendingOpt !== null) {
            out.error(`error: missing argument for \`${pendingOptSpec}'\n`);
            return;
        }
        while (argIndex < this.args.length) {
            if (this.args[argIndex] instanceof OptionalArgument) {
                argVals[this.args[argIndex].name] = this.args[argIndex].defaultVal;
            }
            else {
                out.error("error: too few argument\n");
                return;
            }
            argIndex++;
        }
        this.action.call(undefined, argVals, optVals);
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
     * Invokes the action associated to the option.
     * @param {module:command.CommandBase} cmd The command by which the option is invoked.
     * @param {string} cmdName The name of the command.
     * @param {module:output.Output} out Output target.
     * @param arg Argument given to the option.
     * @throws {TypeError} `cmd` is not an instance of {@link module:command.CommandBase}.
     * @throws {TypeError} `cmdName` is not a string.
     * @throws {TypeError} `out` is not an instance of {@link module:output.Output}.
     */
    invoke(cmd, cmdName, out, arg) {
        if (!(cmd instanceof CommandBase)) {
            throw new TypeError("cmd is not an instance of CommandBase");
        }
        if (typeof cmdName !== "string") {
            throw new TypeError("cmdName must be a string");
        }
        if (!(out instanceof output.Output)) {
            throw new TypeError("out is not an instance of Output");
        }
        return this.action.call(this, cmd, cmdName, out, arg);
    }
}

endModule();
