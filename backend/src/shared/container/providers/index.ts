import { container } from 'tsyringe';

import IStorageProvader from './storageProvider/models/IStorageProvader';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvader>('DiskStorageProvider', DiskStorageProvider);
