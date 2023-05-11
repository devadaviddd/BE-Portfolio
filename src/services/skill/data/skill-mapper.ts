import { DatabaseMapper } from '../../../utils';
import { Skill, SkillProps } from '../domain';

export interface SkillDataModel {
  name: string,
  userId: string
  des: string | undefined,
  icon: string | undefined,
  _id: string | undefined,
}

export class SkillMongoDBMapper extends DatabaseMapper<
  Skill,
  SkillDataModel
> {
  toDomain(dataModel: SkillDataModel): Skill {
    const skill = new Skill({
      id: dataModel._id,
      name: dataModel.name,
      des: dataModel.des,
      userId: dataModel.userId,
      icon: dataModel.icon
    });
    return skill;
  }

  fromDomain(domainModel: Skill): SkillDataModel {
    const skill: SkillProps = domainModel.accessProps();
    const data: SkillDataModel = {
      _id: skill.id,
      name: skill.name,
      des: skill.des,
      userId: skill.userId,
      icon: skill.icon
    };
    return data;
  }
}
