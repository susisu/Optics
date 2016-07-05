/*
 * Optics test / command.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const command = require("../lib/command.js");
const output  = require("../lib/output.js");

describe("command", () => {
    describe("CommandBase", () => {
        describe("constructor()", () => {
            it("should create a new CommandBase instance", () => {
                let cmd = new command.CommandBase();
                expect(cmd).to.be.an.instanceOf(command.CommandBase);
            });
        });

        describe("#run(out, argv)", () => {
            it("should throw an Error", () => {
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                let cmd = new command.CommandBase();
                expect(() => { cmd.run(out, []); }).to.throw(Error);
            });
        });
    });

    describe("Command", () => {
        describe("constructor(desc, args, opts, action)", () => {
            it("should create a new Command instance");
            it("should throw an error if 'args' is not an array of Argument");
            it("should throw an error if 'opts' is not an array of Option");
            it("should throw an error if 'action' is not a function");
            it("should throw an error if a required argument occurs after an optional argument");
        });

        describe("#run(out, argv)", () => {
            it("should parse 'argv' and call the action with arguments and options if arguments are correct");
            it("should throw an error if 'out' is not an instance of Output");
            it("should throw an error if 'argv' is not an array");
            it("should write error message to 'out.err' if arguments are incorrect");
        });
    });
});
