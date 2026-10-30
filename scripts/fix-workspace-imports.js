#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';
import { glob } from 'glob';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import autoprefixer from 'autoprefixer';

const WORKSPACE_ANGULAR_DIR = 'workspace/angular';

function log(message) {
  console.log(`[FIX-IMPORTS] ${message}`);
}

async function replaceAliasesInFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  // Skip directories that match the glob
  const stat = statSync(filePath);
  if (!stat.isFile()) {
    return;
  }

  const content = readFileSync(filePath, 'utf8');
  let updatedContent = content;
  let hasChanges = false;

  // CSS imports are inlined as strings; reading them is async, so they are handled before the alias rewrites
  const cssImportPattern = /import\s+(\w+)\s+from\s+['"]([^'"]*\.css)(\?inline)?['"]/g;
  let cssMatch;
  while ((cssMatch = cssImportPattern.exec(content)) !== null) {
    const [fullMatch, varName, cssPath] = cssMatch;
    const resolvedCssPath = resolveCssPath(filePath, cssPath);
    log(`CSS import in ${filePath}: ${cssPath} -> ${resolvedCssPath}`);
    const cssContent = await readCssFile(resolvedCssPath);
    log(`CSS content for ${varName}: ${cssContent.length} characters`);
    const replacement = `const ${varName} = \`${cssContent}\`;`;
    updatedContent = updatedContent.replace(fullMatch, replacement);
    hasChanges = true;
  }

  // Synchronous alias rewrites
  const replacements = [
    
    // Drop the ?inline suffix from the remaining (non-CSS) imports
    { from: /import\s+(.+?)\s+from\s+['"](.+?)\?inline['"]/g, to: (match, importName, path) => {
      return `import ${importName} from '${path}'`;
    }},
    
    // ~ng/* -> relative path inside src/
    { from: /from ['"]~ng\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathFromSrc(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~core/* -> relative path to the copied core sources
    { from: /from ['"]~core\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToCore(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~shared/* -> relative path to the copied shared sources
    { from: /from ['"]~shared\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToShared(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~web/shared/* -> relative path to the shared copy inside the workspace
    { from: /from ['"]~web\/shared\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToShared(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~tokens/* -> relative path to the copied tokens
    { from: /from ['"]~tokens\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToTokens(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // Side-effect imports without "from", e.g. import '~core/ui/text'
    { from: /import ['"]~core\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToCore(filePath, path);
      return `import '${relativePath}'`;
    }}
  ];

  for (const replacement of replacements) {
    if (typeof replacement.to === 'function') {
      const newContent = updatedContent.replace(replacement.from, replacement.to);
      if (newContent !== updatedContent) {
        hasChanges = true;
        updatedContent = newContent;
      }
    } else {
      const newContent = updatedContent.replace(replacement.from, replacement.to);
      if (newContent !== updatedContent) {
        hasChanges = true;
        updatedContent = newContent;
      }
    }
  }

  if (hasChanges) {
    writeFileSync(filePath, updatedContent, 'utf8');
    log(`File updated: ${filePath}`);
  }
}

function getRelativePathFromSrc(fromFile, targetPath) {
  // Path of the current file relative to the Angular package root
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1); // drop the file name
  
  let upLevels = 0;
  if (fromFileDir[0] === 'src') {
    upLevels = fromFileDir.length - 1; // number of directories below src/
  } else {
    return `./${targetPath}`; // files outside src/ keep the path as is
  }
  
  const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
  return `${upPath}${targetPath}`;
}

function getRelativePathToCore(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Files inside the core copy resolve the path relative to core/src/
  if (fromFileRelative.startsWith('src/core/src/')) {
    // Count how many levels to go up from the current directory to core/src/
    const coreSubPath = fromFileDir.slice(3); // drop 'src/core/src'
    const upLevels = coreSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Any other file in src/ reaches core through src/core
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // number of directories below src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}core/src/${targetPath}`;
  } else {
    return `./src/core/src/${targetPath}`;
  }
}

function getRelativePathToShared(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Files inside the shared copy resolve the path relative to shared/
  if (fromFileRelative.startsWith('src/shared/')) {
    // Count how many levels to go up from the current directory to shared/
    const sharedSubPath = fromFileDir.slice(2); // drop 'src/shared'
    const upLevels = sharedSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Any other file in src/ reaches shared through src/shared
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // number of directories below src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}shared/${targetPath}`;
  } else {
    return `./src/shared/${targetPath}`;
  }
}

function getRelativePathToTokens(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Files inside the tokens copy resolve the path relative to tokens/
  if (fromFileRelative.startsWith('src/tokens/')) {
    // Count how many levels to go up from the current directory to tokens/
    const tokensSubPath = fromFileDir.slice(2); // drop 'src/tokens'
    const upLevels = tokensSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Any other file in src/ reaches tokens through src/tokens
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // number of directories below src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}tokens/${targetPath}`;
  } else {
    return `./src/tokens/${targetPath}`;
  }
}



function resolveCssPath(fromFile, cssPath) {
  // ~core/ alias
  if (cssPath.startsWith('~core/')) {
    const corePath = cssPath.replace('~core/', 'src/core/src/');
    return join(WORKSPACE_ANGULAR_DIR, corePath);
  }
  
  // ~shared/ alias
  if (cssPath.startsWith('~shared/')) {
    const sharedPath = cssPath.replace('~shared/', 'src/shared/');
    return join(WORKSPACE_ANGULAR_DIR, sharedPath);
  }
  
  // ~ng/ alias
  if (cssPath.startsWith('~ng/')) {
    const ngPath = cssPath.replace('~ng/', 'src/');
    return join(WORKSPACE_ANGULAR_DIR, ngPath);
  }
  
  // ~tokens/ alias
  if (cssPath.startsWith('~tokens/')) {
    const tokensPath = cssPath.replace('~tokens/', 'src/tokens/');
    return join(WORKSPACE_ANGULAR_DIR, tokensPath);
  }
  
  // ~web/shared/ alias -> the shared copy inside the workspace
  if (cssPath.startsWith('~web/shared/')) {
    const sharedPath = cssPath.replace('~web/shared/', 'src/shared/');
    return join(WORKSPACE_ANGULAR_DIR, sharedPath);
  }
  
  // Relative paths (./ or ../) resolve against the importing file
  if (cssPath.startsWith('./') || cssPath.startsWith('../')) {
    const fromDir = fromFile.split('/').slice(0, -1).join('/');
    return join(fromDir, cssPath);
  }
  
  // Absolute paths are already workspace paths
  if (cssPath.startsWith('/')) {
    return join(WORKSPACE_ANGULAR_DIR, cssPath.slice(1));
  }
  
  // Anything else is treated as relative to the importing file
  const fromDir = fromFile.split('/').slice(0, -1).join('/');
  return join(fromDir, cssPath);
}

async function readCssFile(cssPath) {
  try {
    if (existsSync(cssPath)) {
      let content = readFileSync(cssPath, 'utf8');
      
      // Inject the design token variables into .vars.css files before PostCSS runs
      if (cssPath.includes('.vars.css')) {
        content = injectCssTokens(content);
      }
      
      // Resolve imports, mixins and nesting with PostCSS first
      content = await processWithPostCSS(content, cssPath);
      
      // Then substitute the component tag names (needs the PostCSS output)
      content = await processCssVariables(content);
      
      // Remove any $component declarations that are still left
      content = content.replace(/\$component:\s*\$[A-Za-z0-9_]+;?\s*(?:\r?\n)?/g, '');
      
      // Escape backslashes, backticks and ${ so the CSS can be embedded in a template literal
      return content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    }
  } catch (error) {
    log(`Warning: failed to read CSS file ${cssPath}: ${error.message}`);
  }
  return ''; // a missing file is inlined as an empty string
}

async function processWithPostCSS(content, cssPath) {
  try {

    // PostCSS plugins
    const plugins = [
      postcssImport({
        resolve: (id, basedir) => {
          // Resolve path aliases in CSS @import statements
          if (id.startsWith('~core/')) {
            return join(WORKSPACE_ANGULAR_DIR, 'src/core/', id.replace('~core/', ''));
          }
          if (id.startsWith('~shared/')) {
            return join(WORKSPACE_ANGULAR_DIR, 'src/shared/', id.replace('~shared/', ''));
          }
          if (id.startsWith('~web/shared/')) {
            return join(WORKSPACE_ANGULAR_DIR, 'src/shared/', id.replace('~web/shared/', ''));
          }
          return id;
        }
      }),
      // postcss-simple-vars is not used here: processCssVariables() substitutes the component variables
      postcssMixins({
        mixinsDir: join(process.cwd(), 'web/core/src/assets/css/mixins')
      }),
      postcssNested(),
      autoprefixer()
    ];

    const processor = postcss(plugins);
    const result = await processor.process(content, { 
      from: cssPath,
      to: cssPath.replace('.css', '.processed.css')
    });

    return result.css;
  } catch (error) {
    log(`PostCSS processing failed for ${cssPath}: ${error.message}`);
    return content; // fall back to the unprocessed CSS on error
  }
}

async function processCssVariables(content) {
  // Replaces .$(component) selectors with the component tag name and REMOVES every $component declaration.
  // Mixins and nesting have already been handled by processWithPostCSS().
  
  // Find every $component declaration (inlined imports may bring in several)
  const componentMatches = content.matchAll(/\$component:\s*\$([A-Za-z0-9_]+);\s*(?:\r?\n)?/g);
  let foundComponent = false;
  
  for (const match of componentMatches) {
    const [fullMatch, componentVariableName] = match;
    foundComponent = true;
    log(`CSS variable found: $component: $${componentVariableName}`);
    
    // Map the tag-name constant to its value
    const componentMapping = await loadComponentMapping();
    
    const componentValue = componentMapping[componentVariableName];
    if (componentValue) {
      log(`Replacing all .$(component) occurrences with .${componentValue}`);
      
      // Replace every .$(component) selector with the actual tag name
      content = content.replace(/\.\$\(component\)/g, `.${componentValue}`);
      
      log(`Replaced all .$(component) occurrences with .${componentValue}`);
    } else {
      log(`Warning: no mapping found for variable ${componentVariableName}`);
    }
  }
  
  // IMPORTANT: remove EVERY $component declaration, whether or not a mapping was found,
  // so that no invalid CSS reaches the output
  const originalLength = content.length;
  content = content.replace(/\$component:\s*\$[A-Za-z0-9_]+;\s*(?:\r?\n)?/g, '');
  const newLength = content.length;
  
  if (originalLength !== newLength) {
    log(`Removed all $component declarations (saved ${originalLength - newLength} characters)`);
  }
  
  return content;
}

let componentMappingCache = null;

async function loadComponentMapping() {
  if (componentMappingCache) {
    return componentMappingCache;
  }
  
  try {
    // Read the tag-name constants from the source file
    const constantsPath = join(process.cwd(), 'web/shared/constants/index.ts');
    if (existsSync(constantsPath)) {
      const constantsContent = readFileSync(constantsPath, 'utf8');
      const mapping = {};
      
      // Parse the exported *TagName constants
      const exportPattern = /export const ([A-Za-z0-9_]+TagName) = ['"]([^'"]+)['"]/g;
      let match;
      
      while ((match = exportPattern.exec(constantsContent)) !== null) {
        const [, constName, tagValue] = match;
        mapping[constName] = tagValue;
      }
      
      componentMappingCache = mapping;
      log(`Loaded ${Object.keys(mapping).length} component constants from web/shared/constants/index.ts`);
      
      return mapping;
    }
    
    // Fallback: load the constants from the built file
    const builtPath = join(process.cwd(), 'web/shared/constants/build/index.cjs');
    if (existsSync(builtPath)) {
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      delete require.cache[require.resolve(builtPath)];
      const constants = require(builtPath);
      
      const mapping = {};
      for (const [key, value] of Object.entries(constants)) {
        if (key.endsWith('TagName')) {
          mapping[key] = value;
        }
      }
      
      componentMappingCache = mapping;
      log(`Loaded ${Object.keys(mapping).length} component constants from the build output`);
      
      return mapping;
    }
    
  } catch (error) {
    log(`Failed to load component mappings: ${error.message}`);
  }
  
  // Fallback: an empty mapping
  return {};
}

function injectCssTokens(content) {
  try {
    // Read the design tokens from the JSON files and generate CSS custom properties
    const tokensDir = join(WORKSPACE_ANGULAR_DIR, 'src/tokens');
    const tokensFiles = {
      colors: 'colors.json',
      extendedColors: 'extended_colours.json', 
      sizes: 'sizes.json',
      typography: 'typography.json',
      effects: 'effects.json',
      avatar: 'avatar.json'
    };

    const prefixes = {
      colors: 'color',
      extendedColors: 'color',
      sizes: 'size',
      typography: 'typography', 
      effects: 'effects',
      avatar: 'component'
    };

    // Converts camelCase/snake_case to kebab-case (same as dash() from radash)
    const toKebabCase = (str) => {
      return str
        .replace(/([A-Z])/g, '-$1')  // camelCase -> kebab-case
        .replace(/_/g, '-')          // snake_case -> kebab-case
        .toLowerCase();
    };

    let tokensVariables = '';
    
    // for (const [tokenType, filename] of Object.entries(tokensFiles)) {
    //   const tokenPath = join(tokensDir, filename);
    //   if (existsSync(tokenPath)) {
    //     const tokens = JSON.parse(readFileSync(tokenPath, 'utf8'));
    //     const prefix = prefixes[tokenType];
        
    //     for (const [key, token] of Object.entries(tokens)) {
    //       const kebabKey = toKebabCase(key);
    //       const varName = `--alt-core-${prefix}-${kebabKey}`;
    //       tokensVariables += `  ${varName}: ${token.cssValue};\n`;
    //     }
    //   }
    // }
    
    // Add the tokens to the existing :host block or create a new one
    if (content.includes(':host {')) {
      content = content.replace(':host {', `:host {\n  /* Tokens */\n${tokensVariables}`);
    } else {
      content = `:host {\n  /* Tokens */\n${tokensVariables}}\n\n` + content;
    }
    log(`Embedded CSS tokens (${tokensVariables.split('\n').length - 1} variables)`);
    
    return content;
  } catch (error) {
    log(`Warning: failed to embed tokens: ${error.message}`);
    return content;
  }
}

async function main() {
  log('Replacing aliases with relative paths...');
  
  if (!existsSync(WORKSPACE_ANGULAR_DIR)) {
    log('Directory workspace/angular not found.');
    process.exit(1);
  }
  
  // Process every TypeScript file in workspace/angular
  const pattern = join(WORKSPACE_ANGULAR_DIR, '**/*.ts');
  const files = await glob(pattern, { ignore: ['**/node_modules/**', '**/*.d.ts'] });
  
  log(`TypeScript files to process: ${files.length}`);
  
  let processedCount = 0;
  for (const file of files) {
    await replaceAliasesInFile(file);
    processedCount++;
  }
  
  log(`Processed ${processedCount} files`);
  log('Alias replacement completed.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}