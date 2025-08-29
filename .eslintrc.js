module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    plugins: ["@typescript-eslint", "react", "react-hooks", "@yakad/guard"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    overrides: [
        {
            files: ["packages/lib/**/*.ts"],
            rules: {
                "react/react-in-jsx-scope": "off",
                "react/prop-types": "off",
            },
        },
        {
            files: ["packages/ui/**/*.{ts,tsx}"],
            rules: {
                "@yakad/guard/forward-ref-named-function": "error",
                "@yakad/guard/no-default-export-in-components": "error",
            },
        },
    ],
};
