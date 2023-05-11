import { Skill } from '../models';

export interface ViewSkillResponse {
  result: Skill[];
  length: number;
}

export interface ISkillRepository {
  create(newSkill: Skill): Promise<void>;
  update(id: string, newSkill: Skill): Promise<void>;
  viewSkillsByUsers(id: string): Promise<ViewSkillResponse>;
  viewSkills(): Promise<ViewSkillResponse>;
  delete(id: string): Promise<void>;
}
