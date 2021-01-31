
import IStorageProvider from '../models/IStorageProvader';
import uploadConfig from '@config/upload';


class FakeStorageProvider implements IStorageProvider{
  private diskStorage: string[] = [];

  public async saveFiles(file: string): Promise<string> {
    this.diskStorage.push(file);

    return file;
  }
  public async deleteFiles(file: string): Promise<void> {
    const fileIndex = this.diskStorage.findIndex(findIndex => findIndex === file);

    this.diskStorage.splice(fileIndex, 1);
  }
}

export default FakeStorageProvider;
