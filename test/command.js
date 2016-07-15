/*
 * Optics test / command.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const command = require("../lib/command.js");
const option  = require("../lib/option.js");
const output  = require("../lib/output.js");

describe("command", () => {
    describe("Argument", () => {
        describe("constructor(name, reader)", () => {
            it("should create a new Argument instance", () => {
                let arg = new command.Argument("foobar", x => x);
                expect(arg).to.be.an.instanceOf(command.Argument);
            });

            it("should throw a TypeError if 'name' is not a string", () => {
                expect(() => { new command.Argument(null, x => x); }).to.throw(TypeError);
                expect(() => { new command.Argument(undefined, x => x); }).to.throw(TypeError);
                expect(() => { new command.Argument(3.14, x => x); }).to.throw(TypeError);
                expect(() => { new command.Argument(true, x => x); }).to.throw(TypeError);
                expect(() => { new command.Argument({}, x => x); }).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                expect(() => { new command.Argument("foobar", null); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", undefined); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", 3.14); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", true); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", {}); }).to.throw(TypeError);
            });
        });

        describe("#isRequired()", () => {
            it("should always return true", () => {
                let arg = new command.Argument("foobar", x => x);
                expect(arg.isRequired()).to.be.true;
            });
        });

        describe("#toPlaceholder()", () => {
            it("should return the name wrapped by angles < and >", () => {
                {
                    let arg = new command.Argument("foobar", x => x);
                    expect(arg.toPlaceholder()).to.equal("<foobar>");
                }
                {
                    let arg = new command.Argument("nyancat", x => x);
                    expect(arg.toPlaceholder()).to.equal("<nyancat>");
                }
            });
        });

        describe("#getDefaultValue()", () => {
            it("should throw an error", () => {
                let arg = new command.Argument("foobar", x => x);
                expect(() => { arg.getDefaultValue(); }).to.throw(Error);
            });
        });
    });

    describe("OptionalArgument", () => {
        describe("constructor(name, defaultVal, reader)", () => {
            it("should create a new OptionalArgument instance", () => {
                let arg = new command.OptionalArgument("foobar", "none", x => x);
                expect(arg).to.be.an.instanceOf(command.OptionalArgument);
            });

            it("should throw a TypeError if 'name' is not a string", () => {
                expect(() => { new command.OptionalArgument(null, "none", x => x); }).to.throw(TypeError);
                expect(() => { new command.OptionalArgument(undefined, "none", x => x); }).to.throw(TypeError);
                expect(() => { new command.OptionalArgument(3.14, "none", x => x); }).to.throw(TypeError);
                expect(() => { new command.OptionalArgument(true, "none", x => x); }).to.throw(TypeError);
                expect(() => { new command.OptionalArgument({}, "none", x => x); }).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                expect(() => { new command.Argument("foobar", "none", null); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", "none", undefined); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", "none", 3.14); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", "none", true); }).to.throw(TypeError);
                expect(() => { new command.Argument("foobar", "none", {}); }).to.throw(TypeError);
            });
        });

        describe("#isRequired()", () => {
            it("should always return false", () => {
                let arg = new command.OptionalArgument("foobar", "none", x => x);
                expect(arg.isRequired()).to.be.false;
            });
        });

        describe("#toPlaceholder()", () => {
            it("should return the name wrapped by brackets [ and ]", () => {
                {
                    let arg = new command.OptionalArgument("foobar", "none", x => x);
                    expect(arg.toPlaceholder()).to.equal("[foobar]");
                }
                {
                    let arg = new command.OptionalArgument("nyancat", "none", x => x);
                    expect(arg.toPlaceholder()).to.equal("[nyancat]");
                }
            });
        });

        describe("#getDefaultValue()", () => {
            it("should return the default value specified at a constructor", () => {
                {
                    let arg = new command.OptionalArgument("foobar", "none", x => x);
                    expect(arg.getDefaultValue()).to.equal("none");
                }
                {
                    let arg = new command.OptionalArgument("foobar", 3.14, x => x);
                    expect(arg.getDefaultValue()).to.equal(3.14);
                }
            });
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
            it("should create a new Command instance", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                expect(cmd).to.be.an.instanceOf(command.Command);
            });

            it("should throw a TypeError if 'desc' is not a string", () => {
                function construct(desc) {
                    return () => {
                        new command.Command(
                            desc,
                            [],
                            [],
                            (args, opts) => {}
                        );
                    };
                }
                expect(construct("test command")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'args' is not an array of Argument", () => {
                function construct(args) {
                    return () => {
                        new command.Command(
                            "test command",
                            args,
                            [],
                            (args, opts) => {}
                        );
                    };
                }

                expect(construct([])).not.to.throw(TypeError);
                expect(construct([
                    new command.Argument("foobar", x => x)
                ])).not.to.throw(TypeError);
                expect(construct([
                    new command.OptionalArgument("nyancat", "nyan", x => x)
                ])).not.to.throw(TypeError);
                expect(construct([
                    new command.Argument("foobar", x => x),
                    new command.OptionalArgument("nyancat", "nyan", x => x)
                ])).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("args")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
                expect(construct([null])).to.throw(TypeError);
                expect(construct([undefined])).to.throw(TypeError);
                expect(construct(["args"])).to.throw(TypeError);
                expect(construct([3.14])).to.throw(TypeError);
                expect(construct([true])).to.throw(TypeError);
                expect(construct([{}])).to.throw(TypeError);
                expect(construct([() => {}])).to.throw(TypeError);
            });

            it("should throw a TypeError if 'opts' is not an array of Option", () => {
                function construct(opts) {
                    return () => {
                        new command.Command(
                            "test command",
                            [],
                            opts,
                            (args, opts) => {}
                        );
                    };
                }

                expect(construct([])).not.to.throw(TypeError);
                expect(construct([
                    new option.Option(
                        "t", "test",
                        new option.OptionArgument("nyan", x => x),
                        "test option"
                    )
                ])).not.to.throw(TypeError);
                expect(construct([
                    new option.Option(
                        "t", "test",
                        new option.OptionArgument("nyan", x => x),
                        "test option"
                    ),
                    new option.Option(
                        "c", "cat",
                        new option.OptionalOptionArgument("cat", "neko", x => x),
                        "specify a cat"
                    )
                ])).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("args")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
                expect(construct([null])).to.throw(TypeError);
                expect(construct([undefined])).to.throw(TypeError);
                expect(construct(["args"])).to.throw(TypeError);
                expect(construct([3.14])).to.throw(TypeError);
                expect(construct([true])).to.throw(TypeError);
                expect(construct([{}])).to.throw(TypeError);
                expect(construct([() => {}])).to.throw(TypeError);
            });

            it("should throw a TypeError if 'action' is not a function", () => {
                function construct(action) {
                    return () => {
                        new command.Command(
                            "test command",
                            [],
                            [],
                            action
                        );
                    };
                }

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw an error if a required argument occurs after an optional argument", () => {
                function construct(args) {
                    return () => {
                        new command.Command(
                            "test command",
                            args,
                            [],
                            (args, opts) => {}
                        );
                    };
                }

                expect(construct([
                    new command.Argument("foobar", x => x),
                    new command.OptionalArgument("nyancat", "nyan", x => x)
                ])).not.to.throw(Error);

                expect(construct([
                    new command.OptionalArgument("nyancat", "nyan", x => x),
                    new command.Argument("foobar", x => x)
                ])).to.throw(Error);
            });
        });

        describe("#run(out, argv)", () => {
            it("should parse 'argv' and call the action with arguments and options if arguments are correct");
            it("should throw an error if 'out' is not an instance of Output");
            it("should throw an error if 'argv' is not an array");
            it("should write error message to 'out.err' if arguments are incorrect");
        });
    });
});
