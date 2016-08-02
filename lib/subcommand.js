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
    /**
     * Creates a new `Subcommand` instance.
     * @param {string} name The name of the subcommand.
     * @param {module:command.CommandBase} cmd The command associated to the name.
     * @throws {TypeError} `name` is not a string.
     * @throws {TypeError} `cmd` is not an instance of {@link module:command.CommandBase}.
     */
    constructor(name, cmd) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        if (!(cmd instanceof command.CommandBase)) {
            throw new TypeError("cmd must be an instance of CommandBase");
        }
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
     * @param {module:subcommand.Subcommand[]} subcmds Subcommands the group contains.
     * @param {(module:command.CommandBase | null)} defaultCmd Default command, invoked when no subcommand is specified.
     * @throws {TypeError} `desc` is not a string.
     * @throws {TypeError} `subcmds` is not an array of {@link module:subcommand.Subcommand}.
     * @throws {TypeError} `defaultCmd` is not an instance of {@link module:command.CommandBase} nor null.
     */
    constructor(desc, subcmds, defaultCmd) {
        if (typeof desc !== "string") {
            throw new TypeError("desc must be a string");
        }
        if (!Array.isArray(subcmds) || !subcmds.every(subcmd => subcmd instanceof Subcommand)) {
            throw new TypeError("args must be an array of Subcommand");
        }
        if (!(defaultCmd instanceof command.CommandBase) && defaultCmd !== null) {
            throw new TypeError("defaultCmd must be an instance of Command or null")
        }
        super();
        this.desc       = desc;
        this.subcmds    = subcmds;
        this.defaultCmd = defaultCmd;
    }
}

endModule();
