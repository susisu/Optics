/*
 * Optics test / subcommand.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const command    = require("../lib/command.js");
const subcommand = require("../lib/subcommand.js");

describe("subcommand", () => {
    describe("Subcommand", () => {
        describe("constructor(name, cmd)", () => {
            it("should create a new Subcommand instance", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                expect(subcmd).to.be.an.instanceOf(subcommand.Subcommand);
            });

            it("should throw a TypeError if 'name' is not a string", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                function construct(name) {
                    return () => {
                        new subcommand.Subcommand(name, cmd);
                    };
                }
                expect(construct("test")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'cmd' is not an instance of CommandBase", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                function construct(cmd) {
                    return () => {
                        new subcommand.Subcommand("test", cmd);
                    };
                }
                expect(construct(cmd)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });
        });
    });

    describe("CommandGroup", () => {
        describe("constructor(desc, subcmds, defaultCmd)", () => {
            it("should create a new CommandGroup instance");
            it("should throw a TypeError if 'desc' is not a string");
            it("should throw a TypeError if 'subcmds' is not an array of Subcommand");
            it("should throw a TypeError if 'defaultCmd' is not an instance of CommandBase nor null");
        });
    });
});
