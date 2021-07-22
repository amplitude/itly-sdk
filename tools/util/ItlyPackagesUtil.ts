/* eslint-disable no-console, no-unused-vars */
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const DIR_PACKAGES = path.join(__dirname, '../../packages');
const ITLY_PACKAGE_PREFIX = '@itly';

/**
 * Returns a list of all @itly packages
 *
 * e.g. ['sdk', 'plugin-iteratively', ...]
 */
export async function getItlyPackageNames() {
  return (await fs.promises.readdir(DIR_PACKAGES))
    .filter((name) => (name === 'sdk' || name.startsWith('plugin-')));
}

/**
 * Returns fully-qualified @itly package name from package name
 *
 * e.g. 'plugin-amplitude' => '@itly/plugin-amplitude'
 * @param name
 */
export function getItlyPackageNameFQ(name: string) {
  return `${ITLY_PACKAGE_PREFIX}/${name}`;
}

/**
 * Returns a list of all @itly packages with fully-qualified names
 *
 * e.g. ['@itly/sdk', '@itly/plugin-amplitude', ...]
 */
export async function getItlyPackageNamesFQ() {
  return (await getItlyPackageNames()).map((name) => getItlyPackageNameFQ(name));
}

/**
 * Runs a command on all packages
 *
 * @param cmdResolver Resolver that returns a command string to be executed per package
 */
export async function execForAllPackages(cmdResolver: (name: string, fqName: string) => string) {
  const packages = await getItlyPackageNames();

  for (let i = 0; i < packages.length; i += 1) {
    const packageName = packages[i];
    const cmd = cmdResolver(packageName, getItlyPackageNameFQ(packageName));
    console.log(cmd);
    try {
      // eslint-disable-next-line no-await-in-loop
      exec(cmd);
      console.log(' -> success');
    } catch (err) {
      console.error('ERROR: ', err);
    }
  }
}
