import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
    writeFileSync(join(directory, 'CHANGELOG.md'), '# Changes\nВнутреннее изменение INTERNAL-123\n');
    writeFileSync(join(directory, 'README.md'), '[Component](https://gitlab.altegio.dev/project/commit/123)\n[Docs](https://example.com/docs)\n');
    mkdirSync(join(directory, 'web'));
    writeFileSync(join(directory, 'web', 'component.ts'), 'export const value = 42;\n');
    mkdirSync(join(directory, 'scripts', 'private-compat'), { recursive: true });
    writeFileSync(join(directory, 'scripts', 'private-compat', 'apply.mjs'), 'private package aliases\n');
    sanitize(directory);
    assert.equal(readFileSync(join(directory, '.npmrc'), 'utf8'), 'registry=https://registry.npmjs.org/\n');
    assert.doesNotMatch(readFileSync(join(directory, '.gitlab-ci.yml'), 'utf8'), /publish-to-private-service/);
    const pkg = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
    assert.equal(pkg.private, true);
    assert.equal(pkg.repository.url, `git+${target}`);
    assert.deepEqual(pkg.scripts, { build: 'vite build' });
    assert.equal(readFileSync(join(directory, 'README.md'), 'utf8'), 'Component\n[Docs](https://example.com/docs)\n');
    const changelog = readFileSync(join(directory, 'CHANGELOG.md'), 'utf8');
    assert.match(changelog, /public snapshots/);
    assert.match(changelog, /https:\/\/github\.com\/altegio\/altegio-ui-public\/commits\/main\//);
    assert.doesNotMatch(changelog, /[А-Яа-яЁё]|INTERNAL-123/);
    sanitize(directory);
    assert.equal(readFileSync(join(directory, 'CHANGELOG.md'), 'utf8'), changelog);
    assert.equal(readFileSync(join(directory, 'web', 'component.ts'), 'utf8'), 'export const value = 42;\n');
    assert.equal(existsSync(join(directory, 'scripts', 'private-compat')), false);
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

test('public snapshots reject retired brand text and filenames', () => {
  const directory = mkdtempSync(join(tmpdir(), 'public-export-brand-test-'));
  const oldName = 'y' + 'Clients';
  try {
    writeFileSync(join(directory, 'component.ts'), `export const ${oldName} = true;\n`);
    assert.throws(() => sanitize(directory), /retired brand found/);
    writeFileSync(join(directory, 'component.ts'), 'export const clientGroup = true;\n');
    const oldFile = join(directory, `${oldName}.ts`);
    writeFileSync(oldFile, 'export const clientGroup = true;\n');
    assert.throws(() => sanitize(directory), /retired brand found/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test('public snapshots reject names with the pre-3.0 prefix', () => {
  const directory = mkdtempSync(join(tmpdir(), 'public-export-prefix-test-'));
  const component = join(directory, 'component.ts');
  const legacyNames = ['Y' + 'Button', 'IY' + 'VueButtonProps', 'EY' + 'Sizes', 'isY' + 'CoreTableRow', 'y' + 'ArrowLeft', 'y' + '3Dots', '<y' + '-core-button>', 'var(--y' + '-core-color-text-primary)', '@mixin y' + '-scrollbar', 'y' + 'ds create', 'Y' + 'C_TEXT_PRIMARY'];
  try {
    for (const name of legacyNames) {
      writeFileSync(component, `export const value = '${name}';\n`);
      assert.throws(() => sanitize(directory), /legacy Y prefix/, name);
    }
    writeFileSync(component, "export const AltButton = 'alt-core-button overflow-y-auto translate-y-1 var(--alt-core-color) YELLOW TYPOGRAPHY YYYY';\nconst y2 = 0;\n");
    sanitize(directory);
    const oldFile = join(directory, `${'y' + '-arrow-left'}.icon.ts`);
    writeFileSync(oldFile, 'export const altArrowLeft = {};\n');
    assert.throws(() => sanitize(directory), /legacy Y prefix/);
    rmSync(oldFile);
    const notes = `# Migration\n<!-- legacy-names:start -->\n| \`${'Y' + 'Button'}\` | \`AltButton\` |\n<!-- legacy-names:end -->\n`;
    writeFileSync(join(directory, 'README.md'), notes);
    sanitize(directory);
    writeFileSync(join(directory, 'README.md'), `${notes}Use \`${'Y' + 'Button'}\`.\n`);
    assert.throws(() => sanitize(directory), /legacy Y prefix/);
  } finally { rmSync(directory, { recursive: true, force: true }); }
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
