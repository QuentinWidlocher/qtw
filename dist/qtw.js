"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTheme = exports.qtw = exports.createQtwWithTheme = void 0;
const theme_1 = require("./theme");
function computeVariants(prefix, themeValues, properties) {
    return Object.keys(themeValues).reduce((acc, key) => {
        acc[`${prefix}-${key}`] = properties
            .map((p) => `${p}: ${themeValues[key]}`)
            .join("; ");
        return acc;
    }, {});
}
function computeColors(prefix, themeValues, property) {
    return Object.keys(themeValues).reduce((acc, key) => {
        if (typeof themeValues[key] === "string") {
            const color = themeValues[key];
            acc[`${prefix}-${key}`] = `${property}: ${color}`;
        }
        else if (typeof themeValues[key] === "object") {
            const color = themeValues[key];
            for (const variant in color) {
                acc[`${prefix}-${key}-${variant}`] = `${property}: ${color[variant]}`;
            }
        }
        return acc;
    }, {});
}
function getClassesFromTheme(theme) {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, computeVariants("m", theme.spacing, ["margin"])), computeVariants("mt", theme.spacing, [
        "margin-top",
    ])), computeVariants("mr", theme.spacing, [
        "margin-right",
    ])), computeVariants("mb", theme.spacing, [
        "margin-bottom",
    ])), computeVariants("ml", theme.spacing, [
        "margin-left",
    ])), computeVariants("mx", theme.spacing, [
        "margin-left",
        "margin-right",
    ])), computeVariants("my", theme.spacing, [
        "margin-top",
        "margin-bottom",
    ])), computeVariants("p", theme.spacing, ["padding"])), computeVariants("pt", theme.spacing, [
        "padding-top",
    ])), computeVariants("pr", theme.spacing, [
        "padding-right",
    ])), computeVariants("pb", theme.spacing, [
        "padding-bottom",
    ])), computeVariants("pl", theme.spacing, [
        "padding-left",
    ])), computeVariants("px", theme.spacing, [
        "padding-left",
        "padding-right",
    ])), computeVariants("py", theme.spacing, [
        "padding-top",
        "padding-bottom",
    ])), computeVariants("flex", theme.flex, ["flex"])), computeVariants("flex", theme.flexDirection, ["flex-direction"])), computeVariants("grow", theme.flex, ["flex-grow"])), computeVariants("shrink", theme.flex, [
        "flex-shrink",
    ])), computeVariants("h", theme.spacing, ["height"])), computeVariants("w", theme.spacing, ["width"])), computeVariants("min-h", theme.spacing, [
        "min-height",
    ])), computeVariants("min-w", theme.spacing, [
        "min-width",
    ])), computeVariants("max-h", theme.spacing, [
        "max-height",
    ])), computeVariants("max-w", theme.spacing, [
        "max-width",
    ])), computeColors("bg", theme.colors, "background-color")), computeColors("border", theme.colors, "border-color")), computeColors("text", theme.colors, "color")), computeVariants("border", theme.borderStyle, ["border-style"])), computeVariants("border", theme.borderWidth, ["border-width"])), computeVariants("rounded", theme.borderRadius, ["border-radius"])), computeVariants("text", theme.fontSize, [
        "font-size",
    ]));
}
class Wrapper {
    getClassesFromTheme(theme) {
        return getClassesFromTheme(theme);
    }
}
function createQtwWithTheme(customTheme) {
    const theme = getClassesFromTheme(Object.assign(Object.assign({}, theme_1.defaultTheme), customTheme));
    function customQtw(classes, ...args) {
        let styles = classes
            .split(" ")
            .map((c) => { var _a; return (_a = theme[c]) !== null && _a !== void 0 ? _a : null; })
            .filter((c) => c != null)
            .join("; ");
        if (args.length > 0) {
            styles += `; ${args.join("; ")}`;
        }
        return styles;
    }
    return customQtw;
}
exports.createQtwWithTheme = createQtwWithTheme;
exports.qtw = createQtwWithTheme(theme_1.defaultTheme);
var theme_2 = require("./theme");
Object.defineProperty(exports, "defaultTheme", { enumerable: true, get: function () { return theme_2.defaultTheme; } });
module.exports = {
    qtw: exports.qtw,
    createQtwWithTheme,
    defaultTheme: theme_1.defaultTheme,
};
//# sourceMappingURL=qtw.js.map