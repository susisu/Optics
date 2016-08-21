/*
 * Optics test / help.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const help = require("../lib/help.js");

describe("help", () => {
    describe("formatHelpText(indentWidth, src)", () => {
        it("should return formatted text generated from 'src'", () => {
            // single values
            {
                let src = [
                    "foo",
                    "nyancat",
                    "",
                    undefined,
                    null,
                    137,
                    true,
                    { toString: () => "hello" }
                ];
                expect(help.formatHelpText(0, src)).to.equal(
                      "foo\n"
                    + "nyancat\n"
                    + "\n"
                    + "undefined\n"
                    + "null\n"
                    + "137\n"
                    + "true\n"
                    + "hello\n"
                );
                expect(help.formatHelpText(2, src)).to.equal(
                      "  foo\n"
                    + "  nyancat\n"
                    + "\n"
                    + "  undefined\n"
                    + "  null\n"
                    + "  137\n"
                    + "  true\n"
                    + "  hello\n"
                );
                expect(help.formatHelpText(4, src)).to.equal(
                      "    foo\n"
                    + "    nyancat\n"
                    + "\n"
                    + "    undefined\n"
                    + "    null\n"
                    + "    137\n"
                    + "    true\n"
                    + "    hello\n"
                );
            }
            // arrays
            {
                let src = [
                    ["foo", "bar"],
                    ["nyancat", "cats"],
                    [],
                    ["a", "b", "c"],
                    [undefined, null],
                    [137, true],
                    [{ toString: () => "hello" }]
                ];
                expect(help.formatHelpText(0, src)).to.equal(
                      "foo        bar\n"
                    + "nyancat    cats\n"
                    + "\n"
                    + "a          b     c\n"
                    + "undefined  null\n"
                    + "137        true\n"
                    + "hello\n"
                );
                expect(help.formatHelpText(2, src)).to.equal(
                      "  foo        bar\n"
                    + "  nyancat    cats\n"
                    + "\n"
                    + "  a          b     c\n"
                    + "  undefined  null\n"
                    + "  137        true\n"
                    + "  hello\n"
                );
                expect(help.formatHelpText(4, src)).to.equal(
                      "    foo        bar\n"
                    + "    nyancat    cats\n"
                    + "\n"
                    + "    a          b     c\n"
                    + "    undefined  null\n"
                    + "    137        true\n"
                    + "    hello\n"
                );
            }
            // mixed
            {
                let src = [
                    "foobar",
                    ["nyancat", undefined],
                    ["a", "b", "c"],
                    [null],
                    [137, true],
                    { toString: () => "hello" }
                ];
                expect(help.formatHelpText(0, src)).to.equal(
                      "foobar\n"
                    + "nyancat  undefined\n"
                    + "a        b          c\n"
                    + "null\n"
                    + "137      true\n"
                    + "hello\n"
                );
                expect(help.formatHelpText(2, src)).to.equal(
                      "  foobar\n"
                    + "  nyancat  undefined\n"
                    + "  a        b          c\n"
                    + "  null\n"
                    + "  137      true\n"
                    + "  hello\n"
                );
                expect(help.formatHelpText(4, src)).to.equal(
                      "    foobar\n"
                    + "    nyancat  undefined\n"
                    + "    a        b          c\n"
                    + "    null\n"
                    + "    137      true\n"
                    + "    hello\n"
                );
            }
        });

        it("should throw a TypeError if 'indentWidth' is not a number", () => {
            let src = [
                    "foobar",
                    ["nyancat", undefined],
                    ["a", "b", "c"],
                    [null],
                    [137, true],
                    { toString: () => "hello" }
                ];
            function call(indentWidth) {
                return () => {
                    help.formatHelpText(indentWidth, src);
                };
            }

            expect(call(4)).not.to.throw(TypeError);

            expect(call(null)).to.throw(TypeError);
            expect(call(undefined)).to.throw(TypeError);
            expect(call("foobar")).to.throw(TypeError);
            expect(call(true)).to.throw(TypeError);
            expect(call({})).to.throw(TypeError);
            expect(call(() => {})).to.throw(TypeError);
        });

        it("should throw a TypeError if 'src' is not an array", () => {
            function call(src) {
                return () => {
                    help.formatHelpText(4, src);
                };
            }

            let src = [
                    "foobar",
                    ["nyancat", undefined],
                    ["a", "b", "c"],
                    [null],
                    [137, true],
                    { toString: () => "hello" }
                ];
            expect(call(src)).not.to.throw(TypeError);
            expect(call([])).not.to.throw(TypeError);

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
