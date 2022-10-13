import * as fs from 'fs';
import * as path from 'path';

export interface File {
  path: string[];
  fileName: string;
}

export function getAllFiles(dirPath: string, basePath?: string, arrayOfFiles?: File[]) {
  basePath = basePath || dirPath;
  arrayOfFiles = arrayOfFiles || [];

  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((file: fs.Dirent) => {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file.name), basePath, arrayOfFiles);
    } else {
      const filePath: string = path.join(dirPath, file.name);
      const relativePath: string[] = path.relative(basePath, filePath).split('/');
      const fileName: string = relativePath.pop();
      arrayOfFiles.push({ path: relativePath, fileName });
    }
  });

  return arrayOfFiles;
}
