#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { execSync } from 'node:child_process';

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [CLEANUP-PRERELEASES] ${message}`);
}

function readPackageName() {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.name;
}

function isPrerelease(version) {
  return /-PFW-\d+\.\d+$/.test(version);
}

function getPrereleaseNpmVersions(packageName) {
  try {
    const result = execSync(`npm view ${packageName} versions --json`, { encoding: 'utf8' });
    const versions = JSON.parse(result);

    if (Array.isArray(versions)) {
      return versions.filter(isPrerelease);
    }

    return [];
  } catch (e) {
    log(`Ошибка при получении версий npm пакета: ${e.message}`);
    return [];
  }
}

function getMergedBranches(fetchDepth = 50, hours = 24) {
  try {
    log(`Получаю список коммитов в main за последние ${hours} часа`)

    execSync(`git fetch origin --depth=${fetchDepth}`, { encoding: 'utf8', stdio: 'pipe' });

    const logOutput = execSync(
      `git log origin/main --merges --since="${hours} hours ago" --pretty=format:"%s"`,
      { encoding: 'utf8' }
    );

    const branchNames = new Set();
    const lines = logOutput.split('\n');

    for (const line of lines) {
      let match = line.match(/Merge branch '([^']+)' into 'main'/)

      if (match) {
        log(`Найдена ветка ${match[1]}`)
        branchNames.add(match[1])
      }
    }
    return Array.from(branchNames.values());
  } catch (e) {
    log(`Ошибка при получении списка влитых веток: ${e.message}`);
    return [];
  }
}

function parsePrereleaseVersion(version) {
  // Найдём первую часть (semver) и вторую (branch.build)
  const dashIndex = version.indexOf('-');
  if (dashIndex === -1) {
    throw new Error(`Некорректный формат prerelease версии: ${version}`);
  }

  const semVer = version.slice(0, dashIndex);
  const rest = version.slice(dashIndex + 1);

  // Последняя точка разделяет branch и build
  const lastDotIndex = rest.lastIndexOf('.');
  if (lastDotIndex === -1) {
    throw new Error(`Некорректный формат prerelease версии: ${version}`);
  }

  const branchName = rest.slice(0, lastDotIndex);
  const build = rest.slice(lastDotIndex + 1);

  return { semVer, branchName, build };
}

function filterPrereleaseVersionsByBranches(prereleaseVersions, branchNames) {
  const branchSet = new Set(branchNames);

  return prereleaseVersions.filter(version => {
    const versionParts = parsePrereleaseVersion(version)

    if (versionParts.branchName) {
      return branchSet.has(versionParts.branchName);
    }


    return false;
  });
}

async function main() {
  log('Начинаем отчистку prerelease версий')

  const packageName = readPackageName();
  const branchHistoryHours = process.env.BRANCH_HISTORY_HOURS || 24
  const gitFetchDepth = process.env.GIT_FETCH_DEPTH || 50

  log(`Конфигурация: ${branchHistoryHours}ч, глубина: ${gitFetchDepth}`)

  const prereleaseVersions = getPrereleaseNpmVersions(packageName)

  if (prereleaseVersions.length === 0) {
    log('Prerelease версии не найдены')
    return
  }

  const mergedBranches = getMergedBranches(gitFetchDepth, branchHistoryHours)

  const filteredPrereleaseVersions = filterPrereleaseVersionsByBranches(prereleaseVersions, mergedBranches)

  if (filteredPrereleaseVersions.length === 0) {
    log('Не найдено prerelease версий, которые были влиты в main за последние 24 часа')
    return
  }

  log(`Найденные prerelease версии которые были влиты в main за последние 24 часа:`)
  log(filteredPrereleaseVersions.join(' | '))
  log('Пожалуйста удалите их из Nexus')
}

main().catch(err => {
  log(`Фатальная ошибка: ${err}`);
  process.exit(1);
});
