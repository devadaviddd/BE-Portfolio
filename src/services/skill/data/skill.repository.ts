import { Collection, Db, MongoClient } from 'mongodb';
import { MongoDBConfig, MongoDBRepository } from '../../../data';
import { ISkillRepository, Skill, ViewSkillResponse } from '../domain';
import { SkillDataModel, SkillMongoDBMapper } from './skill-mapper';

export class SkillCollectionRepository
  extends MongoDBRepository<Skill, SkillDataModel>
  implements ISkillRepository
{
  public client = new MongoClient(this.config.url);
  private userDatabase: Db;
  private collection: Collection<SkillDataModel>;

  constructor(config: MongoDBConfig, mapper: SkillMongoDBMapper) {
    super(config, mapper);
    this.userDatabase = this.client.db(this.config.database);
    this.collection = this.userDatabase.collection<SkillDataModel>(
      this.config.collection,
    );
  }
  create(newSkill: Skill): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(id: string, newSkill: Skill): Promise<void> {
    throw new Error('Method not implemented.');
  }
  viewSkillsByUsers(id: string): Promise<ViewSkillResponse> {
    throw new Error('Method not implemented.');
  }
  viewSkills(): Promise<ViewSkillResponse> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  
}
