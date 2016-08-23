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
                function construct(name) {
                    return () => {
                        new command.Argument(name, x => x);
                    };
                }

                expect(construct("foobar")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                function construct(reader) {
                    return () => {
                        new command.Argument("foobar", reader);
                    };
                }

                expect(construct(x => x)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
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

        describe("#read(val)", () => {
            it("should call 'reader' with an argument 'val' and return the result", () => {
                let flag = false;
                let arg = new command.Argument("foobar", x => {
                    expect(x).to.equal("24");
                    flag = true;
                    return parseInt(x);
                });
                expect(arg.read("24")).to.equal(24);
                expect(flag).to.be.true;
            });

            it("should throw a TypeError if 'val' is not a string", () => {
                let arg = new command.Argument("foobar", x => {
                    if (typeof x !== "string") {
                        throw new Error("unexpected call");
                    }
                });
                function call(val) {
                    return () => {
                        arg.read(val);
                    };
                }

                expect(call("foobar")).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });
        })
    });

    describe("OptionalArgument", () => {
        describe("constructor(name, defaultVal, reader)", () => {
            it("should create a new OptionalArgument instance", () => {
                let arg = new command.OptionalArgument("foobar", "none", x => x);
                expect(arg).to.be.an.instanceOf(command.OptionalArgument);
            });

            it("should throw a TypeError if 'name' is not a string", () => {
                function construct(name) {
                    return () => {
                        new command.OptionalArgument(name, "none", x => x);
                    };
                }

                expect(construct("foobar")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                function construct(reader) {
                    return () => {
                        new command.OptionalArgument("foobar", "none", reader);
                    };
                }

                expect(construct(x => x)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
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
    });

    describe("CommandBase", () => {
        describe("constructor()", () => {
            it("should create a new CommandBase instance", () => {
                let cmd = new command.CommandBase();
                expect(cmd).to.be.an.instanceOf(command.CommandBase);
            });
        });

        describe("#generateHelpText(cmdName)", () => {
            it("should throw an Error", () => {
                let cmd = new command.CommandBase();
                expect(() => { cmd.generateHelpText("test"); }).to.throw(Error);
            });
        });

        describe("#run(cmdName, out, argv)", () => {
            it("should throw an Error", () => {
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                let cmd = new command.CommandBase();
                expect(() => { cmd.run("test", out, []); }).to.throw(Error);
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

            it("should throw an error if a required argument appears after an optional argument", () => {
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

        describe("#run(cmdName, out, argv)", () => {
            it("should throw a TypeError if 'cmdName' is not a string", () => {
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(cmdName) {
                    return () => {
                        cmd.run(cmdName, out, []);
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
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(out) {
                    return () => {
                        cmd.run("test", out, []);
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
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(argv) {
                    return () => {
                        cmd.run("test", out, argv);
                    };
                }

                expect(call([])).not.to.throw(TypeError);
                expect(call(["-e", "wWWwwwwWWww"])).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call("foobar")).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
                expect(call([3.14, "hello", true])).to.throw(TypeError);
            });

            it("should parse 'argv' and call the action with arguments and options if parsing succeeded", () => {
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                // no arguments, no options
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [],
                        (args, opts) => {
                            expect(args).to.deep.equal({});
                            expect(opts).to.deep.equal({});
                            flag = true;
                        }
                    );
                    cmd.run("test", out, []);
                    expect(flag).to.be.true;
                }
                // arguments but ignored, no options
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [],
                        (args, opts) => {
                            expect(args).to.deep.equal({});
                            expect(opts).to.deep.equal({});
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["foobar", "nyancat"]);
                    expect(flag).to.be.true;
                }
                // one argument, no options
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [
                            new command.Argument("param", x => x)
                        ],
                        [],
                        (args, opts) => {
                            expect(args).to.deep.equal({ param: "foobar" });
                            expect(opts).to.deep.equal({});
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["foobar", "nyancat"]);
                    expect(flag).to.be.true;
                }
                // multiple arguments, no options
                {
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [
                                new command.Argument("param", x => x),
                                new command.OptionalArgument("num", 1, x => parseInt(x))
                            ],
                            [],
                            (args, opts) => {
                                expect(args).to.deep.equal({
                                    param: "foobar",
                                    num  : 1
                                });
                                expect(opts).to.deep.equal({});
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["foobar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [
                                new command.Argument("param", x => x),
                                new command.OptionalArgument("num", 1, x => parseInt(x))
                            ],
                            [],
                            (args, opts) => {
                                expect(args).to.deep.equal({
                                    param: "foobar",
                                    num: 24
                                });
                                expect(opts).to.deep.equal({});
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["foobar", "24"]);
                        expect(flag).to.be.true;
                    }
                }
                // no arguments, one option without argument
                {
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [new option.Option("t", "test", null, "test option")],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({});
                                flag = true;
                            }
                        );
                        cmd.run("test", out, []);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [new option.Option("t", undefined, null, "test option")],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ t: true });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-t"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [new option.Option(undefined, "test", null, "test option")],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: true });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--test"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [new option.Option("t", "test", null, "test option")],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: true });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-t"]);
                        expect(flag).to.be.true;
                    }
                }
                // no arguments, one option with required argument
                {
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", undefined,
                                    new option.OptionArgument("foo", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ t: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-tbar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", undefined,
                                    new option.OptionArgument("foo", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ t: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-t", "bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    undefined, "test",
                                    new option.OptionArgument("foo", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--test=bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    undefined, "test",
                                    new option.OptionArgument("foo", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--test", "bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", "test",
                                    new option.OptionArgument("foo", x => x.toUpperCase()),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "BAR" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-tbar"]);
                        expect(flag).to.be.true;
                    }
                }
                // no arguments, one option with optional argument
                {
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", undefined,
                                    new option.OptionalOptionArgument("foo", "FOO", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ t: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-tbar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", undefined,
                                    new option.OptionalOptionArgument("foo", "FOO", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ t: "FOO" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-t", "bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    undefined, "test",
                                    new option.OptionalOptionArgument("foo", "FOO", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "bar" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--test=bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    undefined, "test",
                                    new option.OptionalOptionArgument("foo", "FOO", x => x),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "FOO" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--test", "bar"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", "test",
                                    new option.OptionalOptionArgument("foo", "FOO", x => x.toUpperCase()),
                                    "test option"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ test: "BAR" });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-tbar"]);
                        expect(flag).to.be.true;
                    }
                }
                // no arguments, multiple options
                {
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "s", undefined,
                                    null,
                                    "foo"
                                ),
                                new option.Option(
                                    "t", undefined,
                                    null,
                                    "bar"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({ s: true, t: true });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["-st"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "t", undefined,
                                    null,
                                    "test"
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
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({
                                    t   : true,
                                    foo : "bar",
                                    nyan: "CAT"
                                });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--nyan=cat", "-tfBAR"]);
                        expect(flag).to.be.true;
                    }
                    {
                        let flag = false;
                        let cmd = new command.Command(
                            "test command",
                            [],
                            [
                                new option.Option(
                                    "f", "foo",
                                    new option.OptionArgument("bar", (x, acc) => parseInt(x) + (acc || 0)),
                                    "foobar"
                                )
                            ],
                            (args, opts) => {
                                expect(args).to.deep.equal({});
                                expect(opts).to.deep.equal({
                                    foo: 6
                                });
                                flag = true;
                            }
                        );
                        cmd.run("test", out, ["--foo=1", "--foo=2", "--foo=3"]);
                        expect(flag).to.be.true;
                    }
                }
                // multiple arguments, multiple options
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
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
                    cmd.run("test", out, ["-s", "--foo", "BAR", "foobar.txt", "--nyan", "24"]);
                    expect(flag).to.be.true;
                }
            });

            it("should parse 'argv' and call 'out.err' with an error message if parsing failed", () => {
                // too few argument
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [
                            new command.Argument("filename", x => x),
                            new command.Argument("num", x => parseInt(x))
                        ],
                        [],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        mes => {
                            expect(mes).to.equal("error: too few argument\n");
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["foobar.txt"]);
                    expect(flag).to.be.true;
                }
                // unknown option
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        mes => {
                            expect(mes).to.equal("error: unknown option `-n'\n");
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["-n"]);
                    expect(flag).to.be.true;
                }
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        mes => {
                            expect(mes).to.equal("error: unknown option `--nyan'\n");
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["--nyan"]);
                    expect(flag).to.be.true;
                }
                // missing option argument
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [
                            new option.Option(
                                "f", "foo",
                                new option.OptionArgument("bar", x => x),
                                "foobar"
                            )
                        ],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        mes => {
                            expect(mes).to.equal("error: missing argument for `-f'\n");
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["-f"]);
                    expect(flag).to.be.true;
                }
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [],
                        [
                            new option.Option(
                                "f", "foo",
                                new option.OptionArgument("bar", x => x),
                                "foobar"
                            )
                        ],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        mes => {
                            expect(mes).to.equal("error: missing argument for `--foo'\n");
                            flag = true;
                        }
                    );
                    cmd.run("test", out, ["--foo"]);
                    expect(flag).to.be.true;
                }
            });

            it("should stop parsing if a special option is invoked and its return value is truthy", () => {
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [
                            new command.Argument("filename", x => x),
                            new command.Argument("num", x => parseInt(x))
                        ],
                        [
                            new option.Option(
                                "f", "foo",
                                new option.OptionArgument("string", x => x),
                                "foo"
                            ),
                            new option.Option(
                                "b", "bar",
                                new option.OptionArgument("string", x => x),
                                "bar"
                            ),
                            new command.SpecialOption(
                                "n", "nyan",
                                new option.OptionArgument("name", x => x.toUpperCase()),
                                "nyancat",
                                (_cmd, _cmdName, _out, arg) => {
                                    expect(_cmd).to.equal(cmd);
                                    expect(_cmdName).to.equal("test");
                                    expect(_out).to.equal(out);
                                    expect(arg).to.equal("CAT");
                                }
                            )
                        ],
                        (args, opts) => {
                            expect(args).to.deep.equal({
                                filename: "foobar.txt",
                                num     : 24
                            });
                            expect(opts).to.deep.equal({
                                foo : "FOO",
                                bar : "BAR",
                                nyan: "CAT"
                            });
                            flag = true;
                        }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        _ => { throw new Error("unexpected output"); }
                    );
                    cmd.run("test", out, ["foobar.txt", "--foo", "FOO", "--nyan", "cat" , "--bar", "BAR", "24"]);
                    expect(flag).to.be.true;
                }
                {
                    let flag = false;
                    let cmd = new command.Command(
                        "test command",
                        [
                            new command.Argument("filename", x => x),
                            new command.Argument("num", _ => { throw new Error("unexpected call"); })
                        ],
                        [
                            new option.Option(
                                "f", "foo",
                                new option.OptionArgument("string", x => x),
                                "foo"
                            ),
                            new option.Option(
                                "b", "bar",
                                new option.OptionArgument("string", _ => { throw new Error("unexpected call"); }),
                                "bar"
                            ),
                            new command.SpecialOption(
                                "n", "nyan",
                                new option.OptionArgument("name", x => x.toUpperCase()),
                                "nyancat",
                                (_cmd, _cmdName, _out, arg) => {
                                    expect(_cmd).to.equal(cmd);
                                    expect(_cmdName).to.equal("e e l");
                                    expect(_out).to.equal(out);
                                    expect(arg).to.equal("CAT");
                                    flag = true;
                                    return true;
                                }
                            )
                        ],
                        (args, opts) => { throw new Error("unexpected call"); }
                    );
                    let out = new output.Output(
                        _ => { throw new Error("unexpected output"); },
                        _ => { throw new Error("unexpected output"); }
                    );
                    cmd.run("e e l", out, ["foobar.txt", "--foo", "FOO", "--nyan", "cat" , "--bar", "BAR", "24"]);
                    expect(flag).to.be.true;
                }
            });
        });
    });

    describe("SpecialOption", () => {
        describe("constructor(shortName, longName, arg, desc, action)", () => {
            it("should create a new SpecialOption instance", () => {
                let spopt = new command.SpecialOption(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option",
                    (cmd, out, arg) => {}
                );
                expect(spopt).to.be.an.instanceOf(command.SpecialOption);
            });

            it("should throw a TypeError if 'shortName' is not a string nor undefined", () => {
                function construct(shortName) {
                    return () => {
                        new command.SpecialOption(
                            shortName, "test",
                            new option.OptionArgument("nyan", x => x),
                            "test option",
                            (cmd, out, arg) => {}
                        );
                    };
                }

                expect(construct("t")).not.to.throw(TypeError);
                expect(construct(undefined)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw an error if 'shortName' is a string and its length is not 1", () => {
                function construct(shortName) {
                    return () => {
                        new command.SpecialOption(
                            shortName, "test",
                            new option.OptionArgument("nyan", x => x),
                            "test option",
                            (cmd, out, arg) => {}
                        );
                    };
                }

                expect(construct("")).to.throw(Error);
                expect(construct("toolong")).to.throw(Error);
            });

            it("should throw a TypeError if 'longName' is not a string nor undefined", () => {
                function construct(longName) {
                    return () => {
                        new command.SpecialOption(
                            "t", longName,
                            new option.OptionArgument("nyan", x => x),
                            "test option",
                            (cmd, out, arg) => {}
                        );
                    };
                }

                expect(construct("test")).not.to.throw(TypeError);
                expect(construct(undefined)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw an error if 'longName' is a string and its length is 0", () => {
                expect(() => {
                    new command.SpecialOption(
                        "t", "",
                        new option.OptionArgument("nyan", x => x),
                        "test option",
                        (cmd, out, arg) => {}
                    );
                }).to.throw(Error);
            });

            it("should throw an error if both 'shortName' and 'longName' are undefined", () => {
                expect(() => {
                    new command.SpecialOption(
                        undefined, undefined,
                        new option.OptionArgument("nyan", x => x),
                        "test option",
                        (cmd, out, arg) => {}
                    );
                }).to.throw(Error);
            });

            it("should throw a TypeError if 'arg' is not an instance of OptionArgument nor null", () => {
                function construct(arg) {
                    return () => {
                        new command.SpecialOption(
                            "t", "test",
                            arg,
                            "test option",
                            (cmd, out, arg) => {}
                        );
                    };
                }

                expect(construct(new option.OptionArgument("nyan", x => x))).not.to.throw(TypeError);
                expect(construct(new option.OptionalOptionArgument("nyan", "cat", x => x))).not.to.throw(TypeError);
                expect(construct(null)).not.to.throw(TypeError);

                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'desc' is not a string", () => {
                function construct(desc) {
                    return () => {
                        new command.SpecialOption(
                            "t", "test",
                            new option.OptionArgument("nyan", x => x),
                            desc,
                            (cmd, out, arg) => {}
                        );
                    };
                }

                expect(construct("test option")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
                expect(construct(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'action' is not a function", () => {
                function construct(action) {
                    return () => {
                        new command.SpecialOption(
                            "t", "test",
                            new option.OptionArgument("nyan", x => x),
                            "test option",
                            action
                        );
                    };
                }

                expect(construct((cmd, out, arg) => {})).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });
        });

        describe("#invoke(cmd, cmdName, out, arg)", () => {
            it("should call the action of the option with arguments 'cmd', 'out', and 'arg'", () => {
                let spopt = new command.SpecialOption(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option",
                    (cmd, cmdName, out, arg) => [cmd, cmdName, out, arg]
                );
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                expect(spopt.invoke(cmd, "test", out, "foobar")).to.deep.equal([cmd, "test", out, "foobar"]);
                expect(spopt.invoke(cmd, "nyancat", out, 3.14)).to.deep.equal([cmd, "nyancat", out, 3.14]);
            });

            it("should throw a TypeError if 'cmd' is not an instance of CommandBase", () => {
                let spopt = new command.SpecialOption(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option",
                    (cmd, cmdName, out, arg) => [cmd, cmdName, out, arg]
                );
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(cmd) {
                    return () => {
                        spopt.invoke(cmd, "test", out, "foobar");
                    }
                }

                expect(call(cmd)).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call("foobar")).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'cmdName' is not a string", () => {
                let spopt = new command.SpecialOption(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option",
                    (cmd, cmdName, out, arg) => [cmd, cmdName, out, arg]
                );
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(cmdName) {
                    return () => {
                        spopt.invoke(cmd, cmdName, out, "foobar");
                    }
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
                let spopt = new command.SpecialOption(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option",
                    (cmd, cmdName, out, arg) => [cmd, cmdName, out, arg]
                );
                let cmd = new command.Command(
                    "test command",
                    [],
                    [],
                    (args, opts) => {}
                );
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(out) {
                    return () => {
                        spopt.invoke(cmd, "test", out, "foobar");
                    }
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
        });
    });
});
