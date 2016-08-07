/*
 * Optics test / output.js
 * copyright (c) 2016 Susisu
 */

"use strict";

const chai   = require("chai");
const expect = chai.expect;

const output = require("../lib/output.js");

describe("output", () => {
    describe("Output", () => {
        describe("constructor(out, err)", () => {
            it("sholuld create a new Output instance", () => {
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    _ => { throw new Error("unexpected output"); }
                );
                expect(out).to.be.an.instanceOf(output.Output);
            });

            it("should throw a TypeError if 'out' is not a function", () => {
                function construct(out) {
                    return () => {
                        new output.Output(
                            out,
                            _ => { throw new Error("unexpected output"); }
                        );
                    };
                }

                expect(construct(_ => { throw new Error("unexpected output"); })).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });

            it("should throw a TypeError if 'err' is not a function",  () => {
                function construct(err) {
                    return () => {
                        new output.Output(
                            _ => { throw new Error("unexpected output"); },
                            err
                        );
                    };
                }

                expect(construct(_ => { throw new Error("unexpected output"); })).not.to.throw(TypeError);

                expect(construct(null)).to.throw(TypeError);
                expect(construct(undefined)).to.throw(TypeError);
                expect(construct("foobar")).to.throw(TypeError);
                expect(construct(3.14)).to.throw(TypeError);
                expect(construct(true)).to.throw(TypeError);
                expect(construct({})).to.throw(TypeError);
            });
        });
    });
});
