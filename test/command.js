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
    describe("Argument", () => {
        describe("constructor(placeholder, reader)", () => {
            it("should create a new Argument instance", () => {
                let arg = new command.Argument("foobar", x => x);
                expect(arg).to.be.an.instanceOf(command.Argument);
            });

            it("should throw an error if 'placeholder' is not a string", () => {
                expect(() => { new command.Argument(null, x => x); }).to.throw(Error);
                expect(() => { new command.Argument(undefined, x => x); }).to.throw(Error);
                expect(() => { new command.Argument(3.14, x => x); }).to.throw(Error);
                expect(() => { new command.Argument(true, x => x); }).to.throw(Error);
                expect(() => { new command.Argument({}, x => x); }).to.throw(Error);
            });

            it("should throw an error if 'reader' is not a function", () => {
                expect(() => { new command.Argument("foobar", null); }).to.throw(Error);
                expect(() => { new command.Argument("foobar", undefined); }).to.throw(Error);
                expect(() => { new command.Argument("foobar", 3.14); }).to.throw(Error);
                expect(() => { new command.Argument("foobar", true); }).to.throw(Error);
                expect(() => { new command.Argument("foobar", {}); }).to.throw(Error);
            });
        });

        describe("#isRequired()", () => {
            it("should always return true", () => {
                let arg = new command.Argument("foobar", x => x);
                expect(arg.isRequired()).to.be.true;
            });
        });

        describe("#toPlaceholder()", () => {
            it("should return the placeholder wrapped by angles < and >");
        });

        describe("#getDefaultValue()", () => {
            it("should throw an error");
        });
    });

    describe("OptionalArgument", () => {
        describe("constructor(placeholder, defaultVal, reader)", () => {
            it("should create a new OptionalArgument instance");
            it("should throw an error if 'placeholder' is not a string");
            it("should throw an error if 'reader' is not a function");
        });

        describe("#isRequired()", () => {
            it("should always return false");
        });

        describe("#toPlaceholder()", () => {
            it("should return the placeholder wrapped by brackets [ and ]");
        });

        describe("#getDefaultValue()", () => {
            it("should return the default value specified at a constructor");
        });
    });

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
