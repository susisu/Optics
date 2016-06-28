/*
 * Optics / option.js
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        OptionArgument,
        NoOptionArgument,
        OptionalOptionArgument,
        RequiredOptionArgument,
        Option
    });
}

class OptionArgument {
    constructor() {
    }
}

class NoOptionArgument extends OptionArgument {
    constructor() {
        super();
    }
}

class OptionalOptionArgument extends OptionArgument {
    constructor(placeholder, defaultVal, reader) {
        super();
        this.placeholder = placeholder;
        this.defaultVal  = defaultVal;
        this.reader      = reader;
    }
}

class RequiredOptionArgument extends OptionArgument {
    constructor(placeholder, reader) {
        super();
        this.placeholder = placeholder;
        this.reader      = reader;
    }
}

class Option {
    constructor(shortName, longName, arg, desc) {
        this.shortName = shortName;
        this.longName  = longName;
        this.arg       = arg;
        this.desc      = desc;
    }
}

endModule();
