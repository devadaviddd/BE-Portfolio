import { Db, GridFSBucket, MongoClient, ObjectId } from "mongodb";
import { MongoDBConfig } from "./mongo.repository";
import mongoose from "mongoose";

export class MetaData {
  public bucket: GridFSBucket;
  constructor(config: MongoDBConfig) {
    const client = new MongoClient(config.url);
    const db: Db = client.db(config.database);
    this.bucket = new GridFSBucket(db, { bucketName: config.collection });
  }

  public getImageAsBase64 = async (id: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];
      this.bucket
        .openDownloadStream(new ObjectId(id))
        .on('error', (error) => {
          reject(error);
        })
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .on('end', () => {
          const imageBuffer = Buffer.concat(chunks);
          const base64Image = imageBuffer.toString('base64');
          resolve(base64Image);
        });
    });
  }
}
