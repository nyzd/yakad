import type { Linter } from "eslint";

const config: Linter.Config = {
    name: "@yakad/eslint-plugin-guard/configs/components",
    rules: {
        "@yakad/guard/forward-ref-named-function": "error",
        "@yakad/guard/no-default-export-in-components": "error",
    },
};

export default config;
