/**
 * USAGE:
 *   Run via ts-node
 *   ts-node tools/scripts/dist-tag-rm.ts <tag>
 *
 * COMMAND
 *   dist-tag-rm.ts <tag>
 *
 * ARGS
 *   tag (required)   The dist-tag to remove (e.g. latest, beta, alpha).
 */
/* eslint-disable no-console, import/no-extraneous-dependencies, import/no-unresolved */
import minimist from 'minimist';
import { execForAllPackages } from '../util/ItlyPackagesUtil';

// GET commandline args
const args = minimist(process.argv.slice(2));

if (!args._ || args._.length < 1) {
  // Invalid params
  const errorMessage = `ERROR: <tag> is required.
Usage: dist-tag-rm.ts <tag>`;
  console.error(errorMessage);
  process.exit(1);
}

const tag = args._[0];

execForAllPackages((name, fqName) => `npm dist-tag rm ${fqName} ${tag}`)
  .then(() => console.log('complete'));
