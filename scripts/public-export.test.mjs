import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { prepare, sanitize, target } from './public-export.mjs';

test('public snapshots preserve code and remove private delivery credentials and links', () => {
  const directory = mkdtempSync(join(tmpdir(), 'public-export-test-'));
  try {
    writeFileSync(join(directory, '.npmrc'), '//private.example/:_authToken=' + 'NpmToken.' + 'fixture-token\n');
    writeFileSync(join(directory, '.gitlab-ci.yml'), 'deploy:\n  script: publish-to-private-service\n');
    writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: '@platform/altegio-ui', repository: 'internal', scripts: { build: 'vite build' } }));
    writeFileSync(join(directory, 'README.md'), '[Component](https://gitlab.altegio.dev/project/commit/123)\n[Docs](https://example.com/docs)\n');
    mkdirSync(join(directory, 'web'));
    writeFileSync(join(directory, 'web', 'component.ts'), 'export const value = 42;\n');
    sanitize(directory);
    assert.equal(readFileSync(join(directory, '.npmrc'), 'utf8'), 'registry=https://registry.npmjs.org/\n');
    assert.doesNotMatch(readFileSync(join(directory, '.gitlab-ci.yml'), 'utf8'), /publish-to-private-service/);
    const pkg = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
    assert.equal(pkg.private, true);
    assert.equal(pkg.repository.url, `git+${target}`);
    assert.deepEqual(pkg.scripts, { build: 'vite build' });
    assert.equal(readFileSync(join(directory, 'README.md'), 'utf8'), 'Component\n[Docs](https://example.com/docs)\n');
    assert.equal(readFileSync(join(directory, 'web', 'component.ts'), 'utf8'), 'export const value = 42;\n');
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('only tracked files from the requested commit enter a snapshot', () => {
  const scratch = mkdtempSync(join(tmpdir(), 'public-export-tree-test-'));
  const source = join(scratch, 'source');
  const destination = join(scratch, 'snapshot');
  mkdirSync(source); mkdirSync(destination);
  const git = args => {
    const result = spawnSync('git', args, { cwd: source });
    assert.equal(result.status, 0);
  };
  try {
    git(['init']);
    writeFileSync(join(source, 'tracked.ts'), 'original code\n');
    git(['add', '.']);
    git(['-c', 'user.name=Test', '-c', 'user.email=test@example.com', 'commit', '-m', 'source']);
    writeFileSync(join(source, 'tracked.ts'), 'uncommitted code\n');
    writeFileSync(join(source, '.env.local'), 'private local configuration\n');
    prepare(destination, 'HEAD', source);
    assert.equal(readFileSync(join(destination, 'tracked.ts'), 'utf8'), 'original code\n');
    assert.throws(() => readFileSync(join(destination, '.env.local')));
    assert.throws(() => readFileSync(join(destination, '.git', 'HEAD')));
    assert.throws(() => prepare(destination, 'HEAD', source), /empty/);
  } finally { rmSync(scratch, { recursive: true, force: true }); }
});

test('a failing secret scan blocks publication before accessing the destination', () => {
  const scratch = mkdtempSync(join(tmpdir(), 'public-export-block-test-'));
  const scanner = join(scratch, 'scanner');
  try {
    writeFileSync(scanner, '#!/bin/sh\nexit 1\n', { mode: 0o700 });
    const result = spawnSync(process.execPath, [fileURLToPath(new URL('./public-export.mjs', import.meta.url)), 'publish'], {
      env: { ...process.env, GITLEAKS_BINARY: scanner, GITHUB_PUBLIC_EXPORT_TOKEN: 'unused-fixture' },
      encoding: 'utf8',
      timeout: 30000,
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /secret scan did not pass.*No files were pushed/);
    assert.doesNotMatch(result.stdout, /published/);
  } finally { rmSync(scratch, { recursive: true, force: true }); }
});
