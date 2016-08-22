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

/**
 * @private
 */
function alignLeft(str, width) {
    let trimmed = str.trim();
    return trimmed + " ".repeat(width - trimmed.length);
}

/**
 * @private
 */
function formatLine(line, colWidths) {
    return Array.isArray(line)
        ? line.map((x, i) =>
            alignLeft(String(x), colWidths[i] || 0)).join("  ").trim()
        : String(line).trim();
}

/**
 * Returns formatted text generated from `src`.
 * @static
 * @param {number} indentWidth The indent width attatched to each line.
 * @param {Array} src The source array.
 * @returns {string} Formatted text.
 */
function formatHelpText(indentWidth, src) {
    if (typeof indentWidth !== "number") {
        throw new TypeError("indentWidth must be a number");
    }
    if (!Array.isArray(src)) {
        throw new TypeError("src must be an array");
    }
    let indent = " ".repeat(indentWidth);
    let colWidths = [];
    for (let line of src) {
        if (Array.isArray(line)) {
            for (let i in line) {
                colWidths[i] = Math.max(colWidths[i] || 0, String(line[i]).trim().length);
            }
        }
        else {
            colWidths[0] = Math.max(colWidths[0] || 0, String(line).trim().length);
        }
    }
    return src.map(line => (indent + formatLine(line, colWidths)).trimRight() + "\n").join("");
}

endModule();
