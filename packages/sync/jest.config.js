module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: {
                    target: "es2020",
                    module: "commonjs",
                    strict: true,
                    esModuleInterop: true,
                    skipLibCheck: true,
                    forceConsistentCasingInFileNames: true,
                },
            },
        ],
    },
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
    coverageDirectory: "coverage",
};
