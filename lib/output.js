/*
 * Optics / output.js
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Output,
        std
    });
}

class Output {
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
let std = new Output(stdout, stderr);

endModule();
