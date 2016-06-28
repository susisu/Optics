/*
 * Optics
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({});
}

class Command {
    constructor(desc, options, args, action) {
        this.desc    = desc;
        this.options = options;
        this.args    = args;
        this.action  = action;
    }
}

class Argument {
    constructor(name) {
        this.name = name;
    }
}

class Option {
    constructor(shortName, longName, arg) {
        this.shortName = shortName;
        this.longName  = longName;
        this.arg       = arg;
    }
}

class Subcommand {
    constructor(name, cmd) {
        this.name = name;
        this.cmd  = cmd;
    }
}

class Group {
    constructor(desc, subcmds) {
        this.desc    = desc;
        this.subcmds = subcmds;
    }
}

endModule();
