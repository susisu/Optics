/*
 * Optics test / subcommand.js
 * copyright (c) 2016 Susisu
 */

"use strict";

describe("subcommand", () => {
    describe("Subcommand", () => {
        describe("constructor(name, cmd)", () => {
            it("should create a new Subcommand instance");
            it("should throw a TypeError if 'name' is not a string");
            it("should throw a TypeError if 'cmd' is not an instance of CommandBase");
        });
    });

    describe("CommandGroup", () => {
        describe("constructor(desc, subcmds, defaultCmd)", () => {
            it("should create a new CommandGroup instance");
            it("should throw a TypeError if 'desc' is not a string");
            it("should throw a TypeError if 'subcmds' is not an array of Subcommand");
            it("should throw a TypeError if 'defaultCmd' is not an instance of CommandBase nor null");
        });
    });
});
