import { MongoDBConfig } from "../../../data";
import { UserCollectionRepository, UserMongoDBMapper } from "../data";

const userCollectionConfig: MongoDBConfig = {
  database: 'Portfolio',
  collection: 'User',
  url: process.env.MONGO_DATABASE!
};

const userMongoDBMapper = new UserMongoDBMapper();

export const userRepository = new UserCollectionRepository(
  userCollectionConfig,
  userMongoDBMapper
);