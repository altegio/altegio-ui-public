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
    console.error(`Ошибка выполнения команды: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function checkWorkspace() {  
  log('Workspace найден, обновляем папки...');
  runCommand('pnpm run clone-workspace');
}

function fixPaths() {
  log('Исправляем пути в Angular библиотеке...');
  runCommand('pnpm run fix-workspace-imports');
  log('Исправлены пути в Angular библиотеке!');
}

function installWorkspaceDeps() {
  log('Устанавливаем зависимости в workspace...');
  const workspacePath = join(process.cwd(), WORKSPACE_DIR, 'angular');
  
  if (existsSync(join(workspacePath, 'package.json'))) {
    log('Устанавливаем зависимости в workspace/angular...');
    
    // Проверяем наличие pnpm-lock.yaml в workspace
    const hasLockfile = existsSync(join(workspacePath, 'pnpm-lock.yaml'));
    console.log(hasLockfile, 'hasLockfile')
    const installCommand = hasLockfile 
      ? 'pnpm install --frozen-lockfile' 
      : 'pnpm install --no-frozen-lockfile';
    
    log(`Используем команду: ${installCommand}`);
    runCommand(installCommand, workspacePath);
    log('Зависимости в workspace установлены!');
  } else {
    log('package.json не найден в workspace/angular');
  }
}

function buildAngular() {
  log('Собираем Angular библиотеку с workspace...');
  runCommand('pnpm run ng-build');
  log('Angular библиотека успешно собрана!');
}

function main() {
  log('Начинаем сборку с workspace...');
  
  // Проверяем и копируем workspace если нужно
  checkWorkspace();
  
  // Исправляем пути
  fixPaths();
  
  // Устанавливаем зависимости в workspace
  installWorkspaceDeps();
  
  // Собираем Angular библиотеку
  buildAngular();
  
  log('Сборка завершена успешно!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 