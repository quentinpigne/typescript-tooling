import { isObject } from '@quentinpigne/ts-utils/object';

interface FSModuleMock {
  __setDirectoryStructure: (newDirectoryStructure: Record<string, unknown>) => void;
  readdirSync: (path: string) => FSDirentMock[];
}

interface FSDirentMock {
  name: string;
  isDirectory: () => boolean;
}

// eslint-disable-next-line no-undef
const fs: FSModuleMock = jest.createMockFromModule('fs');

let directoryStructure: Record<string, unknown> = Object.create(null);
function __setDirectoryStructure(newDirectoryStructure: Record<string, unknown>) {
  directoryStructure = newDirectoryStructure;
}

function readdirSync(path: string): FSDirentMock[] {
  let directory = directoryStructure;
  path.split('/').forEach((subPath: string) => (directory = directory[subPath] as Record<string, unknown>));
  return Object.keys(directory).map((name: string) => ({ name, isDirectory: () => isObject(directory[name]) }));
}

fs.__setDirectoryStructure = __setDirectoryStructure;
fs.readdirSync = readdirSync;

module.exports = fs;
