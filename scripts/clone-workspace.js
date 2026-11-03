/**
 * Copies web/angular together with the core, shared and token sources it imports into workspace/angular, because
 * ng-packagr compiles only files under the library root. fix-workspace-imports.js then rewrites the copy; see it for
 * why the Angular package cannot be built from web/angular directly.
 */

import { existsSync, mkdirSync, rmSync, cpSync } from 'fs';
import { join } from 'path';

const WORKSPACE_DIR = 'workspace';

function log(message) {
  console.log(`[CLONE-WORKSPACE] ${message}`);
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
  
  // Create the workspace directory if it is missing
  if (!existsSync(WORKSPACE_DIR)) {
    log(`Creating directory ${WORKSPACE_DIR}...`);
    mkdirSync(WORKSPACE_DIR, { recursive: true });
  }
  
  const workspacePath = join(process.cwd(), WORKSPACE_DIR);
  
  // The Angular package is built from a copy of web/angular
  const angularSource = join(process.cwd(), 'web/angular');
  const angularTarget = join(workspacePath, 'angular');
  copyDirectory(angularSource, angularTarget);
  
  // ng-packagr only compiles files inside the package, so core is copied into angular/src
  const coreSource = join(process.cwd(), 'web/core');
  const coreTarget = join(angularTarget, 'src/core');
  copyDirectory(coreSource, coreTarget);
  
  // shared is copied into angular/src for the same reason
  const sharedSource = join(process.cwd(), 'web/shared');
  const sharedTarget = join(angularTarget, 'src/shared');
  copyDirectory(sharedSource, sharedTarget);
  
  const tokensSource = join(process.cwd(), './tokens')
  const tokensTarget = join(angularTarget, 'src/tokens')
  copyDirectory(tokensSource, tokensTarget);
  
  // Copy the ng-package configuration files into the Angular package root
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