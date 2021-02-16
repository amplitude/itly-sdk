/**
 * USAGE:
 *   Run via ts-node
 *   ts-node tools/scripts/dist-tag-add.ts <tag> <version>
 *
 * COMMAND
 *   dist-tag-add.ts <tag> <version>
 *
 * ARGS
 *   tag     (required)    The dist-tag (e.g. latest, beta, alpha).
 *   version (required)    Semantic version to apply the tag to
 */
/* eslint-disable no-console, import/no-extraneous-dependencies, import/no-unresolved */
import minimist from 'minimist';
import { execForAllPackages } from '../util/ItlyPackagesUtil';

// GET commandline args
const args = minimist(process.argv.slice(2));

if (!args._ || args._.length < 2) {
  // Invalid params
  const errorMessage = `ERROR: <tag> and <version> are required.
Usage: dist-tag-add.ts <tag> <version>`;
  console.error(errorMessage);
  process.exit(1);
}

const tag = args._[0];
const version = args._[1];

execForAllPackages((name, fqName) => `npm dist-tag add ${fqName}@${version} ${tag}`)
  .then(() => console.log('complete'));
