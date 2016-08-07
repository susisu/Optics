/*
 * Optics / output.js
 * copyright (c) 2016 Susisu
 */

/**
 * @module output
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Output,
        std
    });
}

/**
 * The `Output` class represents pair of output and error output function.
 * An instance of this class is used as the output target of the error and help messages of a command.
 * @static
 */
class Output {
    /**
     * Creates a new `Output` instance.
     * @param {Function} out A function used as an output target.
     * @param {Function} err A function used as an error output target.
     */
    constructor(out, err) {
        this.out = out;
        this.err = err;
    }
}

let stdout = process && process.stdout && process.stdout.write
    ? x => process.stdout.write(x)
    : x => { throw new Error("no stdout"); }
let stderr = process && process.stderr && process.stderr.write
    ? x => process.stderr.write(x)
    : x => { throw new Error("no stderr"); }
/**
 * The standard output target (stdout and stderr).
 * @static
 * @type {module:output.Output}
 */
let std = new Output(stdout, stderr);

endModule();
