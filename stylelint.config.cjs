/*
global
  module
  */
// CSE 195 ESLint Config (2026 v0.1)
// Inspired by CSE 154's Stylelint config:
// https://courses.cs.washington.edu/courses/cse154/24sp/resources/assets/.stylelintrc.json
module.exports = {
    rules: {
        "color-no-invalid-hex": true,

        "font-family-no-duplicate-names": true,
        "font-family-no-missing-generic-family-keyword": true,

        "function-calc-no-unspaced-operator": true,
        "function-linear-gradient-no-nonstandard-direction": true,

        "string-no-newline": true,

        "unit-no-unknown": true,
        "property-no-unknown": true,
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-element-no-unknown": true,
        "selector-type-no-unknown": true,
        "media-feature-name-no-unknown": true,
        "at-rule-no-unknown": true,

        "keyframe-declaration-no-important": true,

        "declaration-block-no-duplicate-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,

        "block-no-empty": true,
        "comment-no-empty": true,
        "no-empty-source": true,

        "no-duplicate-at-import-rules": true,
        "no-duplicate-selectors": true,
        "no-invalid-double-slash-comments": true,

        "function-url-no-scheme-relative": true,

        "value-no-vendor-prefix": true,

        "property-no-vendor-prefix": true,

        "declaration-no-important": true,

        "declaration-block-single-line-max-declarations": 0,

        "selector-no-vendor-prefix": true,
        "media-feature-name-no-vendor-prefix": true,
        "at-rule-no-vendor-prefix": true,

        "max-nesting-depth": 2,

        "no-unknown-animations": true,

        "font-family-name-quotes": "always-unless-keyword",

        "function-name-case": "lower",
        "function-url-quotes": "always",

        "value-keyword-case": "lower",

        "declaration-empty-line-before": "never",

        "selector-attribute-quotes": "always",
        "selector-pseudo-element-colon-notation": "single",
        "selector-type-case": "lower",
        "rule-empty-line-before": [
            "always",
            {
                ignore: ["after-comment"],
                except: ["first-nested"],
            },
        ],

        "at-rule-empty-line-before": "always",

        "comment-whitespace-inside": "always",
    },
};
