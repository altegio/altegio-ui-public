import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, cpSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const WORKSPACE_DIR = 'workspace';

function log(message) {
  console.log(`[CLONE-WORKSPACE] ${message}`);
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

function copyDirectory(source, target) {
  log(`Копирование ${source} в ${target}...`);
  
  if (existsSync(target)) {
    log(`Папка ${target} уже существует, удаляем...`);
    rmSync(target, { recursive: true, force: true });
  }
  
  if (!existsSync(source)) {
    log(`Предупреждение: папка ${source} не найдена, пропускаем...`);
    return;
  }
  
  cpSync(source, target, { recursive: true });
  log(`Папка ${source} успешно скопирована в ${target}`);
}

function main() {
  log('Начинаем копирование папок в workspace...');
  
  // Создаем папку workspace если её нет
  if (!existsSync(WORKSPACE_DIR)) {
    log(`Создаем папку ${WORKSPACE_DIR}...`);
    mkdirSync(WORKSPACE_DIR, { recursive: true });
  }
  
  const workspacePath = join(process.cwd(), WORKSPACE_DIR);
  
  // Копируем angular папку
  const angularSource = join(process.cwd(), 'web/angular');
  const angularTarget = join(workspacePath, 'angular');
  copyDirectory(angularSource, angularTarget);
  
  // Копируем core папку внутрь angular/src
  const coreSource = join(process.cwd(), 'web/core');
  const coreTarget = join(angularTarget, 'src/core');
  copyDirectory(coreSource, coreTarget);
  
  // Копируем shared папку внутрь angular/src
  const sharedSource = join(process.cwd(), 'web/shared');
  const sharedTarget = join(angularTarget, 'src/shared');
  copyDirectory(sharedSource, sharedTarget);
  
  const tokensSource = join(process.cwd(), './tokens')
  const tokensTarget = join(angularTarget, 'src/tokens')
  copyDirectory(tokensSource, tokensTarget);
  
  // Копируем содержимое ng-package конфигов в angular
  const ngPackageSource = join(process.cwd(), 'configs/ng-package');
  if (existsSync(ngPackageSource)) {
    log(`Копирование содержимого ${ngPackageSource} в ${angularTarget}...`);
    cpSync(ngPackageSource, angularTarget, { recursive: true });
    log(`Содержимое ng-package конфигов успешно скопировано в ${angularTarget}`);
  } else {
    log(`Предупреждение: папка ${ngPackageSource} не найдена, пропускаем...`);
  }
  
  log('Все папки успешно скопированы в workspace/');
  log(`Angular: ${angularTarget}`);
  log(`Core (внутри angular/src): ${coreTarget}`);
  log(`Shared (внутри angular/src): ${sharedTarget}`);
  log(`Tokens (внутри angular/src): ${tokensTarget}`);
  log(`Ng-package конфиги и tsconfig.json скопированы в: ${angularTarget}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 