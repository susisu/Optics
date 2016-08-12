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

        describe("#output(msg)", () => {
            it("should call the function 'out' with an argument 'msg'", () => {
                let flag = false;
                let out = new output.Output(
                    msg => {
                        expect(msg).to.equal("test message");
                        flag = true;
                    },
                    _ => { throw new Error("unexpected output"); }
                );
                out.output("test message");
                expect(flag).to.be.true;
            });

            it("should throw a TypeError if 'msg' is not a string", () => {
                let out = new output.Output(
                    msg => {
                        if (typeof msg !== "string") {
                            throw new Error("unexpected output");
                        }
                    },
                    _ => { throw new Error("unexpected output"); }
                );
                function call(msg) {
                    return () => {
                        out.output(msg);
                    };
                }

                expect(call("test message")).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });
        });

        describe("#error(msg)", () => {
            it("should call the function 'err' with an argument 'msg'", () => {
                let flag = false;
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    msg => {
                        expect(msg).to.equal("test message");
                        flag = true;
                    }
                );
                out.error("test message");
                expect(flag).to.be.true;
            });

            it("should throw a TypeError if 'msg' is not a string", () => {
                let out = new output.Output(
                    _ => { throw new Error("unexpected output"); },
                    msg => {
                        if (typeof msg !== "string") {
                            throw new Error("unexpected output");
                        }
                    }
                );
                function call(msg) {
                    return () => {
                        out.error(msg);
                    };
                }

                expect(call("test message")).not.to.throw(TypeError);

                expect(call(null)).to.throw(TypeError);
                expect(call(undefined)).to.throw(TypeError);
                expect(call(3.14)).to.throw(TypeError);
                expect(call(true)).to.throw(TypeError);
                expect(call({})).to.throw(TypeError);
                expect(call(() => {})).to.throw(TypeError);
            });
        });
    });
});
