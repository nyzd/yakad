const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Replace with your actual git repo URL
const GIT_REPO = "https://github.com/your-username/yakad-template.git";

// Where to clone the template repo (relative to this script)
const CLONE_DIR = path.join(__dirname, ".cache/yakad-template");

// List files you want to copy, with relative paths from repo root
const FILES_TO_COPY = [
    "tsconfig.json",
    ".prettierrc",
    ".eslintrc.json",
    "app/error.tsx", // example file inside a folder
    // add more files here...
];

// Target directory = where this script is run from
const targetDir = process.cwd();

if (!targetDir) {
    console.error("Cannot determine current working directory.");
    process.exit(1);
}

try {
    // Clone or update the template repo
    if (!fs.existsSync(CLONE_DIR)) {
        console.log("Cloning yakad-template repository...");
        execSync(`git clone ${GIT_REPO} ${CLONE_DIR}`, { stdio: "inherit" });
    } else {
        console.log("Updating yakad-template repository...");
        execSync(`git -C ${CLONE_DIR} pull`, { stdio: "inherit" });
    }

    // Copy each file, creating folders as needed
    FILES_TO_COPY.forEach((file) => {
        const srcPath = path.join(CLONE_DIR, file);
        const destPath = path.join(targetDir, file);

        if (fs.existsSync(srcPath)) {
            // Create target folder if it doesn't exist
            const destFolder = path.dirname(destPath);
            if (!fs.existsSync(destFolder)) {
                fs.mkdirSync(destFolder, { recursive: true });
            }

            // Copy file
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ Copied: ${file}`);
        } else {
            console.warn(`⚠️ File not found in template repo: ${file}`);
        }
    });

    console.log("All files synced successfully!");
} catch (error) {
    console.error("Error during sync:", error.message);
    process.exit(1);
}
