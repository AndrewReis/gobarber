import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProvader';
import uploadConfig from '@config/upload';


class DiskStorageProvider implements IStorageProvider{
  public async saveFiles(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.directory,'uploads', file),
    );

    return file;
  }
  public async deleteFiles(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, 'uploads', file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filePath);
  }

}

export default DiskStorageProvider;
