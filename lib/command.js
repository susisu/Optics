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
        RequiredArgument,
        CommandBase,
        Command
    });
}

class Argument {
    constructor() {
    }
}

class OptionalArgument extends Argument {
    constructor(placeholder, defaultVal, reader) {
        super();
        this.placeholder = placeholder;
        this.defaultVal  = defaultVal;
        this.reader      = reader;
    }
}

class RequiredArgument extends Argument {
    constructor(placeholder, reader) {
        super();
        this.placeholder = placeholder;
        this.reader      = reader;
    }
}

/**
 * The `CommandBase` class is the base class of commands.
 * @static
 */
class CommandBase {
    /**
     * Create an instance of `CommandBase`.
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
 * The `Command` class represents an ordinary command.
 * @extends module:command.CommandBase
 * @static
 */
class Command extends CommandBase {
    /**
     * Create an instance of `Command`.
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
