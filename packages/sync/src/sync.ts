import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { SyncIgnore } from "./ignore";

export interface SyncOptions {
    gitRepo: string;
    cloneDir: string;
    targetDir: string;
    verbose?: boolean;
}

export class FileSyncer {
    private options: SyncOptions;
    private ignore: SyncIgnore;

    constructor(options: SyncOptions) {
        this.options = options;
        this.ignore = new SyncIgnore(this.options.targetDir);
    }

    async sync(): Promise<void> {
        try {
            await this.cloneOrUpdateRepo();
            await this.copyAllFiles();
            console.log("All files synced successfully!");
        } catch (error) {
            console.error(
                "Error during sync:",
                error instanceof Error ? error.message : String(error)
            );
            throw error;
        }
    }

    private async cloneOrUpdateRepo(): Promise<void> {
        if (!fs.existsSync(this.options.cloneDir)) {
            console.log(`Cloning ${this.options.gitRepo}...`);
            execSync(
                `git clone ${this.options.gitRepo} ${this.options.cloneDir}`,
                { stdio: "inherit" }
            );
        } else {
            console.log("Updating repository...");
            execSync(`git -C ${this.options.cloneDir} pull`, {
                stdio: "inherit",
            });
        }
    }

    private filesAreSame(src: string, dest: string): boolean {
        // Check if dest doesn't exist
        if (!fs.existsSync(dest)) return false;

        const srcStat = fs.statSync(src);
        const destStat = fs.statSync(dest);

        // Quick check: if sizes differ, files are different
        if (srcStat.size !== destStat.size) return false;
        // In our usecase modification times differ isn't means files difference
        // if (srcStat.mtimeMs !== destStat.mtimeMs) return false;

        // Optional: If you want to be 100% sure, compare contents byte-by-byte:
        const srcBuffer = fs.readFileSync(src);
        const destBuffer = fs.readFileSync(dest);
        return srcBuffer.equals(destBuffer);
    }

    private async copyAllFiles(): Promise<void> {
        if (this.ignore.hasIgnoreFile()) {
            console.log(
                `Using .syncignore file: ${this.ignore.getIgnoreFile()}`
            );
        }

        const copyRecursive = (
            src: string,
            dest: string,
            relativePath: string = ""
        ): void => {
            const stat = fs.statSync(src);
            const isDirectory = stat.isDirectory();

            if (isDirectory) {
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest, { recursive: true });
                }

                const items = fs.readdirSync(src);
                items.forEach((item) => {
                    if (item !== ".git") {
                        // Skip .git folder
                        const newRelativePath = relativePath
                            ? `${relativePath}/${item}`
                            : item;
                        copyRecursive(
                            path.join(src, item),
                            path.join(dest, item),
                            newRelativePath
                        );
                    }
                });
            } else {
                // Check if this path should be ignored
                if (relativePath && this.ignore.shouldIgnore(relativePath)) {
                    if (this.options.verbose) {
                        console.log(`⏭️  Ignored: \t${relativePath}`);
                    }
                    return;
                }
                // Check if files are same skip copy
                if (this.filesAreSame(src, dest)) {
                    if (this.options.verbose) {
                        console.log(`🔁 Identical: \t${relativePath}`);
                    }
                    return;
                }
                // Copy file
                fs.copyFileSync(src, dest);
                if (this.options.verbose) {
                    console.log(`✅ Copied: \t${relativePath}`);
                }
            }
        };

        copyRecursive(this.options.cloneDir, this.options.targetDir);
    }
}

export async function syncFiles(options: SyncOptions): Promise<void> {
    const syncer = new FileSyncer(options);
    await syncer.sync();
}
