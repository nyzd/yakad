import type { Linter } from "eslint";

const config: Linter.Config = {
    rules: {
        "@yakad/guard/forward-ref-named-function": "error",
        "@yakad/guard/no-default-export-in-components": "error",
    },
};

export default config;
