import { join } from 'path';

import { getFileToBuffer } from './get-file-to-buffer.mock';

export const getFileMock = async () => {
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, 'photo.jpg'),
  );

  const photo = {
    fieldname: 'photo-fieldname',
    originalname: 'camaro-amarelo.jpg',
    encoding: 'Content-Transfer-Encoding',
    mimetype: 'Content-Type',
    size: 1000,
    stream,
    destination: 'uploads',
    filename: 'filename',
    path: 'file-path',
    buffer,
  };

  return photo;
};
