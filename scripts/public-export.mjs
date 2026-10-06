import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const target = 'https://github.com/altegio/altegio-ui-public.git';
const scannerVersion = '8.30.1';
const scannerChecksums = {
  linux_x64: '551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb',
  linux_arm64: 'e4a487ee7ccd7d3a7f7ec08657610aa3606637dab924210b3aee62570fb4b080',
  darwin_arm64: 'b40ab0ae55c505963e365f271a8d3846efbc170aa17f2607f13df610a9aeb6a5',
};

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { cwd: root, maxBuffer: 256 * 1024 * 1024, ...options });
  if (result.status !== 0 || result.error) {
    throw new Error(`${command} failed (exit ${result.status ?? 'unknown'}).`);
  }
  return result.stdout;
}

export function sanitize(directory) {
  const npmrc = join(directory, '.npmrc');
  if (existsSync(npmrc)) writeFileSync(npmrc, 'registry=https://registry.npmjs.org/\n');
  const ci = join(directory, '.gitlab-ci.yml');
  if (existsSync(ci)) writeFileSync(ci, '# Internal delivery configuration is maintained in the source repository.\n');
  const packagePath = join(directory, 'package.json');
  if (existsSync(packagePath)) {
    const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
    pkg.repository = { type: 'git', url: `git+${target}` };
    pkg.private = true;
    writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
  }
  function stripLinks(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) stripLinks(file);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const before = readFileSync(file, 'utf8');
        const after = before
          .replace(/\[([^\]]+)\]\(https?:\/\/(?:gitlab\.altegio\.dev|(?:[\w.-]+\.)?figma\.com)\/[^\s)]*\)/g, '$1')
          .replace(/https?:\/\/gitlab\.altegio\.dev\/[^\s)>]+/g, '');
        if (before !== after) writeFileSync(file, after);
      }
    }
  }
  stripLinks(directory);
}

export function prepare(directory, ref = 'HEAD', source = root) {
  if (!existsSync(directory) || readdirSync(directory).length) throw new Error('Export directory must exist and be empty.');
  const archive = run('git', ['archive', '--format=tar', ref], { cwd: source });
  run('tar', ['-xf', '-', '-C', directory], { input: archive });
  sanitize(directory);
}

async function scan(directory, scratch) {
  let binary = process.env.GITLEAKS_BINARY;
  if (!binary) {
    const platform = `${process.platform}_${process.arch}`;
    const expected = scannerChecksums[platform];
    if (!expected) throw new Error(`Unsupported scanner platform: ${platform}`);
    const url = `https://github.com/gitleaks/gitleaks/releases/download/v${scannerVersion}/gitleaks_${scannerVersion}_${platform}.tar.gz`;
    const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error('Could not download the pinned export scanner.');
    const data = Buffer.from(await response.arrayBuffer());
    if (createHash('sha256').update(data).digest('hex') !== expected) throw new Error('Scanner checksum mismatch.');
    const archive = join(scratch, 'gitleaks.tar.gz');
    writeFileSync(archive, data);
    run('tar', ['-xzf', archive, '-C', scratch, 'gitleaks']);
    binary = join(scratch, 'gitleaks');
  }
  const config = join(scratch, 'gitleaks.toml');
  writeFileSync(config, `[extend]\nuseDefault = true\n\n[[rules]]\nid = "nexus-npm-token"\nregex = '''NpmToken\\.[A-Za-z0-9-]+'''\nkeywords = ["NpmToken."]\n`);
  const result = spawnSync(binary, ['dir', directory, '--config', config, '--redact', '--no-banner', '--no-color', '--log-level', 'error'], { encoding: 'utf8' });
  if (result.status !== 0 || result.error) throw new Error('Public export blocked: secret scan did not pass. No files were pushed.');
  console.log('Public snapshot secret scan passed.');
}

function publish(directory, scratch) {
  if (!process.env.GITHUB_PUBLIC_EXPORT_TOKEN) throw new Error('GITHUB_PUBLIC_EXPORT_TOKEN is required.');
  if (process.env.CI && (process.env.CI_COMMIT_BRANCH !== process.env.CI_DEFAULT_BRANCH || process.env.CI_COMMIT_REF_PROTECTED !== 'true')) {
    throw new Error('Only the protected default branch may publish code.');
  }
  const sourceRef = process.env.CI_DEFAULT_BRANCH || 'main';
  const latest = run('git', ['ls-remote', 'origin', `refs/heads/${sourceRef}`], { encoding: 'utf8' }).trim().split(/\s+/)[0];
  const sourceHead = run('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  if (latest !== sourceHead) {
    console.log('Export skipped: a newer source commit exists.');
    return;
  }
  const askpass = join(scratch, 'askpass.sh');
  writeFileSync(askpass, '#!/bin/sh\ncase "$1" in\n  *Username*) printf "%s" x-access-token ;;\n  *) printf "%s" "$GITHUB_PUBLIC_EXPORT_TOKEN" ;;\nesac\n', { mode: 0o700 });
  const environment = { ...process.env, GIT_ASKPASS: askpass, GIT_TERMINAL_PROMPT: '0' };
  const git = args => run('git', args, { cwd: directory, env: environment, encoding: 'utf8' });
  git(['init', '--initial-branch=main']);
  git(['remote', 'add', 'origin', target]);
  const refs = git(['ls-remote', '--heads', '--tags', 'origin']).trim();
  if (refs) {
    const lines = refs.split('\n');
    if (lines.length !== 1 || !lines[0].endsWith('\trefs/heads/main')) throw new Error('Destination contains unexpected branches or tags.');
    git(['fetch', '--depth=1', 'origin', 'main']);
    const subject = git(['log', '-1', '--format=%s', 'FETCH_HEAD']).trim();
    if (subject !== 'Update public code snapshot') throw new Error('Destination is not a public snapshot repository.');
    git(['update-ref', 'refs/heads/main', 'FETCH_HEAD']);
  }
  git(['add', '--force', '--all']);
  const diff = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: directory });
  if (refs && diff.status === 0) {
    console.log('Public code is already current.');
    return;
  }
  git(['-c', 'user.name=Altegio UI', '-c', 'user.email=noreply@github.com', 'commit', '-m', 'Update public code snapshot']);
  git(['push', 'origin', 'HEAD:refs/heads/main']);
  console.log('Public code snapshot published.');
}

async function main() {
  const mode = process.argv[2];
  if (!['check', 'publish', 'prepare'].includes(mode)) throw new Error('Usage: public-export.mjs check|publish|prepare [output-directory]');
  const scratch = mkdtempSync(join(tmpdir(), 'altegio-ui-export-'));
  try {
    const directory = mode === 'prepare' ? resolve(process.argv[3]) : join(scratch, 'snapshot');
    if (mode !== 'prepare') run('mkdir', ['-p', directory]);
    prepare(directory);
    await scan(directory, scratch);
    if (mode === 'publish') publish(directory, scratch);
    console.log('Public export verification passed.');
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
