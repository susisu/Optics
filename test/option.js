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
            it("should create a new OptionArgument instance");
            it("should throw an error if 'name' is not a string");
            it("should throw an error if 'reader' is not a function");
        });

        describe("#isRequired()", () => {
            it("should always return true");
        });

        describe("#toShortPlaceholder()", () => {
            it("should return the name");
        });

        describe("#toLongPlaceholder()", () => {
            it("should return the name preceded by =");
        });

        describe("#getDefaultValue()", () => {
            it("should throw an error");
        });
    });

    describe("OptionalOptionArgument", () => {
        describe("constructor(name, defaultVal, reader", () => {
            it("should create a new OptionalOptionArgument instance");
            it("should throw an error if 'name' is not a string");
            it("should throw an error if 'reader' is not a function");
        });

        describe("#isRequired()", () => {
            it("should always return false");
        });

        describe("#toShortPlaceholder()", () => {
            it("should return the name wrapped by brackets [ and ]");
        });

        describe("#toLongPlaceholder()", () => {
            it("should return the name preceded by = and wrapped by brackets [ and ]");
        });

        describe("#getDefaultValue()", () => {
            it("should return the default value specified at a constructor");
        });
    })

    describe("Option", () => {
        describe("constructor(shortName, longName, arg, desc", () => {
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
