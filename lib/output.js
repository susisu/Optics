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
     * @throws {TypeError} `out` is not a function.
     * @throws {TypeError} `err` is not a function.
     */
    constructor(out, err) {
        if (typeof out !== "function") {
            throw new TypeError("out must be a function");
        }
        if (typeof err !== "function") {
            throw new TypeError("err must be a function");
        }
        this.out = out;
        this.err = err;
    }

    /**
     * Calls the output function `out`.
     * @param {string} msg The output message.
     * @returns {undefined}
     * @throws {TypeError} `msg` is not a string.
     */
    output(msg) {
        if (typeof msg !== "string") {
            throw new TypeError("msg must be a string");
        }
        this.out.call(undefined, msg);
    }

    /**
     * Calls the error output function `err'.
     * @param {string} msg The error message.
     * @returns {undefined}
     * @throws {TypeError} `msg` is not a string.
     */
    error(msg) {
        if (typeof msg !== "string") {
            throw new TypeError("msg must be a string");
        }
        this.err.call(undefined, msg);
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
