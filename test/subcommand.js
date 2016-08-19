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
            it("should create a new CommandGroup instance", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                let group = new subcommand.CommandGroup("test group", [subcmd], cmd);
                expect(group).to.be.an.instanceOf(subcommand.CommandGroup);
            });

            it("should throw a TypeError if 'desc' is not a string", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                function construct(desc) {
                    return () => {
                        new subcommand.CommandGroup(desc, [subcmd], cmd);
                    };
                }
                expect(construct("test group")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'subcmds' is not an array of Subcommand", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                function construct(subcmds) {
                    return () => {
                        new subcommand.CommandGroup("test group", subcmds, cmd);
                    };
                }
                expect(construct([])).not.to.throw(TypeError);
                expect(construct([subcmd])).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'defaultCmd' is not an instance of CommandBase nor null", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                function construct(defaultCmd) {
                    return () => {
                        new subcommand.CommandGroup("test group", [subcmd], defaultCmd);
                    };
                }
                expect(construct(cmd)).not.to.throw(TypeError);
                expect(construct(null)).not.to.throw(TypeError);

                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });
        });

        describe("run(cmdName, out, argv)", () => {
            it("should throw a TypeError if 'cmdName' is not a string");
            it("should throw a TypeError if 'out' is not an instance of Output");
            it("should throw a TypeError if 'argv' is not an array of string");
            it("should run a corresponding subcommand");
            it("should run the default command if it exists and subcommand name is unspecified");
            it("should call 'out.err' with error message if subcommand name and default command are unspecified");
        });
    });
});
