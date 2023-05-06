import { Collection, Db, MongoClient } from 'mongodb';
import { MongoDBConfig, MongoDBRepository } from '../../../data';
import { IUserRepository, User, ViewUserResponse } from '../domain';
import { UserDataModel, UserMongoDBMapper } from './user-mapper';
import { UnknownException } from '../../../exceptions';

export class UserCollectionRepository
  extends MongoDBRepository<User, UserDataModel>
  implements IUserRepository
{
  public client = new MongoClient(this.config.url);
  private userDatabase: Db;
  private collection: Collection<UserDataModel>;

  constructor(config: MongoDBConfig, mapper: UserMongoDBMapper) {
    super(config, mapper);
    this.userDatabase = this.client.db(this.config.database);
    this.collection = this.userDatabase.collection<UserDataModel>(
      this.config.collection,
    );
  }

  async create(user: User): Promise<void> {
    try {
      const dataModel = this.mapper.fromDomain(user);
      await this.collection.insertOne(dataModel);
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }

  async findByEmail(email: string): Promise<boolean> {
    try {
      const query = { email: email };
      const records = await this.collection.find(query).toArray();
      if (records.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  update(email: string, newUser: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(email: string, version?: number | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  viewUsers(): Promise<ViewUserResponse> {
    throw new Error('Method not implemented.');
  }
}
