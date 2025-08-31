#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { syncFiles, SyncOptions } from "./sync";

const program = new Command();

program
    .name("yakad-sync")
    .description(
        "A file synchronization tool for copying files from template repositories"
    )
    .version("1.0.0");

program
    .command("sync")
    .description("Sync files from a template repository")
    .requiredOption("-r, --repo <url>", "Git repository URL to sync from")
    .option(
        "-t, --target <dir>",
        "Target directory (defaults to current directory)",
        process.cwd()
    )
    .option("-v, --verbose", "Enable verbose output")
    .action(async (options) => {
        try {
            const targetDir = path.resolve(options.target);
            const cacheDir = path.resolve(".cache/template-repo");

            const syncOptions: SyncOptions = {
                gitRepo: options.repo,
                cloneDir: cacheDir,
                targetDir,
                verbose: options.verbose,
            };

            await syncFiles(syncOptions);
        } catch (error) {
            console.error(
                "Sync failed:",
                error instanceof Error ? error.message : String(error)
            );
            process.exit(1);
        }
    });

program.parse();
