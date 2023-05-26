import { BucketConfig, MongoDBConfig, S3Bucket } from "../../../data";
import { UserCollectionRepository, UserMongoDBMapper } from "../data";

const userCollectionConfig: MongoDBConfig = {
  database: 'Portfolio',
  collection: 'User',
  url: process.env.MONGO_DATABASE!
};



const userMongoDBMapper = new UserMongoDBMapper();

const userBucketConfig: BucketConfig = {
  bucketName: process.env.USER_FILE_BUCKET!
}

export const userRepository = new UserCollectionRepository(
  userCollectionConfig,
  userMongoDBMapper
);

export const userFileBucket = new S3Bucket(userBucketConfig)

