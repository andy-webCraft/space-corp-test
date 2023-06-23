import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

/** Массив валидных типов загружаемых файлов */
const acceptedFiles = ['image/jpeg', 'image/png'];

/** Конфигурация multer для загрузки изображений */
export const uploadConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination(req, file, callback) {
      callback(null, './public/images');
    },
    filename(req, file, callback) {
      const fileName = `${file.fieldname}-${Date.now()}.${
        file.originalname.split('.')[1]
      }`;
      callback(null, fileName);
    },
  }),

  fileFilter(req, file, callback) {
    if (acceptedFiles.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
