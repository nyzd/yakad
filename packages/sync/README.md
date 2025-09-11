# @yakad/sync

A file synchronization tool for copying files from template repositories.

## Features

-   Clone or update Git repositories
-   Copy files and folders from template repos to your project (excluding .git)
-   Support for `.syncignore` files to exclude specific files and directories
-   Command-line interface with configurable options

## Installation

```bash
npm install @yakad/sync
```

## Usage

### Command Line

```bash
# Basic usage - copies all files from the repo
yakad-sync -r https://github.com/username/template-repo.git

# Specify target directory
yakad-sync -r https://github.com/username/template-repo.git -t ./my-project

# Enable verbose output to see what's being copied
yakad-sync -r https://github.com/username/template-repo.git -v
```

## Options

-   `-r, --repo <url>`: Git repository URL to sync from (required)
-   `-t, --target <dir>`: Target directory (default: current directory)
-   `-v, --verbose`: Enable verbose output to see copied files

## Example .syncignore file

See `.syncignore.example` in this package for a comprehensive example.

## How it works

The tool will:

1. Clone the repository to `.cache/template-repo` (or update if already exists)
2. Check for a `.syncignore` file in your target directory
3. Copy all files and folders recursively to your target directory
4. Skip files and directories that match patterns in `.syncignore`
5. Skip the `.git` folder to avoid conflicts
6. Preserve the exact folder structure from the source repository

## License

MIT
