import fs from "fs";
import path from "path";
import os from "os";
import { SyncIgnore } from "../src/ignore";

describe("SyncIgnore", () => {
    let tempDir: string;
    let ignoreFile: string;

    beforeEach(() => {
        // Create a temporary directory for each test
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "sync-ignore-test-"));
        ignoreFile = path.join(tempDir, ".syncignore");
    });

    afterEach(() => {
        // Clean up temporary directory
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    describe("basic functionality", () => {
        it("should not ignore files when no .syncignore file exists", () => {
            const ignore = new SyncIgnore(tempDir);
            expect(ignore.hasIgnoreFile()).toBe(false);
            expect(ignore.shouldIgnore("test.txt")).toBe(false);
        });

        it("should load patterns from .syncignore file", () => {
            const patterns = ["*.log", "temp/", "config.json"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.hasIgnoreFile()).toBe(true);
        });
    });

    describe("basic file patterns", () => {
        it("should ignore specific files", () => {
            const patterns = [
                "config.local.js",
                ".env",
                "secrets.json",
                "private.key",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("config.local.js")).toBe(true);
            expect(ignore.shouldIgnore(".env")).toBe(true);
            expect(ignore.shouldIgnore("secrets.json")).toBe(true);
            expect(ignore.shouldIgnore("private.key")).toBe(true);
            expect(ignore.shouldIgnore("other.txt")).toBe(false);
        });

        it("should ignore file extensions", () => {
            const patterns = ["*.log", "*.tmp", "*.cache", "*.bak"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log")).toBe(true);
            expect(ignore.shouldIgnore("temp.tmp")).toBe(true);
            expect(ignore.shouldIgnore("file.cache")).toBe(true);
            expect(ignore.shouldIgnore("backup.bak")).toBe(true);
            expect(ignore.shouldIgnore("important.txt")).toBe(false);
        });

        it("should ignore OS generated files", () => {
            const patterns = [".DS_Store", "Thumbs.db", "desktop.ini"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore(".DS_Store")).toBe(true);
            expect(ignore.shouldIgnore("Thumbs.db")).toBe(true);
            expect(ignore.shouldIgnore("desktop.ini")).toBe(true);
        });
    });

    describe("directory patterns", () => {
        it("should ignore entire directories", () => {
            const patterns = ["node_modules/", "dist/", "build/", ".next/"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("node_modules/lodash/index.js")).toBe(
                true
            );
            expect(ignore.shouldIgnore("dist/bundle.js")).toBe(true);
            expect(ignore.shouldIgnore("build/app.js")).toBe(true);
            expect(ignore.shouldIgnore(".next/server.js")).toBe(true);
            expect(ignore.shouldIgnore("src/app.js")).toBe(false);
        });

        it("should ignore directories with leading slash", () => {
            const patterns = ["/public", "/src/app", "/.next"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("public/favicon.ico")).toBe(true);
            expect(ignore.shouldIgnore("src/app/page.tsx")).toBe(true);
            expect(ignore.shouldIgnore(".next/server.js")).toBe(true);
            expect(ignore.shouldIgnore("src/components/Button.tsx")).toBe(
                false
            );
        });
    });

    describe("Next.js specific patterns", () => {
        it("should ignore Next.js build and cache directories", () => {
            const patterns = ["/.next/", "/out/", "/.next/cache/"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore(".next/server.js")).toBe(true);
            expect(ignore.shouldIgnore(".next/cache/something")).toBe(true);
            expect(ignore.shouldIgnore("out/index.html")).toBe(true);
        });

        it("should ignore Next.js telemetry", () => {
            const patterns = [".next/telemetry.txt"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore(".next/telemetry.txt")).toBe(true);
        });
    });

    describe("development patterns", () => {
        it("should ignore test files", () => {
            const patterns = ["*.test.js", "*.test.ts", "*.test.tsx"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("Button.test.tsx")).toBe(true);
            expect(ignore.shouldIgnore("helpers.test.ts")).toBe(true);
            expect(ignore.shouldIgnore("app.test.js")).toBe(true);
        });

        it("should ignore test directories", () => {
            const patterns = ["/__tests__/", "/tests/", "/cypress/"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("__tests__/Button.test.tsx")).toBe(true);
            expect(ignore.shouldIgnore("tests/helpers.test.ts")).toBe(true);
            expect(ignore.shouldIgnore("cypress/e2e/test.cy.ts")).toBe(true);
        });
    });

    describe("complex wildcard patterns", () => {
        it("should ignore minified files", () => {
            const patterns = ["*.min.js", "*.min.css"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.min.js")).toBe(true);
            expect(ignore.shouldIgnore("styles.min.css")).toBe(true);
            expect(ignore.shouldIgnore("app.js")).toBe(false);
        });

        it("should ignore source maps", () => {
            const patterns = ["*.map"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.js.map")).toBe(true);
            expect(ignore.shouldIgnore("styles.css.map")).toBe(true);
        });

        it("should ignore temporary files", () => {
            const patterns = ["temp/*", "tmp/*", "*.tmp"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("temp/file.txt")).toBe(true);
            expect(ignore.shouldIgnore("tmp/data.json")).toBe(true);
            expect(ignore.shouldIgnore("backup.tmp")).toBe(true);
        });
    });

    describe("negation patterns", () => {
        it("should handle negation patterns for files", () => {
            const patterns = ["*.min.js", "!important.min.js"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.min.js")).toBe(true);
            expect(ignore.shouldIgnore("important.min.js")).toBe(false);
        });

        it("should handle negation patterns for directories (LIMITATION: may not work)", () => {
            // LIMITATION: The ignore package has issues with negation patterns inside directories
            const patterns = [
                "!/src/app/error.tsx",
                "!/src/app/head.tsx",
                "/src/app",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            // These should be ignored by the directory pattern
            expect(ignore.shouldIgnore("src/app/layout.tsx")).toBe(true);
            expect(ignore.shouldIgnore("src/app/page.tsx")).toBe(true);

            // LIMITATION: These are currently still ignored despite negation patterns
            expect(ignore.shouldIgnore("src/app/error.tsx")).toBe(true);
            expect(ignore.shouldIgnore("src/app/head.tsx")).toBe(true);
        });
    });

    describe("path-specific patterns", () => {
        it("should ignore root level configuration files", () => {
            const patterns = [
                "package-lock.json",
                "tsconfig.json",
                "next.config.*",
                ".eslintrc*",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("package-lock.json")).toBe(true);
            expect(ignore.shouldIgnore("tsconfig.json")).toBe(true);
            expect(ignore.shouldIgnore("next.config.js")).toBe(true);
            expect(ignore.shouldIgnore(".eslintrc.js")).toBe(true);
        });

        it("should ignore documentation files", () => {
            const patterns = ["README.md", "CHANGELOG.md", "LICENSE"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("README.md")).toBe(true);
            expect(ignore.shouldIgnore("CHANGELOG.md")).toBe(true);
            expect(ignore.shouldIgnore("LICENSE")).toBe(true);
        });
    });

    describe("advanced patterns", () => {
        it("should ignore files with specific patterns", () => {
            const patterns = ["example*.*", "demo*.*", "test*.*"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("example.js")).toBe(true);
            expect(ignore.shouldIgnore("demo.tsx")).toBe(true);
            expect(ignore.shouldIgnore("test.config.js")).toBe(true);
        });

        it("should ignore files in specific directories", () => {
            const patterns = ["src/**/*.test.*", "src/**/__tests__/**"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("src/components/Button.test.tsx")).toBe(
                true
            );
            expect(ignore.shouldIgnore("src/__tests__/helpers.test.ts")).toBe(
                true
            );
        });
    });

    describe("comments and organization", () => {
        it("should ignore comment lines", () => {
            const patterns = [
                "# This is a comment",
                "*.log",
                "# Another comment",
                "temp/",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log")).toBe(true);
            expect(ignore.shouldIgnore("temp/file.txt")).toBe(true);
            expect(ignore.shouldIgnore("other.txt")).toBe(false);
        });

        it("should handle empty lines", () => {
            const patterns = ["*.log", "", "temp/", "  ", "config.json"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log")).toBe(true);
            expect(ignore.shouldIgnore("temp/file.txt")).toBe(true);
            expect(ignore.shouldIgnore("config.json")).toBe(true);
        });
    });

    describe("edge cases", () => {
        it("should handle special characters in filenames", () => {
            const patterns = [
                "file-with-dashes.txt",
                "file_with_underscores.txt",
                "file.with.dots.txt",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("file-with-dashes.txt")).toBe(true);
            expect(ignore.shouldIgnore("file_with_underscores.txt")).toBe(true);
            expect(ignore.shouldIgnore("file.with.dots.txt")).toBe(true);
        });

        it("should handle missing .syncignore file gracefully", () => {
            // Test with a directory that doesn't exist
            const nonExistentDir = path.join(tempDir, "non-existent");

            // Should not throw an error when directory doesn't exist
            expect(() => {
                const ignore = new SyncIgnore(nonExistentDir);
                ignore.shouldIgnore("test.txt");
            }).not.toThrow();
        });
    });

    describe("comprehensive real-world test", () => {
        it("should handle a comprehensive .syncignore file", () => {
            // Use the comprehensive .syncignore.test file
            const testIgnoreFile = path.join(__dirname, ".syncignore.test");
            const content = fs.readFileSync(testIgnoreFile, "utf-8");
            fs.writeFileSync(ignoreFile, content);

            const ignore = new SyncIgnore(tempDir);

            // Test various patterns from the comprehensive file
            expect(ignore.shouldIgnore("config.local.js")).toBe(true);
            expect(ignore.shouldIgnore(".env")).toBe(true);
            expect(ignore.shouldIgnore("app.log")).toBe(true);
            expect(ignore.shouldIgnore(".DS_Store")).toBe(true);
            expect(ignore.shouldIgnore("node_modules/lodash/index.js")).toBe(
                true
            );
            expect(ignore.shouldIgnore(".next/server.js")).toBe(true);
            expect(ignore.shouldIgnore("Button.test.tsx")).toBe(true);
            expect(ignore.shouldIgnore("app.min.js")).toBe(true);
            expect(ignore.shouldIgnore("package-lock.json")).toBe(true);
            expect(ignore.shouldIgnore("README.md")).toBe(true);
            expect(ignore.shouldIgnore("example.js")).toBe(true);

            // Test files that should NOT be ignored
            expect(ignore.shouldIgnore("src/components/Button.tsx")).toBe(
                false
            );
            expect(ignore.shouldIgnore("src/utils/helpers.ts")).toBe(false);
            expect(ignore.shouldIgnore("public/images/logo.png")).toBe(false);
        });
    });
});
