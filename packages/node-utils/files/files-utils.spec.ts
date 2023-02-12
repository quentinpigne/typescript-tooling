import { getAllFiles } from './files-utils';

jest.mock('fs');

const DIRECTORY_STRUCTURE_MOCK = {
  rootDir: {
    folder1: {
      subfolder1: {
        'file1.js': 'console.log("contenu de file1");',
        'file2.txt': 'contenu de file2',
      },
    },
    folder2: {
      subfolder1: {
        'file3.txt': 'contenu de file3',
      },
      subfolder2: {
        'file4.txt': 'contenu de file4',
      },
    },
  },
};

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('fs').__setDirectoryStructure(DIRECTORY_STRUCTURE_MOCK);
});

describe('getAllFiles', () => {
  it('should return all files of a specified directory', () => {
    expect(getAllFiles('rootDir')).toEqual([
      { fileName: 'file1.js', path: ['folder1', 'subfolder1'] },
      { fileName: 'file2.txt', path: ['folder1', 'subfolder1'] },
      { fileName: 'file3.txt', path: ['folder2', 'subfolder1'] },
      { fileName: 'file4.txt', path: ['folder2', 'subfolder2'] },
    ]);
  });

  it('should return filtered files of a specified directory', () => {
    expect(
      getAllFiles('rootDir', undefined, undefined, { filter: (fullPath: string) => !!fullPath.match('subfolder2') }),
    ).toEqual([
      { fileName: 'file1.js', path: ['folder1', 'subfolder1'] },
      { fileName: 'file2.txt', path: ['folder1', 'subfolder1'] },
      { fileName: 'file3.txt', path: ['folder2', 'subfolder1'] },
    ]);
  });
});
