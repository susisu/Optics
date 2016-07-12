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
                expect(() => { new option.OptionArgument(null, x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument(undefined, x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument(3.14, x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument(true, x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument({}, x => x); }).to.throw(TypeError);
            });

            it("should throw a TypeError if 'reader' is not a function", () => {
                expect(() => { new option.OptionArgument("test", null); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument("test", undefined); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument("test", 3.14); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument("test", true); }).to.throw(TypeError);
                expect(() => { new option.OptionArgument("test", {}); }).to.throw(TypeError);
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
    });

    describe("OptionalOptionArgument", () => {
        describe("constructor(name, defaultVal, reader", () => {
            it("should create a new OptionalOptionArgument instance", () => {
                let optarg = new option.OptionalOptionArgument("test", "none", x => x);
                expect(optarg).to.be.an.instanceOf(option.OptionalOptionArgument);
            });

            it("should throw an error if 'name' is not a string", () => {
                expect(() => { new option.OptionalOptionArgument(null, "none", x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument(undefined, "none", x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument(3.14, "none", x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument(true, "none", x => x); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument({}, "none", x => x); }).to.throw(TypeError);
            });

            it("should throw an error if 'reader' is not a function", () => {
                expect(() => { new option.OptionalOptionArgument("test", "none", null); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument("test", "none", undefined); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument("test", "none", 3.14); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument("test", "none", true); }).to.throw(TypeError);
                expect(() => { new option.OptionalOptionArgument("test", "none", {}); }).to.throw(TypeError);
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
            it("should return the name preceded by = and wrapped by brackets [ and ]");
        });

        describe("#getDefaultValue()", () => {
            it("should return the default value specified at a constructor");
        });
    })

    describe("Option", () => {
        describe("constructor(shortName, longName, arg, desc)", () => {
            it("should create a new Option instance");
            it("should throw an error if 'shortName' is not a string nor undefined");
            it("should throw an error if 'shortName' is a string and its length is not 1");
            it("should throw an error if 'longName' is not a string nor undefined");
            it("should throw an error if 'longName' is a string and its length is 0");
            it("should throw an error if both 'shortName' and 'longName' are undefined");
            it("should throw an error if 'arg' is not an instance of OptionalArgument nor null");
            it("should throw an error if 'desc' is not a string");
        });
    })
});
