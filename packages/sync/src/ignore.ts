import fs from "fs";
import path from "path";
import ignore from "ignore";

export interface IgnorePattern {
    pattern: string;
    isNegation: boolean;
    isDirectory: boolean;
    originalPattern: string;
}

export class SyncIgnore {
    private ignoreInstance: any;
    private ignoreFile: string;

    constructor(targetDir: string) {
        this.ignoreFile = path.join(targetDir, ".syncignore");
        this.ignoreInstance = ignore();
        this.loadPatterns();
    }

    private loadPatterns(): void {
        if (!fs.existsSync(this.ignoreFile)) {
            return;
        }

        try {
            const content = fs.readFileSync(this.ignoreFile, "utf-8");
            // Normalize patterns by removing leading slashes for the ignore package
            const normalizedContent = content
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line && !line.startsWith("#"))
                .map((line) => {
                    // Remove leading slash for the ignore package
                    if (line.startsWith("/")) {
                        return line.slice(1);
                    }
                    return line;
                })
                .join("\n");

            this.ignoreInstance.add(normalizedContent);
        } catch (error) {
            console.warn(`Warning: Could not read .syncignore file: ${error}`);
        }
    }

    public shouldIgnore(filePath: string, isDirectory: boolean): boolean {
        // The ignore package handles all the pattern matching logic
        return this.ignoreInstance.ignores(filePath);
    }

    public getIgnoreFile(): string {
        return this.ignoreFile;
    }

    public hasIgnoreFile(): boolean {
        return fs.existsSync(this.ignoreFile);
    }
}
