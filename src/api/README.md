# NSwag Code Splitter

Automates the process of splitting NSwag generated TypeScript code into organized, maintainable files.

## Usage

### Option 1: Batch Script (Recommended)
```bash
# Run both NSwag generation and splitting in one command
./src/api/split-nswag.bat
```

### Option 2: NPM Scripts
```bash
# Run the splitter with default paths
npm run api:generate

# Run the splitter with custom paths
npm run api:generate-from [generated-file-path] [output-directory]
```

### Option 3: Direct Node.js
```bash
# With default paths
node src/api/nswag-splitter.js

# With custom paths
node src/api/nswag-splitter.js "/path/to/generated.ts" "/path/to/output/dir"
```

## What it does

The splitter automatically:

1. **Parses** the large generated TypeScript file
2. **Extracts** interfaces, classes, types, and enums
3. **Generates** separate files with proper imports:
   - `interfaces.ts` - Service interfaces
   - `types.ts` - DTOs and response types
   - `enums.ts` - Enum definitions
   - `*Client.ts` - Individual client implementations
   - `clients.ts` - Client barrel exports
   - `index.ts` - Main barrel exports

4. **Preserves** your existing import patterns:
   - `import * as types from './types'`
   - `import * as interfaces from './interfaces'`
   - `import { SortDirection } from './enums'`

## File Structure

After running the splitter, your API layer will have this structure:

```
src/api/
├── index.ts                 # Main exports
├── clients.ts               # Client exports
├── types.ts                 # Generated DTOs
├── interfaces.ts            # Service interfaces
├── enums.ts                 # Enum definitions
├── utils.ts                 # Utility functions
├── AuthClient.ts           # Auth service client
├── BuildingsClient.ts      # Buildings service client
├── TMsClient.ts            # TMs service client
└── [Other clients]         # Additional service clients
```

## Configuration

The splitter uses these default paths:
- **Input**: `/mnt/c/Users/Mert/Desktop/generated.ts`
- **Output**: `/mnt/c/Users/Mert/caesar-ts/src/api`

You can override these by passing arguments to the script.

## Requirements

- Node.js
- NSwag CLI tool (for generation)
- Generated TypeScript file from NSwag

## Notes

- The splitter preserves existing import patterns and code style
- Generated files maintain TypeScript typing and interface contracts
- Custom utilities and wrappers remain untouched
- The script is idempotent - safe to run multiple times