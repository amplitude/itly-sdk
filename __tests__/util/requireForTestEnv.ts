/* eslint-disable import/no-dynamic-require, global-require */
import path from 'path';

export type TestEnv = 'src' | 'dist';

export type ImportPathMap = { [testEnv in TestEnv]: string };

const DEFAULT_TEST_ENV: TestEnv = 'src';
const DEFAULT_IMPORT_PATHS: ImportPathMap = {
  src: '../index',
  dist: '../../dist/index',
};

export default function requireForTestEnv(
  dirname: string,
  pathMap = DEFAULT_IMPORT_PATHS,
  testEnv?: TestEnv,
) {
  const TEST_ENV = (testEnv || process.env.TEST_ENV || DEFAULT_TEST_ENV) as TestEnv;

  return require(path.join(dirname, pathMap[TEST_ENV])).default;
}
