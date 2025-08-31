import fs from "fs";
import path from "path";

export interface IgnorePattern {
    pattern: string;
    isNegation: boolean;
    isDirectory: boolean;
}

export class SyncIgnore {
    private patterns: IgnorePattern[] = [];
    private ignoreFile: string;

    constructor(targetDir: string) {
        this.ignoreFile = path.join(targetDir, ".syncignore");
        this.loadPatterns();
    }

    private loadPatterns(): void {
        if (!fs.existsSync(this.ignoreFile)) {
            return;
        }

        try {
            const content = fs.readFileSync(this.ignoreFile, "utf-8");
            const lines = content
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line && !line.startsWith("#"));

            this.patterns = lines.map((line) => this.parsePattern(line));
        } catch (error) {
            console.warn(`Warning: Could not read .syncignore file: ${error}`);
        }
    }

    private parsePattern(pattern: string): IgnorePattern {
        const isNegation = pattern.startsWith("!");
        const cleanPattern = isNegation ? pattern.slice(1) : pattern;
        const isDirectory = cleanPattern.endsWith("/");
        const normalizedPattern = isDirectory
            ? cleanPattern.slice(0, -1)
            : cleanPattern;

        return {
            pattern: normalizedPattern,
            isNegation,
            isDirectory,
        };
    }

    public shouldIgnore(filePath: string, isDirectory: boolean): boolean {
        const relativePath = filePath.replace(/\\/g, "/"); // Normalize path separators
        let shouldIgnore = false;

        for (const pattern of this.patterns) {
            if (this.matchesPattern(relativePath, pattern, isDirectory)) {
                if (pattern.isNegation) {
                    shouldIgnore = false;
                } else {
                    shouldIgnore = true;
                }
            }
        }

        return shouldIgnore;
    }

    private matchesPattern(
        filePath: string,
        pattern: IgnorePattern,
        isDirectory: boolean
    ): boolean {
        const { pattern: patternStr, isDirectory: patternIsDir } = pattern;

        // Handle directory patterns - if pattern is for a directory, check if filePath is within that directory
        if (patternIsDir) {
            // Check if the filePath starts with the directory pattern
            if (
                filePath.startsWith(patternStr + "/") ||
                filePath === patternStr
            ) {
                return true;
            }
            return false;
        }

        // Convert glob patterns to regex
        const regexPattern = this.globToRegex(patternStr);
        return regexPattern.test(filePath);
    }

    private globToRegex(glob: string): RegExp {
        // Convert glob patterns to regex
        // * -> [^/]* (any characters except /)
        // ** -> .* (any characters including /)
        // ? -> . (any single character)
        // [abc] -> [abc] (character class)
        // {a,b} -> (a|b) (alternation)

        let regex = glob
            .replace(/\./g, "\\.") // Escape dots
            .replace(/\*/g, "[^/]*") // * matches anything except /
            .replace(/\*\*/g, ".*") // ** matches anything including /
            .replace(/\?/g, ".") // ? matches any single character
            .replace(/\[([^\]]+)\]/g, "[$1]") // Character classes
            .replace(/\{([^}]+)\}/g, "($1)") // Alternation
            .replace(/,/g, "|"); // Convert commas to pipe for alternation

        return new RegExp(`^${regex}$`);
    }

    public getIgnoreFile(): string {
        return this.ignoreFile;
    }

    public hasIgnoreFile(): boolean {
        return fs.existsSync(this.ignoreFile);
    }
}
