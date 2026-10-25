#!/usr/bin/env node

import { execSync } from 'child_process';

const WORKSPACE_DIR = 'workspace';

function log(message) {
  console.log(`[BUILD-WORKSPACE] ${message}`);
}

function runCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      encoding: 'utf8'
    });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function checkWorkspace() {  
  log('Workspace found; refreshing directories...');
  runCommand('pnpm run clone-workspace');
}

function fixPaths() {
  log('Updating Angular library import paths...');
  runCommand('pnpm run fix-workspace-imports');
  log('Angular library import paths updated.');
}

function buildAngular() {
  log('Building the Angular library from the workspace...');
  runCommand('pnpm run ng-build');
  log('Angular library built successfully.');
}

function main() {
  log('Starting the workspace build...');
  
  // Проверяем и копируем workspace если нужно
  checkWorkspace();
  
  // Исправляем пути
  fixPaths();
  
  // Собираем Angular библиотеку
  buildAngular();
  
  log('Build completed successfully.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
