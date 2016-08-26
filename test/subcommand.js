/*
 * Optics test / subcommand.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const option     = require("../lib/option.js");
const command    = require("../lib/command.js");
const subcommand = require("../lib/subcommand.js");
const output     = require("../lib/output.js");

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
            it("should throw a TypeError if 'cmdName' is not a string", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                let group = new subcommand.CommandGroup("test group", [subcmd], cmd);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(cmdName) {
                    return () => {
                        group.run(cmdName, out, [])
                    };
                }

                expect(call("test")).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'out' is not an instance of Output", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                let group = new subcommand.CommandGroup("test group", [subcmd], cmd);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(out) {
                    return () => {
                        group.run("test", out, [])
                    };
                }

                expect(call(out)).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call("foobar")).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'argv' is not an array of string", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let subcmd = new subcommand.Subcommand("test", cmd);
                let group = new subcommand.CommandGroup("test group", [subcmd], cmd);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(argv) {
                    return () => {
                        group.run("test", out, argv)
                    };
                }

                expect(call([])).not.to.throw(TypeError);
                expect(call(["nyan"])).not.to.throw(TypeError);
                expect(call(["nyan", "cat"])).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call("foobar")).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
                expect(call(["nyancat", 3.14, true])).to.throw(TypeError);
            });

            it("should run a corresponding subcommand", () => {
                let flag = false;
                let cmdA = new command.Command(
                    "foobar command",
                    [
                        new command.Argument("filename", x => x),
                        new command.OptionalArgument("num", 1, x => parseInt(x))
                    ],
                    [
                        new option.Option(
                            "s", undefined,
                            null,
                            "test1"
                        ),
                        new option.Option(
                            "t", undefined,
                            null,
                            "test2"
                        ),
                        new option.Option(
                            "f", "foo",
                            new option.OptionArgument("bar", x => x.toLowerCase()),
                            "foobar"
                        ),
                        new option.Option(
                            "n", "nyan",
                            new option.OptionalOptionArgument("cat", "DOG", x => x.toUpperCase()),
                            "nyancat"
                        )
                    ],
                    (args, opts) => {
                        expect(args).to.deep.equal({
                            filename: "foobar.txt",
                            num     : 24
                        });
                        expect(opts).to.deep.equal({
                            s   : true,
                            foo : "bar",
                            nyan: "DOG"
                        });
                        flag = true;
                    }
                );
                let cmdB = new command.Command(
                    "nyancat command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let cmdC = new command.Command(
                    "default command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let subcmdA = new subcommand.Subcommand("foobar", cmdA);
                let subcmdB = new subcommand.Subcommand("nyancat", cmdB);
                let group = new subcommand.CommandGroup("test group", [subcmdA, subcmdB], cmdC);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                expect(group.run("test", out, ["foobar", "-s", "--foo", "BAR", "foobar.txt", "--nyan", "24"]));
                expect(flag).to.be.true;
            });

            it("should run the default command if it exists and subcommand name is unspecified", () => {
                let flag = false;
                let cmdA = new command.Command(
                    "foobar command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let cmdB = new command.Command(
                    "nyancat command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let cmdC = new command.Command(
                    "default command",
                    [
                        new command.Argument("filename", x => x),
                        new command.OptionalArgument("num", 1, x => parseInt(x))
                    ],
                    [
                        new option.Option(
                            "s", undefined,
                            null,
                            "test1"
                        ),
                        new option.Option(
                            "t", undefined,
                            null,
                            "test2"
                        ),
                        new option.Option(
                            "f", "foo",
                            new option.OptionArgument("bar", x => x.toLowerCase()),
                            "foobar"
                        ),
                        new option.Option(
                            "n", "nyan",
                            new option.OptionalOptionArgument("cat", "DOG", x => x.toUpperCase()),
                            "nyancat"
                        )
                    ],
                    (args, opts) => {
                        expect(args).to.deep.equal({
                            filename: "foobar.txt",
                            num     : 24
                        });
                        expect(opts).to.deep.equal({
                            s   : true,
                            foo : "bar",
                            nyan: "DOG"
                        });
                        flag = true;
                    }
                );
                let subcmdA = new subcommand.Subcommand("foobar", cmdA);
                let subcmdB = new subcommand.Subcommand("nyancat", cmdB);
                let group = new subcommand.CommandGroup("test group", [subcmdA, subcmdB], cmdC);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                expect(group.run("test", out, ["foobar.txt", "-s", "--foo", "BAR", "--nyan", "24"]));
                expect(flag).to.be.true;
            });

            it("should call 'out.err' with error message if subcommand name and default command are not specified", () => {
                let flag = false;
                let cmdA = new command.Command(
                    "foobar command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let cmdB = new command.Command(
                    "nyancat command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let subcmdA = new subcommand.Subcommand("foobar", cmdA);
                let subcmdB = new subcommand.Subcommand("nyancat", cmdB);
                let group = new subcommand.CommandGroup("test group", [subcmdA, subcmdB], null);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    msg => {
                        expect(msg).to.equal("error: missing subcommand name");
                        flag = true;
                    }
                );
                expect(group.run("test", out, []));
                expect(flag).to.be.true;
            });

            it("shoud call 'out.err' with error message if subcommand name is unknown and default command is not specified", () => {
                let flag = false;
                let cmdA = new command.Command(
                    "foobar command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let cmdB = new command.Command(
                    "nyancat command",
                    [],
                    [],
                    (args, opts) => { throw new Error("unexpected call"); }
                );
                let subcmdA = new subcommand.Subcommand("foobar", cmdA);
                let subcmdB = new subcommand.Subcommand("nyancat", cmdB);
                let group = new subcommand.CommandGroup("test group", [subcmdA, subcmdB], null);
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    msg => {
                        expect(msg).to.equal("error: unknown subcommand name `piyo'");
                        flag = true;
                    }
                );
                expect(group.run("test", out, ["piyo"]));
                expect(flag).to.be.true;
            });
        });
    });
});
