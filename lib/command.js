/*
 * Optics / command.js
 * copyright (c) 2016 Susisu
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

class CommandBase {
    constructor() {
    }
}

class Command extends CommandBase {
    constructor(desc, opts, args, action) {
        super();
        this.desc   = desc;
        this.opts   = opts;
        this.args   = args;
        this.action = action;
    }
}

endModule();
