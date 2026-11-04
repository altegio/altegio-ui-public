import { spawnSync } from 'node:child_process';

const project = process.argv[2];
if (!['core', 'vue', 'angular', 'a11y'].includes(project)) {
  throw new Error('Expected a browser test project: core, vue, angular or a11y');
}

// WebKit memory grows across Angular test files and exhausts a 4 GiB runner.
// Sequential shards release the browser between halves of the suite.
const shards = process.env.TEST_BROWSER === 'webkit' && project === 'angular' ? 2 : 1;
for (let shard = 1; shard <= shards; shard += 1) {
  const args = ['test-unit', '--project', project];
  if (shards > 1) args.push(`--shard=${shard}/${shards}`);
  const result = spawnSync('pnpm', args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
