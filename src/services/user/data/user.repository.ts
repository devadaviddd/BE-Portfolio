import { MongoClient } from "mongodb";
import { MongoDBConfig, MongoDBRepository } from "../../../data";
import { IUserRepository, User, ViewUserResponse } from "../domain";
import { UserDataModel, UserMongoDBMapper } from "./user-mapper";
import { UnknownException } from "../../../exceptions";

export class UserCollectionRepository extends MongoDBRepository<User, UserDataModel> implements IUserRepository {
  public client = new MongoClient(this.config.url);
  constructor(config: MongoDBConfig, mapper: UserMongoDBMapper) {
    super(config, mapper)
  }
  

  // export interface MongoDBConfig {
  //   database: string,
  //   collection: string
  // }
  async create(user: User): Promise<void> {
    try {
      const dataModel = this.mapper.fromDomain(user);
      const database = this.client.db(this.config.database);
      const userCollection = database.collection<UserDataModel>(this.config.collection);
      const newUser = await userCollection.insertOne(dataModel)
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }

  findByEmails(emails: string[]): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(email: string, newUser: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  delete(email: string, version?: number | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  viewUsers(): Promise<ViewUserResponse> {
    throw new Error("Method not implemented.");
  }

}