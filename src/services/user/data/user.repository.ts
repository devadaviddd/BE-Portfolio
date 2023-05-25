import {
  Collection,
  Db,
  GridFSBucket,
  GridFSFile,
  MongoClient,
  ObjectId,
} from 'mongodb';
import { MongoDBConfig, MongoDBRepository } from '../../../data';
import {
  IUserRepository,
  User,
  ViewUserResponse,
  ViewUsersResponse,
} from '../domain';
import {
  AvatarChunkModel,
  UserDataModel,
  UserMongoDBMapper,
} from './user-mapper';
import { UnknownException } from '../../../exceptions';
import { DefaultBytesSize } from '../../../config';
export class UserCollectionRepository
  extends MongoDBRepository<User, UserDataModel>
  implements IUserRepository
{
  public client = new MongoClient(this.config.url);
  private userDatabase: Db;
  private collection: Collection<UserDataModel>;
  private avatarCollection: Collection<AvatarChunkModel>;

  constructor(config: MongoDBConfig, mapper: UserMongoDBMapper) {
    super(config, mapper);
    this.userDatabase = this.client.db(this.config.database);
    this.collection = this.userDatabase.collection<UserDataModel>(
      this.config.collection,
    );
    this.avatarCollection =
      this.userDatabase.collection('User.chunks');
  }
  async create(user: User): Promise<void> {
    try {
      const dataModel = this.mapper.fromDomain(user);
      await this.collection.insertOne(dataModel);
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  async findByEmail(email: string): Promise<ViewUserResponse | null> {
    try {
      const query = { email: email };
      const records = await this.collection.find(query).toArray();
      if (records.length > 0) {
        const user: User = this.mapper.toDomain(records[0]);
        const avatarFiles = await this.userDatabase
          .collection('User')
          .aggregate([
            {
              $lookup: {
                from: 'User.files',
                localField: '_id',
                foreignField: 'metadata.userId',
                as: 'AvatarFile',
              },
            },
            {
              $unwind: '$AvatarFile',
            },
          ])
          .toArray();

        const userAvatarFiles = avatarFiles.filter((avatarFile) => {
          if (avatarFile.email === email) {
            return avatarFile;
          }
        });

        const  image = '';    
        return { user, base64Image: image };
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

  async viewUsers(): Promise<ViewUsersResponse> {
    try {
      const records = await this.collection.find().toArray();

      const users: User[] = records.map((record) => {
        const user = this.mapper.toDomain(record);
        return user;
      });

      const avatarFiles = await this.userDatabase
        .collection('User')
        .aggregate([
          {
            $lookup: {
              from: 'User.files',
              localField: '_id',
              foreignField: 'metadata.userId',
              as: 'AvatarFile',
            },
          },
          {
            $unwind: '$AvatarFile',
          },
        ])
        .toArray();

      const usersWithAvatar: ViewUserResponse[] = await Promise.all(
        users.map(async (user) => {
          const userAvatarFiles = avatarFiles.filter((avatarFile) => {
            if (avatarFile.email === user.email) {
              return avatarFile;
            }
          });
          const image = '';
          // if (userAvatarFiles) {
          //   const latestAvatar =
          //     userAvatarFiles[userAvatarFiles.length - 1];
          //   const avatarId = latestAvatar.AvatarFile._id;

          //   image = await metaData.getImageAsBase64(
          //     avatarId.toString(),
          //   );
          // }
          return { user, base64Image: image };
        }),
      );

      return {
        result: usersWithAvatar,
        length: usersWithAvatar.length,
      };
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  async update(id: string, newUser: User): Promise<void> {
    try {
      const query = { _id: id };
      const dataModel = this.mapper.fromDomain(newUser);
      await this.collection.updateOne(query, { $set: dataModel });
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const query = { _id: id };
      await this.collection.deleteOne(query);
    } catch (error) {
      throw new UnknownException(error as string);
    }
  }
}
