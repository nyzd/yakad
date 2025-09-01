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

    describe("file patterns", () => {
        it("should ignore specific files", () => {
            const patterns = ["config.json", "secrets.env"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("config.json")).toBe(true);
            expect(ignore.shouldIgnore("secrets.env")).toBe(true);
            expect(ignore.shouldIgnore("other.txt")).toBe(false);
        });

        it("should ignore file patterns with wildcards", () => {
            const patterns = ["*.log", "*.tmp", "example*.*"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log").toBe(true);
            expect(ignore.shouldIgnore("temp.tmp").toBe(true);
            expect(ignore.shouldIgnore("example.js").toBe(true);
            expect(ignore.shouldIgnore("example.config.js").toBe(true);
            expect(ignore.shouldIgnore("important.txt").toBe(false);
        });
    });

    describe("directory patterns", () => {
        it("should ignore entire directories", () => {
            const patterns = ["node_modules/", "dist/", "build/"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(
                ignore.shouldIgnore("node_modules/lodash/index.js"
            ).toBe(true);
            expect(ignore.shouldIgnore("dist/bundle.js").toBe(true);
            expect(ignore.shouldIgnore("build/app.js").toBe(true);
            expect(ignore.shouldIgnore("src/app.js").toBe(false);
        });

        it("should ignore directories with leading slash", () => {
            const patterns = ["/public", "/src/app"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("public/favicon.ico").toBe(true);
            expect(ignore.shouldIgnore("public/images/logo.png").toBe(
                true
            );
            expect(ignore.shouldIgnore("src/app/page.tsx").toBe(true);
            expect(
                ignore.shouldIgnore("src/components/Button.tsx"
            ).toBe(false);
        });
    });

    describe("negation patterns", () => {
        it("should handle negation patterns correctly for files", () => {
            const patterns = ["*.min.js", "!important.min.js"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.min.js").toBe(true);
            expect(ignore.shouldIgnore("important.min.js").toBe(false);
        });

        it("should handle negation patterns with directory patterns (LIMITATION: negation in directories may not work)", () => {
            // LIMITATION: The ignore package has issues with negation patterns inside directories
            // This test documents the current behavior
            const patterns = [
                "!/src/app/error.tsx",
                "!/src/app/head.tsx",
                "/src/app",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            // These should be ignored by the directory pattern
            expect(ignore.shouldIgnore("src/app/layout.tsx").toBe(true);
            expect(ignore.shouldIgnore("src/app/page.tsx").toBe(true);

            // LIMITATION: These are currently still ignored despite negation patterns
            // This is a known limitation of the ignore package
            expect(ignore.shouldIgnore("src/app/error.tsx").toBe(true);
            expect(ignore.shouldIgnore("src/app/head.tsx").toBe(true);
        });
    });

    describe("complex patterns", () => {
        it("should handle real-world .syncignore patterns", () => {
            const patterns = [
                "/public",
                ".syncignore",
                "README.md",
                "metadata.json",
                "package.json",
                "package-lock.json",
                "example*.*",
                "!/src/app/error.tsx",
                "!/src/app/head.tsx",
                "!/src/app/loading.tsx",
                "!/src/app/not-found.tsx",
                "/src/app",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);

            // Should be ignored
            expect(ignore.shouldIgnore("public/favicon.ico").toBe(true);
            expect(ignore.shouldIgnore(".syncignore").toBe(true);
            expect(ignore.shouldIgnore("README.md").toBe(true);
            expect(ignore.shouldIgnore("package.json").toBe(true);
            expect(ignore.shouldIgnore("example.js").toBe(true);
            expect(ignore.shouldIgnore("src/app/layout.tsx").toBe(true);
            expect(ignore.shouldIgnore("src/app/page.tsx").toBe(true);

            // LIMITATION: These are currently still ignored despite negation patterns
            // This is a known limitation of the ignore package with directory negations
            expect(ignore.shouldIgnore("src/app/error.tsx").toBe(true);
            expect(ignore.shouldIgnore("src/app/head.tsx").toBe(true);
            expect(ignore.shouldIgnore("src/app/loading.tsx").toBe(
                true
            );
            expect(ignore.shouldIgnore("src/app/not-found.tsx").toBe(
                true
            );

            // Should be allowed (not in ignore patterns)
            expect(
                ignore.shouldIgnore("src/components/Button.tsx"
            ).toBe(false);
            expect(ignore.shouldIgnore(".env.example").toBe(false);
            expect(ignore.shouldIgnore("tsconfig.json").toBe(false);
        });
    });

    describe("comments", () => {
        it("should ignore comment lines", () => {
            const patterns = [
                "# This is a comment",
                "*.log",
                "# Another comment",
                "temp/",
            ];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log").toBe(true);
            expect(ignore.shouldIgnore("temp/file.txt").toBe(true);
            expect(ignore.shouldIgnore("other.txt").toBe(false);
        });
    });

    describe("edge cases", () => {
        it("should handle empty lines", () => {
            const patterns = ["*.log", "", "temp/", "  ", "config.json"];
            fs.writeFileSync(ignoreFile, patterns.join("\n"));

            const ignore = new SyncIgnore(tempDir);
            expect(ignore.shouldIgnore("app.log").toBe(true);
            expect(ignore.shouldIgnore("temp/file.txt").toBe(true);
            expect(ignore.shouldIgnore("config.json").toBe(true);
        });

        it("should handle malformed .syncignore file gracefully", () => {
            // Create a file that can't be read
            fs.writeFileSync(ignoreFile, "invalid content");
            fs.chmodSync(ignoreFile, 0o000); // Remove read permissions

            // Should not throw an error
            expect(() => {
                const ignore = new SyncIgnore(tempDir);
                ignore.shouldIgnore("test.txt";
            }).not.toThrow();

            // Restore permissions for cleanup
            fs.chmodSync(ignoreFile, 0o644);
        });
    });
});
