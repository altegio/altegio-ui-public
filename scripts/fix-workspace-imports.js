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

  // Проверяем, что это файл, а не папка
  const stat = statSync(filePath);
  if (!stat.isFile()) {
    return;
  }

  const content = readFileSync(filePath, 'utf8');
  let updatedContent = content;
  let hasChanges = false;

  // Обрабатываем CSS импорты отдельно (они async)
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

  // Замены для алиасов (синхронные)
  const replacements = [
    
    // Заменяем ?inline импорты на обычные (удаляем ?inline) - для других типов файлов
    { from: /import\s+(.+?)\s+from\s+['"](.+?)\?inline['"]/g, to: (match, importName, path) => {
      return `import ${importName} from '${path}'`;
    }},
    
    // ~ng/* -> относительные пути в src/
    { from: /from ['"]~ng\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathFromSrc(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~core/* -> относительные пути к core/
    { from: /from ['"]~core\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToCore(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~shared/* -> относительные пути к shared/
    { from: /from ['"]~shared\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToShared(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~web/* -> относительные пути к shared/ (внутри workspace)
    { from: /from ['"]~web\/shared\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToShared(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // ~tokens/* -> относительные пути к tokens/
    { from: /from ['"]~tokens\/(.+?)['"]/g, to: (match, path) => {
      const relativePath = getRelativePathToTokens(filePath, path);
      return `from '${relativePath}'`;
    }},
    
    // Также заменяем импорты без 'from' (например, import '~core/ui/text')
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
  // Получаем путь от текущего файла к src/
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1); // убираем имя файла
  
  let upLevels = 0;
  if (fromFileDir[0] === 'src') {
    upLevels = fromFileDir.length - 1; // количество папок внутри src/
  } else {
    return `./${targetPath}`; // если файл не в src/, возвращаем как есть
  }
  
  const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
  return `${upPath}${targetPath}`;
}

function getRelativePathToCore(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Если файл уже находится внутри core/src/, используем относительный путь
  if (fromFileRelative.startsWith('src/core/src/')) {
    // Определяем сколько уровней нужно подняться от текущей папки до core/src/
    const coreSubPath = fromFileDir.slice(3); // убираем 'src/core/src'
    const upLevels = coreSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Теперь core находится в src/core
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // количество папок внутри src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}core/src/${targetPath}`;
  } else {
    return `./src/core/src/${targetPath}`;
  }
}

function getRelativePathToShared(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Если файл уже находится внутри shared/, используем относительный путь
  if (fromFileRelative.startsWith('src/shared/')) {
    // Определяем сколько уровней нужно подняться от текущей папки до shared/
    const sharedSubPath = fromFileDir.slice(2); // убираем 'src/shared'
    const upLevels = sharedSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Теперь shared находится в src/shared
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // количество папок внутри src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}shared/${targetPath}`;
  } else {
    return `./src/shared/${targetPath}`;
  }
}

function getRelativePathToTokens(fromFile, targetPath) {
  const fromFileRelative = fromFile.replace(`${WORKSPACE_ANGULAR_DIR}/`, '');
  const fromFileDir = fromFileRelative.split('/').slice(0, -1);
  
  // Если файл уже находится внутри tokens/, используем относительный путь
  if (fromFileRelative.startsWith('src/tokens/')) {
    // Определяем сколько уровней нужно подняться от текущей папки до tokens/
    const tokensSubPath = fromFileDir.slice(2); // убираем 'src/tokens'
    const upLevels = tokensSubPath.length;
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}${targetPath}`;
  }
  
  // Теперь tokens находится в src/tokens
  if (fromFileDir[0] === 'src') {
    let upLevels = fromFileDir.length - 1; // количество папок внутри src/
    const upPath = upLevels > 0 ? '../'.repeat(upLevels) : './';
    return `${upPath}tokens/${targetPath}`;
  } else {
    return `./src/tokens/${targetPath}`;
  }
}



function resolveCssPath(fromFile, cssPath) {
  // Обрабатываем алиас ~core/
  if (cssPath.startsWith('~core/')) {
    const corePath = cssPath.replace('~core/', 'src/core/src/');
    return join(WORKSPACE_ANGULAR_DIR, corePath);
  }
  
  // Обрабатываем алиас ~shared/
  if (cssPath.startsWith('~shared/')) {
    const sharedPath = cssPath.replace('~shared/', 'src/shared/');
    return join(WORKSPACE_ANGULAR_DIR, sharedPath);
  }
  
  // Обрабатываем алиас ~ng/
  if (cssPath.startsWith('~ng/')) {
    const ngPath = cssPath.replace('~ng/', 'src/');
    return join(WORKSPACE_ANGULAR_DIR, ngPath);
  }
  
  // Обрабатываем алиас ~tokens/
  if (cssPath.startsWith('~tokens/')) {
    const tokensPath = cssPath.replace('~tokens/', 'src/tokens/');
    return join(WORKSPACE_ANGULAR_DIR, tokensPath);
  }
  
  // Обрабатываем алиас ~web/shared/ -> мапим на shared/ внутри workspace
  if (cssPath.startsWith('~web/shared/')) {
    const sharedPath = cssPath.replace('~web/shared/', 'src/shared/');
    return join(WORKSPACE_ANGULAR_DIR, sharedPath);
  }
  
  // Если путь уже относительный (начинается с ./ или ../), разрешаем его
  if (cssPath.startsWith('./') || cssPath.startsWith('../')) {
    const fromDir = fromFile.split('/').slice(0, -1).join('/');
    return join(fromDir, cssPath);
  }
  
  // Если путь абсолютный в workspace
  if (cssPath.startsWith('/')) {
    return join(WORKSPACE_ANGULAR_DIR, cssPath.slice(1));
  }
  
  // Иначе считаем его относительным к текущему файлу
  const fromDir = fromFile.split('/').slice(0, -1).join('/');
  return join(fromDir, cssPath);
}

async function readCssFile(cssPath) {
  try {
    if (existsSync(cssPath)) {
      let content = readFileSync(cssPath, 'utf8');
      
      // Добавляем токены CSS в .vars.css файлы (до PostCSS)
      if (cssPath.includes('.vars.css')) {
        content = injectCssTokens(content);
      }
      
      // Обрабатываем CSS через PostCSS сначала
      content = await processWithPostCSS(content, cssPath);
      
      // Затем обрабатываем CSS переменные компонентов (после PostCSS)
      content = await processCssVariables(content);
      
      // Финальная очистка: удаляем все оставшиеся $component строки
      content = content.replace(/\$component:\s*\$[A-Za-z0-9_]+;?\s*(?:\r?\n)?/g, '');
      
      // Экранируем обратные слеши и бэктики для template literal
      return content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    }
  } catch (error) {
    log(`Warning: failed to read CSS file ${cssPath}: ${error.message}`);
  }
  return ''; // возвращаем пустую строку если файл не найден
}

async function processWithPostCSS(content, cssPath) {
  try {

    // Настройка PostCSS плагинов
    const plugins = [
      postcssImport({
        resolve: (id, basedir) => {
          // Обрабатываем алиасы для imports в CSS
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
      // Убираем postcss-simple-vars - переменные компонентов обрабатываем вручную
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
    return content; // возвращаем исходный контент при ошибке
  }
}

async function processCssVariables(content) {
  // Эта функция обрабатывает замену компонентов и УДАЛЯЕТ все $component строки
  // PostCSS миксины и вложенности обрабатываются в processWithPostCSS
  
  // Ищем все строки с $component: (могут быть несколько в разных файлах)
  const componentMatches = content.matchAll(/\$component:\s*\$([A-Za-z0-9_]+);\s*(?:\r?\n)?/g);
  let foundComponent = false;
  
  for (const match of componentMatches) {
    const [fullMatch, componentVariableName] = match;
    foundComponent = true;
    log(`CSS variable found: $component: $${componentVariableName}`);
    
    // Загружаем маппинг компонентов из константового файла
    const componentMapping = await loadComponentMapping();
    
    const componentValue = componentMapping[componentVariableName];
    if (componentValue) {
      log(`Replacing all .$(component) occurrences with .${componentValue}`);
      
      // Заменяем все использования .$(component) на реальное значение компонента
      content = content.replace(/\.\$\(component\)/g, `.${componentValue}`);
      
      log(`Replaced all .$(component) occurrences with .${componentValue}`);
    } else {
      log(`Warning: no mapping found for variable ${componentVariableName}`);
    }
  }
  
  // ВАЖНО: Удаляем ВСЕ строки с $component: независимо от того, нашли ли маппинг
  // Это гарантирует, что невалидный CSS не попадёт в финальный файл
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
    // Загружаем константы из исходного файла
    const constantsPath = join(process.cwd(), 'web/shared/constants/index.ts');
    if (existsSync(constantsPath)) {
      const constantsContent = readFileSync(constantsPath, 'utf8');
      const mapping = {};
      
      // Парсим экспорты констант
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
    
    // Fallback: пытаемся загрузить из собранного файла
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
  
  // Fallback: пустой маппинг
  return {};
}

function injectCssTokens(content) {
  try {
    // Читаем токены из JSON файлов и генерируем CSS переменные
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

    // Функция для преобразования camelCase/snake_case в kebab-case (аналог dash из radash)
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
    //       const varName = `--y-core-${prefix}-${kebabKey}`;
    //       tokensVariables += `  ${varName}: ${token.cssValue};\n`;
    //     }
    //   }
    // }
    
    // Добавляем токены в :host блок или создаем новый
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
  
  // Находим все TypeScript файлы в workspace/angular
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