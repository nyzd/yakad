# Yakad 🚀

A comprehensive React component library and utilities built with TypeScript.

## 📦 Monorepo Structure

This project is organized as a monorepo with the following packages:

```
yakad/
├── packages/
│   ├── lib/          # Core utilities and helpers
│   ├── symbols/      # Material Design icons and symbols
│   ├── ui/           # React UI components
│   └── x/            # Advanced/extreme components
├── .github/          # GitHub workflows and templates
└── docs/             # Documentation (coming soon)
```

## 🚀 Quick Start

### Prerequisites

-   Node.js >= 16.0.0
-   npm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/NatiqQuran/yakad.git
cd yakad

# Install all dependencies
npm install
```

## 🛠️ Development Commands

### Root Level Commands

```bash
# Build all packages
npm run build

# Build specific package
npm run build:ui
npm run build:lib
npm run build:symbols
npm run build:x

# Lint all packages
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck

# Clean all packages
npm run clean

# Check for outdated dependencies
npm run outdated

# Security audit
npm run audit

# Pre-publish checks
npm run publish:check
```

### Package Level Commands

Navigate to any package directory and run:

```bash
cd packages/ui

# Build the package
npm run build

# Lint the package
npm run lint

# Type check
npm run typecheck
```

## 📚 Package Details

### @yakad/lib

Core utilities, helpers, and language support.

```bash
npm install @yakad/lib
```

### @yakad/symbols

Material Design icons and symbols.

```bash
npm install @yakad/symbols
```

### @yakad/ui

React UI components built with TypeScript.

```bash
npm install @yakad/ui
```

### @yakad/x

Advanced and extreme components for complex use cases.

```bash
npm install @yakad/x
```

## 🔧 Development Workflow

1. **Make changes** in the appropriate package
2. **Run linting** to check code quality: `npm run lint`
3. **Run type checking** to ensure type safety: `npm run typecheck`
4. **Build the package** to verify compilation: `npm run build`
5. **Test changes** locally
6. **Commit and push** your changes

## 🧪 Testing

```bash
# Run tests for all packages
npm test

# Run tests for specific package
npm test --workspace=@yakad/ui
```

## 📦 Publishing

```bash
# Build and check all packages
npm run publish:check

# Publish specific package (from package directory)
cd packages/ui
npm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all checks pass: `npm run publish:check`
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌐 Links

-   [Website](https://yakad.natiq.net)
-   [Documentation](https://docs.yakad.natiq.net) (coming soon)
-   [Issues](https://github.com/NatiqQuran/yakad/issues)
-   [Discussions](https://github.com/NatiqQuran/yakad/discussions)

## 🆘 Support

-   📧 Email: support@natiq.net
-   💬 GitHub Issues: [Create an issue](https://github.com/NatiqQuran/yakad/issues/new)
-   🐛 Bug Reports: [Bug report template](https://github.com/NatiqQuran/yakad/issues/new?template=bug_report.md)
-   ✨ Feature Requests: [Feature request template](https://github.com/NatiqQuran/yakad/issues/new?template=feature_request.md)
