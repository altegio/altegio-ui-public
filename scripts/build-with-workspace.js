#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

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

function installWorkspaceDeps() {
  log('Installing workspace dependencies...');
  const workspacePath = join(process.cwd(), WORKSPACE_DIR, 'angular');
  
  if (existsSync(join(workspacePath, 'package.json'))) {
    log('Installing workspace/angular dependencies...');
    
    // Проверяем наличие pnpm-lock.yaml в workspace
    const hasLockfile = existsSync(join(workspacePath, 'pnpm-lock.yaml'));
    console.log(hasLockfile, 'hasLockfile')
    const installCommand = hasLockfile 
      ? 'pnpm install --frozen-lockfile' 
      : 'pnpm install --no-frozen-lockfile';
    
    log(`Running command: ${installCommand}`);
    runCommand(installCommand, workspacePath);
    log('Workspace dependencies installed.');
  } else {
    log('No package.json found in workspace/angular');
  }
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
  
  // Устанавливаем зависимости в workspace
  installWorkspaceDeps();
  
  // Собираем Angular библиотеку
  buildAngular();
  
  log('Build completed successfully.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 