# @yakad/eslint-plugin-guard

Custom ESLint rules to enforce component conventions:

-   Only allow `React.forwardRef` to wrap a normal named function declaration
-   Disallow arrow functions inside `forwardRef`
-   Disallow default exports inside `components/` folder

## Install

```bash
npm i -D eslint @yakad/eslint-plugin-guard
```

## Usage

Extend the provided preset for files under `components/**`.

### Flat config (ESLint v9+)

```js
// eslint.config.js
import yakadGuard from "@yakad/eslint-plugin-guard";

export default [
    // your base configs...
    {
        files: ["components/**/*.{ts,tsx,js,jsx}"],
        plugins: { "@yakad/guard": yakadGuard },
        rules: yakadGuard.configs.components.rules,
    },
];
```

### Classic config (.eslintrc.\*)

```json
{
    "plugins": ["@yakad/guard"],
    "overrides": [
        {
            "files": ["components/**/*.{ts,tsx,js,jsx}"],
            "rules": {
                "@yakad/guard/forward-ref-named-function": "error",
                "@yakad/guard/no-default-export-in-components": "error"
            }
        }
    ]
}
```

## Rules

-   `@yakad/guard/forward-ref-named-function`: enforce named function declaration passed to `React.forwardRef`.
-   `@yakad/guard/no-default-export-in-components`: forbid `export default` anywhere under `components/`.

## License

MIT
