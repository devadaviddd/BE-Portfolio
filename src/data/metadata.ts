import { Db, GridFSBucket, MongoClient } from "mongodb";
import { MongoDBConfig } from "./mongo.repository";

export class MetaData {
  public bucket: GridFSBucket;
  constructor(config: MongoDBConfig) {
    const client = new MongoClient(config.url);
    const db: Db = client.db(config.database);
    this.bucket = new GridFSBucket(db, { bucketName: config.collection });  
  }
}
