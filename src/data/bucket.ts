import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { BadRequestException, UnknownException } from '../exceptions';
import { IBucket, ImageType } from '../domains';


export interface BucketConfig {
  bucketName: string;
}

export class S3Bucket implements IBucket {
  private bucketConfig: BucketConfig;
  private bucket: AWS.S3;
  constructor(
    bucketConfig: BucketConfig,
  ) {
    this.bucketConfig = bucketConfig;
    this.bucket = new AWS.S3();
  }

  getBucketConfig(): BucketConfig {
    return this.bucketConfig;
  }

  async uploadToBucket(
    folder: string,
    fileData: Express.Multer.File,
  ): Promise<any> {
    const params = {
      Bucket: this.bucketConfig.bucketName,
      Key: `${folder}/${fileData.originalname}`,
      Body: fileData.buffer,
    };

    try {
      this.bucket.upload(params).promise();
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }

  // async getFileFromBucket(path: string): Promise<ImageType> {
  //   const params = {
  //     Bucket: this.bucketConfig.bucketName,
  //     Key: path,
  //   }

  //   try {
  //     const file = await this.bucket.getObject(params).promise();
  //     if (file) {
  //       return {
  //         pathName: path,
  //         fileName: file.Metadata?.filename as string,
  //         mimeType: file.ContentType as string,
  //         fileData: file.Body as Buffer,
  //       }
  //     }
  //     throw new BadRequestException('File not found')
  //   } catch (error) {
  //     throw new UnknownException(error as string)
  //   }
  // }
}
