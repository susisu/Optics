/*
 * Optics / help.js
 * copyright (c) 2016 Susisu
 */

/**
 * @module help
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        formatHelpText
    });
}

function alignLeft(str, width) {
    return str + " ".repeat(width - str.length);
}

function formatLine(src, colWidths) {
    return Array.isArray(src)
        ? src.map((s, i) => alignLeft(String(s).trim(), colWidths[i] || 0)).join("  ")
        : alignLeft(String(src).trim(), colWidths[0] || 0);
}

/**
 * @static
 */
function formatHelpText(indentWidth, src) {
    let indent = " ".repeat(indentWidth);
    let colWidths = [];
    for (let s of src) {
        if (Array.isArray(s)) {
            for (let i in s) {
                colWidths[i] = Math.max(colWidths[i] || 0, String(s[i]).trim().length);
            }
        }
        else {
            colWidths[0] = Math.max(colWidths[0] || 0, String(s).trim().length);
        }
    }
    return src.map(s => indent + formatLine(s, colWidths) + "\n").join("");
}

endModule();
