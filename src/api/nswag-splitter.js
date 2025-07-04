import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class NSwagSplitter {
    constructor(generatedFilePath, outputDir) {
        this.generatedFilePath = generatedFilePath;
        this.outputDir = outputDir;
        this.content = '';
        this.interfaces = [];
        this.classes = [];
        this.types = [];
        this.enums = [];
        this.imports = [];
        this.exports = [];
    }

    run() {
        console.log('🔄 Starting NSwag code splitting...');
        
        // Read the generated file
        this.content = fs.readFileSync(this.generatedFilePath, 'utf8');
        
        // Parse the content
        this.parseContent();
        
        // Generate separate files
        this.generateFiles();
        
        console.log('✅ NSwag code splitting completed successfully!');
    }

    parseContent() {
        console.log('📝 Parsing generated TypeScript content...');
        
        const lines = this.content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            
            // Skip header comments and tslint directives
            if (this.isHeaderComment(trimmed)) {
                continue;
            }
            
            // Detect service interface definitions (for service contracts)
            if (trimmed.startsWith('export interface I') && trimmed.includes('Client')) {
                const blockData = this.extractBlock(lines, i, 'interface');
                if (blockData) {
                    this.interfaces.push(blockData);
                }
                continue;
            }
            
            // Detect class definitions (Client implementations)
            if (trimmed.startsWith('export class ') && trimmed.includes('Client')) {
                const blockData = this.extractBlock(lines, i, 'class');
                if (blockData) {
                    this.classes.push(blockData);
                }
                continue;
            }
            
            // Detect enum definitions
            if (trimmed.startsWith('export enum ')) {
                const blockData = this.extractBlock(lines, i, 'enum');
                if (blockData) {
                    this.enums.push(blockData);
                }
                continue;
            }
            
            // Detect DTO class definitions (data transfer objects)
            if (trimmed.startsWith('export class ') && !trimmed.includes('Client')) {
                const blockData = this.extractBlock(lines, i, 'class');
                if (blockData) {
                    this.types.push(blockData);
                }
                continue;
            }
            
            // Detect DTO interface definitions (data transfer objects)
            if (trimmed.startsWith('export interface I') && !trimmed.includes('Client')) {
                const blockData = this.extractBlock(lines, i, 'interface');
                if (blockData) {
                    this.types.push(blockData);
                }
                continue;
            }
        }
    }

    isHeaderComment(line) {
        return line.startsWith('//') || 
               line.startsWith('/*') || 
               line.startsWith('*') ||
               line.includes('tslint:disable') ||
               line.includes('eslint-disable') ||
               line.includes('ReSharper disable') ||
               line.trim() === '';
    }

    processInterfaceBlock(lines, startIndex) {
        const interfaceData = this.extractBlock(lines, startIndex, 'interface');
        if (interfaceData) {
            this.interfaces.push(interfaceData);
        }
    }

    processClassBlock(lines, startIndex) {
        const classData = this.extractBlock(lines, startIndex, 'class');
        if (classData) {
            this.classes.push(classData);
        }
    }

    processEnumBlock(lines, startIndex) {
        const enumData = this.extractBlock(lines, startIndex, 'enum');
        if (enumData) {
            this.enums.push(enumData);
        }
    }

    processTypeBlock(lines, startIndex) {
        const typeData = this.extractBlock(lines, startIndex, 'type');
        if (typeData) {
            this.types.push(typeData);
        }
    }

    extractBlock(lines, startIndex, type) {
        const startLine = lines[startIndex];
        const blockLines = [startLine];
        
        // Extract name from the start line
        let name = '';
        if (type === 'interface') {
            name = startLine.match(/export interface (\w+)/)?.[1];
        } else if (type === 'class') {
            name = startLine.match(/export class (\w+)/)?.[1];
        } else if (type === 'enum') {
            name = startLine.match(/export enum (\w+)/)?.[1];
        } else if (type === 'type') {
            name = startLine.match(/export (?:class|interface|type) (\w+)/)?.[1];
        }
        
        if (!name) return null;
        
        let braceCount = 0;
        let foundOpenBrace = false;
        
        // Count braces in the first line
        for (let char of startLine) {
            if (char === '{') {
                braceCount++;
                foundOpenBrace = true;
            } else if (char === '}') {
                braceCount--;
            }
        }
        
        // If the block ends on the same line
        if (foundOpenBrace && braceCount === 0) {
            return { name, lines: blockLines, type };
        }
        
        // Continue reading lines until we find the closing brace
        for (let i = startIndex + 1; i < lines.length; i++) {
            const line = lines[i];
            blockLines.push(line);
            
            for (let char of line) {
                if (char === '{') {
                    braceCount++;
                    foundOpenBrace = true;
                } else if (char === '}') {
                    braceCount--;
                }
            }
            
            if (foundOpenBrace && braceCount === 0) {
                break;
            }
        }
        
        return { name, lines: blockLines, type };
    }

    generateFiles() {
        console.log('📁 Generating separate files...');
        
        // Generate interfaces file
        this.generateInterfacesFile();
        
        // Generate types file
        this.generateTypesFile();
        
        // Generate enums file
        this.generateEnumsFile();
        
        // Generate individual client files
        this.generateClientFiles();
        
        // Generate barrel exports
        this.generateBarrelExports();
    }

    generateInterfacesFile() {
        const interfaceContent = this.interfaces.map(item => item.lines.join('\n')).join('\n\n');
        const filePath = path.join(this.outputDir, 'interfaces.ts');
        
        fs.writeFileSync(filePath, interfaceContent);
        console.log(`📄 Generated interfaces.ts`);
    }

    generateTypesFile() {
        const header = `import { formatDate } from './utils';\n`;
        const typeContent = this.types.map(item => item.lines.join('\n')).join('\n\n');
        
        const content = header + '\n' + typeContent;
        const filePath = path.join(this.outputDir, 'types.ts');
        
        fs.writeFileSync(filePath, content);
        console.log(`📄 Generated types.ts`);
    }

    generateEnumsFile() {
        const enumContent = this.enums.map(item => item.lines.join('\n')).join('\n');
        const filePath = path.join(this.outputDir, 'enums.ts');
        
        fs.writeFileSync(filePath, enumContent);
        console.log(`📄 Generated enums.ts`);
    }

    generateClientFiles() {
        this.classes.forEach(classData => {
            if (classData.name.endsWith('Client')) {
                const imports = this.generateClientImports(classData);
                const processedContent = this.processClientContent(classData.lines.join('\n'));
                const content = imports + '\n\n' + processedContent;
                const filePath = path.join(this.outputDir, `${classData.name}.ts`);
                
                fs.writeFileSync(filePath, content);
                console.log(`📄 Generated ${classData.name}.ts`);
            }
        });
    }

    generateClientImports(classData) {
        const imports = [];
        imports.push(`import * as types from './types';`);
        imports.push(`import * as interfaces from './interfaces';`);
        imports.push(`import { throwException } from './utils';`);
        
        // Add enum imports if needed
        const enumImports = this.extractEnumImports(classData.lines.join('\n'));
        if (enumImports.length > 0) {
            imports.push(`import { ${enumImports.join(', ')} } from './enums';`);
        }
        
        return imports.join('\n');
    }

    processClientContent(content) {
        let processed = content;
        
        // Get all type names from generated types
        const allTypeNames = new Set();
        
        // Add class type names
        this.types
            .filter(t => t.type === 'class')
            .forEach(t => allTypeNames.add(t.name));
        
        // Add interface type names (excluding service interfaces)
        this.types
            .filter(t => t.type === 'interface')
            .forEach(t => allTypeNames.add(t.name));
        
        // Fix interface implementations to use interfaces. prefix
        const serviceInterfaceNames = this.interfaces.map(i => i.name);
        serviceInterfaceNames.forEach(interfaceName => {
            const regex = new RegExp(`implements ${interfaceName}\\b`, 'g');
            processed = processed.replace(regex, `implements interfaces.${interfaceName}`);
        });
        
        // Convert all type references to use types. prefix
        allTypeNames.forEach(typeName => {
            // 1. Fix method return types: ): Promise<TypeName>
            processed = processed.replace(
                new RegExp(`\\): Promise<${typeName}>`, 'g'),
                `): Promise<types.${typeName}>`
            );
            
            // 2. Fix parameter types in method signatures: (param: TypeName | undefined)
            processed = processed.replace(
                new RegExp(`\\(([^:)]+):\\s*${typeName}([^\\w])`, 'g'),
                `($1: types.${typeName}$2`
            );
            
            // 3. Fix parameter types after commas: , param: TypeName
            processed = processed.replace(
                new RegExp(`(,\\s*[^:,]+):\\s*${typeName}([^\\w])`, 'g'),
                `$1: types.${typeName}$2`
            );
            
            // 4. Fix fromJS calls: TypeName.fromJS -> types.TypeName.fromJS
            processed = processed.replace(
                new RegExp(`([^\\w.])${typeName}\\.fromJS`, 'g'),
                `$1types.${typeName}.fromJS`
            );
            
            // 5. Fix variable return types: Promise.resolve<TypeName>
            processed = processed.replace(
                new RegExp(`Promise\\.resolve<${typeName}>`, 'g'),
                `Promise.resolve<types.${typeName}>`
            );
            
            // 6. Fix generic type parameters: <TypeName>
            processed = processed.replace(
                new RegExp(`<${typeName}>`, 'g'),
                `<types.${typeName}>`
            );
        });
        
        // Fix double prefixes that might have been created
        processed = processed.replace(/types\.types\./g, 'types.');
        processed = processed.replace(/interfaces\.interfaces\./g, 'interfaces.');
        
        return processed;
    }

    extractEnumImports(content) {
        const enumNames = this.enums.map(e => e.name);
        const usedEnums = [];
        
        enumNames.forEach(enumName => {
            if (content.includes(enumName) && !usedEnums.includes(enumName)) {
                usedEnums.push(enumName);
            }
        });
        
        return usedEnums;
    }

    generateTypeImports() {
        return `import {\n${this.generateInterfaceImportList()}\n} from './interfaces';`;
    }

    generateInterfaceImportList() {
        return this.interfaces
            .map(item => `    ${item.name}`)
            .join(',\n');
    }

    generateBarrelExports() {
        // Generate index.ts
        const indexContent = `// Auto-generated API exports
export * from './types';
export * from './interfaces';
export * from './clients';
`;
        fs.writeFileSync(path.join(this.outputDir, 'index.ts'), indexContent);
        console.log(`📄 Generated index.ts`);
        
        // Generate clients.ts
        const clientImports = this.classes
            .filter(c => c.name.endsWith('Client'))
            .map(c => `import {${c.name}} from './${c.name}'`)
            .join('\n');
        
        const clientExports = this.classes
            .filter(c => c.name.endsWith('Client'))
            .map(c => `    ${c.name}`)
            .join(',\n');
        
        const clientsContent = `${clientImports}

export {
${clientExports}
}
`;
        fs.writeFileSync(path.join(this.outputDir, 'clients.ts'), clientsContent);
        console.log(`📄 Generated clients.ts`);
    }
}

// CLI Usage
if (import.meta.url === `file://${process.argv[1]}`) {
    const generatedFile = process.argv[2] || '/mnt/c/Users/Mert/Desktop/generated.ts';
    const outputDir = process.argv[3] || '/mnt/c/Users/Mert/caesar-ts/src/api';
    
    const splitter = new NSwagSplitter(generatedFile, outputDir);
    splitter.run();
}

export default NSwagSplitter;