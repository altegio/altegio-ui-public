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
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

function copyDirectory(source, target) {
  log(`Copying ${source} to ${target}...`);
  
  if (existsSync(target)) {
    log(`Directory ${target} already exists; removing it...`);
    rmSync(target, { recursive: true, force: true });
  }
  
  if (!existsSync(source)) {
    log(`Warning: directory ${source} not found; skipping...`);
    return;
  }
  
  cpSync(source, target, { recursive: true });
  log(`Directory ${source} copied to ${target}`);
}

function main() {
  log('Copying directories to the workspace...');
  
  // Создаем папку workspace если её нет
  if (!existsSync(WORKSPACE_DIR)) {
    log(`Creating directory ${WORKSPACE_DIR}...`);
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
    log(`Copying ${ngPackageSource} contents to ${angularTarget}...`);
    cpSync(ngPackageSource, angularTarget, { recursive: true });
    log(`ng-package configuration copied to ${angularTarget}`);
  } else {
    log(`Warning: directory ${ngPackageSource} not found; skipping...`);
  }
  
  log('All directories copied to workspace/');
  log(`Angular: ${angularTarget}`);
  log(`Core (in angular/src): ${coreTarget}`);
  log(`Shared (in angular/src): ${sharedTarget}`);
  log(`Tokens (in angular/src): ${tokensTarget}`);
  log(`ng-package configuration and tsconfig.json copied to: ${angularTarget}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 