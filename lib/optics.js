/*
 * Optics / optics.js
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        option,
        command,
        subcommand,
        output
    });
}

const option     = require("./option.js");
const command    = require("./command.js");
const subcommand = require("./subcommand.js");
const output     = require("./output.js");

endModule();
