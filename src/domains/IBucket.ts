export type ImageType = {
  pathName: string;
  fileName: string;
  mimeType: string;
  fileData: Buffer;
}

export interface IBucket {
  uploadToBucket(folder: string, fileData: Express.Multer.File): Promise<any>;
}