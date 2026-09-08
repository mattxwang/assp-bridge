/*
global
  module
  */
// CSE 195 ESLint Config (2026 v0.1)
// Inspired by CSE 154's ESLint config:
// https://courses.cs.washington.edu/courses/cse154/24sp/resources/assets/.eslintrc.json
module.exports = [
    {
        languageOptions: {
            sourceType: "script",
            globals: {
                console: "writable",
                document: "writable",
                window: "writable",
            },
        },
        rules: {
            // Rules that enforce items in the code quality guide.
            // Sorted by order of appearance, not lexicographically.
            "no-var": "error", // Prefer let over var
            "no-multi-assign": "error", //  Use one let per assignment
            camelcase: "warn", // Use camelCase for variable and function names
            eqeqeq: ["error", "always"], // Prefer strict equality
            "no-eq-null": "error", // Prefer strict equality
            "no-nested-ternary": "error", // Avoid nested or complex ternaries
            "no-unneeded-ternary": "error", // Avoid nested or complex ternaries
            "no-continue": "error", // Avoid break and continue
            curly: "error", // Always start blocks with braces

            // TODO: resolve inconsistency (error, but not in CQ guide)
            // Disallowing certain features
            "no-alert": "error",
            "no-eval": "error",
            "no-labels": "error",
            "no-with": "error",
            // No "weird" style
            "no-empty-function": "error",
            "no-lone-blocks": "error",
            "no-lonely-if": "warn",
            "no-octal": "error",
            "no-octal-escape": "error",
            // suggestion: move into "Variables" section
            "no-shadow": ["error", { allow: ["id"] }],
            "no-shadow-restricted-names": "error",
            "no-undef": "error",
            "no-use-before-define": ["error", { functions: false }],
            // other style
            "max-depth": ["error", 6],
            "max-params": ["error", 6],

            // Rules that try to catch incomplete code. These are not graded.
            "no-debugger": "warn",
            "no-warning-comments": "warn",

            // Rules that catch potentially incorrect code, common with beginners. None of these are graded,
            // and most cover JS features that are not taught in CSE 195.
            "array-callback-return": "warn",
            "block-scoped-var": "warn",
            "callback-return": "warn",
            "consistent-return": "warn",
            "func-name-matching": "warn",
            "global-require": "warn",
            "handle-callback-err": "warn",
            "max-nested-callbacks": "warn",
            "new-cap": "warn",
            "no-array-constructor": "warn",
            "no-bitwise": "warn",
            "no-extend-native": "warn",
            "no-extra-bind": "warn",
            "no-div-regex": "warn",
            "no-implied-eval": "warn",
            "no-iterator": "warn",
            "no-new-wrappers": "warn",
            "no-proto": "warn",
            "no-redeclare": "warn",
            "no-return-assign": "warn",
            "no-return-await": "warn",
            "no-script-url": "warn",
            "no-self-assign": "warn",
            "no-self-compare": "warn",
            "no-sequences": "warn",
            "no-mixed-requires": "warn",
            "no-new-object": "warn",
            "no-path-concat": "warn",
            "no-process-exit": "warn",
            "no-template-curly-in-string": "warn",
            "no-throw-literal": "warn",
            "no-underscore-dangle": "warn",
            "no-unmodified-loop-condition": "warn",
            "no-unreachable-loop": "warn",
            "no-unused-expressions": "warn",
            "no-unused-vars": "warn",
            "no-useless-call": "warn",
            "no-useless-catch": "warn",
            "no-useless-concat": "warn",
            "no-useless-return": "warn",
            "no-void": "warn",
            "prefer-promise-reject-errors": "warn",
            "require-await": "warn",
            "wrap-iife": ["warn", "inside"],
        },
    },
];
