/*
 * Optics test / option.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const option = require("../lib/option.js");

describe("option", () => {
    describe("OptionArgument", () => {
        describe("constructor(name, reader)", () => {
            it("should create a new OptionArgument instance", () => {
                let optarg = new option.OptionArgument("test", x => x);
                expect(optarg).to.be.an.instanceOf(option.OptionArgument);
            });

            it("should throw a TypeError if 'name' is not a string", () => {
                function construct(name) {
                    return () => {
                        new option.OptionArgument(name, x => x);
                    };
                }

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                function construct(reader) {
                    return () => {
                        new option.OptionArgument("test", reader);
                    };
                }

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });
        });

        describe("#isRequired()", () => {
            it("should always return true", () => {
                let optarg = new option.OptionArgument("test", x => x);
                expect(optarg.isRequired()).to.be.true;
            });
        });

        describe("#toShortPlaceholder()", () => {
            it("should return the name", () => {
                {
                    let optarg = new option.OptionArgument("test", x => x);
                    expect(optarg.toShortPlaceholder()).to.equal("test");
                }
                {
                    let optarg = new option.OptionArgument("nyan", x => x);
                    expect(optarg.toShortPlaceholder()).to.equal("nyan");
                }
            });
        });

        describe("#toLongPlaceholder()", () => {
            it("should return the name preceded by =", () => {
                {
                    let optarg = new option.OptionArgument("test", x => x);
                    expect(optarg.toLongPlaceholder()).to.equal("=test");
                }
                {
                    let optarg = new option.OptionArgument("nyan", x => x);
                    expect(optarg.toLongPlaceholder()).to.equal("=nyan");
                }
            });
        });

        describe("#getDefaultValue()", () => {
            it("should throw an error", () => {
                let optarg = new option.OptionArgument("test", x => x);
                expect(() => { optarg.getDefaultValue(); }).to.throw(Error);
            });
        });

        describe("#read(val, accum)", () => {
            it("should call 'reader' with arguments 'val' and 'accum', and return the result", () => {
                let flag = true;
                let optarg = new option.OptionArgument("test", (x, acc) => {
                    expect(x).to.equal("24");
                    expect(acc).to.equal(12);
                    flag = true;
                    return parseInt(x) + acc;
                });
                expect(optarg.read("24", 12)).to.equal(36);
                expect(flag).to.be.true;
            });

            it("should throw a TypeError if 'val' is not a string", () => {
                let optarg = new option.OptionArgument("test", (x, acc) => {
                    if (typeof x !== "string") {
                        throw new Error("unexpected call");
                    }
                });
                function call(val) {
                    return () => {
                        optarg.read(val, 0);
                    }
                }

                expect(call("foobar")).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });
        });
    });

    describe("OptionalOptionArgument", () => {
        describe("constructor(name, defaultVal, reader", () => {
            it("should create a new OptionalOptionArgument instance", () => {
                let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                expect(optarg).to.be.an.instanceOf(option.OptionalOptionArgument);
            });

            it("should throw an error if 'name' is not a string", () => {
                function construct(name) {
                    return () => {
                        new option.OptionalOptionArgument(name, "none", x => x);
                    };
                }

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw an error if 'reader' is not a function", () => {
                function construct(reader) {
                    return () => {
                        new option.OptionalOptionArgument("test", "none", reader);
                    };
                }

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });
        });

        describe("#isRequired()", () => {
            it("should always return false", () => {
                let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                expect(optarg.isRequired()).to.be.false;
            });
        });

        describe("#toShortPlaceholder()", () => {
            it("should return the name wrapped by brackets [ and ]", () => {
                {
                    let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                    expect(optarg.toShortPlaceholder()).to.equal("[test]");
                }
                {
                    let optarg = new option.OptionalOptionArgument("nyan", "none", x => x);
                    expect(optarg.toShortPlaceholder()).to.equal("[nyan]");
                }
            });
        });

        describe("#toLongPlaceholder()", () => {
            it("should return the name preceded by = and wrapped by brackets [ and ]", () => {
                {
                    let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                    expect(optarg.toLongPlaceholder()).to.equal("[=test]");
                }
                {
                    let optarg = new option.OptionalOptionArgument("nyan", "none", x => x);
                    expect(optarg.toLongPlaceholder()).to.equal("[=nyan]");
                }
            });
        });

        describe("#getDefaultValue()", () => {
            it("should return the default value specified at a constructor", () => {
                {
                    let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                    expect(optarg.getDefaultValue()).to.equal("none");
                }
                {
                    let optarg = new option.OptionalOptionArgument("nyan", 3.14, x => x);
                    expect(optarg.getDefaultValue()).to.equal(3.14);
                }
            });
        });
    })

    describe("Option", () => {
        describe("constructor(shortName, longName, arg, desc)", () => {
            it("should create a new Option instance", () => {
                let opt = new option.Option(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option"
                );
                expect(opt).to.be.an.instanceOf(option.Option);
            });

            it("should throw a TypeError if 'shortName' is not a string nor undefined", () => {
                function construct(shortName) {
                    return () => {
                        new option.Option(
                            shortName, "test",
                            new option.OptionArgument("nyan", x => x),
                            "test option"
                        );
                    };
                }

                expect(construct("t")).not.to.throw(TypeError);
                expect(construct(undefined)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw an error if 'shortName' is a string and its length is not 1", () => {
                function construct(shortName) {
                    return () => {
                        new option.Option(
                            shortName, "test",
                            new option.OptionArgument("nyan", x => x),
                            "test option"
                        );
                    };
                }

                expect(construct("")).to.throw(Error);
                expect(construct("toolong")).to.throw(Error);
            });

            it("should throw a TypeError if 'longName' is not a string nor undefined", () => {
                function construct(longName) {
                    return () => {
                        new option.Option(
                            "t", longName,
                            new option.OptionArgument("nyan", x => x),
                            "test option"
                        );
                    };
                }

                expect(construct("test")).not.to.throw(TypeError);
                expect(construct(undefined)).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw an error if 'longName' is a string and its length is 0", () => {
                expect(() => {
                    new option.Option(
                        "t", "",
                        new option.OptionArgument("nyan", x => x),
                        "test option"
                    );
                }).to.throw(Error);
            });

            it("should throw an error if both 'shortName' and 'longName' are undefined", () => {
                expect(() => {
                    new option.Option(
                        undefined, undefined,
                        new option.OptionArgument("nyan", x => x),
                        "test option"
                    );
                }).to.throw(Error);
            });

            it("should throw a TypeError if 'arg' is not an instance of OptionArgument nor null", () => {
                function construct(arg) {
                    return () => {
                        new option.Option(
                            "t", "test",
                            arg,
                            "test option"
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
            });

            it("should throw a TypeError if 'desc' is not a string", () => {
                function construct(desc) {
                    return () => {
                        new option.Option(
                            "t", "test",
                            new option.OptionArgument("nyan", x => x),
                            desc
                        );
                    };
                }

                expect(construct("test option")).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });
        });

        describe("#isSpecial()", () => {
            it("should always return false", () => {
                let opt = new option.Option(
                    "t", "test",
                    new option.OptionArgument("nyan", x => x),
                    "test option"
                );
                expect(opt.isSpecial()).to.be.false;
            });
        });
    });
});
