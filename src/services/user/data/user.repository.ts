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
  async findByEmail(email: string): Promise<User | null> {
    try {
      const query = { email: email };
      const records = await this.collection.find(query).toArray();
      if (records.length > 0) {
        const user: User = this.mapper.toDomain(records[0]);
        return user;
      }
      return null;
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  async findById(id: string): Promise<User | null> {
    try {
      const query = { _id: id };
      const userDataModel = await this.collection.findOne(query);      
      if (userDataModel) return this.mapper.toDomain(userDataModel);
      return null;
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }

  async viewUsers(): Promise<ViewUserResponse> {
    try {
      const records = await this.collection.find().toArray();
      const users: User[] = records.map((record) => {
        return this.mapper.toDomain(record);
      });
      return { result: users, length: records.length };
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  async update(_id: string, newUser: User): Promise<void> {
    try {
      const query = { _id: _id };
      const newValue = { $set: newUser };
      await this.collection.updateOne(query, newValue);
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  delete(email: string, version?: number | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
