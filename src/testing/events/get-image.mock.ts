import { getFileToBuffer } from "./get-file-buffer"

export const getImageMock = async (): Promise<Express.Multer.File> => {
  const filename = __dirname + '/test.png'

  const { buffer, stream } = await getFileToBuffer(filename)

  return ({
    buffer,
    stream,
    destination: 'destination',
    fieldname: 'fieldname',
    filename: '', 
    mimetype: 'mimetype',
    originalname: 'originalName',
    path: 'path',
    size: 100,
    encoding: 'test'
  })
}