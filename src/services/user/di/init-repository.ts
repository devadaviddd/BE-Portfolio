import { AWSCredential, BucketConfig, MongoDBConfig, S3Bucket } from "../../../data";
import { UserCollectionRepository, UserMongoDBMapper } from "../data";

const userCollectionConfig: MongoDBConfig = {
  database: 'Portfolio',
  collection: 'User',
  url: process.env.MONGO_DATABASE!
};

const awsCredential: AWSCredential = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
}

const userMongoDBMapper = new UserMongoDBMapper();

const userBucketConfig: BucketConfig = {
  bucketName: process.env.USER_FILE_BUCKET!
}

export const userRepository = new UserCollectionRepository(
  userCollectionConfig,
  userMongoDBMapper
);

export const userFileBucket = new S3Bucket(awsCredential, userBucketConfig)

