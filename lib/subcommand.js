/*
 * Optics / subcommand.js
 * copyright (c) 2016 Susisu
 */

/**
 * @module subcommand
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Subcommand,
        CommandGroup
    });
}

const command = require("./command.js");

/**
 * The `Subcommand` associates a name with a command.
 * @static
 */
class Subcommand {
    constructor(name, cmd) {
        this.name = name;
        this.cmd  = cmd;
    }
}

/**
 * A `CommandGroup` instance represents a group of subcommands.
 * @static
 * @extends {module:command.CommandBase}
 */
class CommandGroup extends command.CommandBase {
    /**
     * Creates a new `CommandGroup` instance.
     * @param {string} desc The description of the command group.
     * @param {module:subcommand.Subcommand[]]} subcmds Subcommands the group contains.
     * @param {(module:command.CommandBase | null)} defaultCmd Default command, invoked when no subcommand is specified.
     */
    constructor(desc, subcmds, defaultCmd) {
        super();
        this.desc       = desc;
        this.subcmds    = subcmds;
        this.defaultCmd = defaultCmd;
    }
}

endModule();
