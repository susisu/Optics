/*
 * Optics / subcommand.js
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Subcommand
    });
}

const command = require("./command.js");

class Subcommand {
    constructor(name, cmd) {
        this.name = name;
        this.cmd  = cmd;
    }
}

class GroupCommand extends command.CommandBase {
    constructor(desc, subcmds) {
        super();
        this.desc    = desc;
        this.subcmds = subcmds;
    }
}

endModule();
