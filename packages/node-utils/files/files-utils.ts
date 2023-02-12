import * as fs from 'fs';
import * as path from 'path';

export interface File {
  path: string[];
  fileName: string;
}

export interface Options {
  filter: (fullPath: string) => boolean;
}

export function getAllFiles(dirPath: string, basePath?: string, arrayOfFiles?: File[], options?: Options): File[] {
  const currentBasePath: string = basePath || dirPath;
  let resultArrayOfFiles = arrayOfFiles || [];

  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((file: fs.Dirent) => {
    if (!options?.filter(path.join(dirPath, file.name))) {
      if (file.isDirectory()) {
        resultArrayOfFiles = getAllFiles(path.join(dirPath, file.name), currentBasePath, resultArrayOfFiles, options);
      } else {
        const filePath: string = path.join(dirPath, file.name);
        const relativePath: string[] = path.relative(currentBasePath, filePath).split('/');
        const fileName: string = relativePath.pop() || '';
        resultArrayOfFiles.push({ path: relativePath, fileName });
      }
    }
  });

  return resultArrayOfFiles;
}
