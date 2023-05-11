import { BadRequestException } from "../../../../exceptions";
import { isStringEmptyOrUndefined } from "../../../../utils";
import { v4 as uuid } from 'uuid';

export interface SkillProps {
  name: string,
  userId: string
  des?: string,
  icon?: string,
  id?: string,
}

export class Skill {
  public get name() {
    return this.props.name;
  }
  public get des() {
    return this.props.des;
  }
  public get icon() {
    return this.props.icon;
  }
  public get userId() {
    return this.props.userId;
  }
  public get id() {
    return this.props.id;
  }

  constructor(private readonly props: SkillProps) {
    if (!props) {
      throw new BadRequestException('Props of skill is null/undefined');
    }
    const {
      name,
      icon,
      des,
      id,
      userId
    } = props;
    if (isStringEmptyOrUndefined(name)) {
      throw new BadRequestException('Name of skill is null/undefined');
    }
    if (isStringEmptyOrUndefined(userId)) {
      throw new BadRequestException('Id of user is null/undefined');
    }
    if (isStringEmptyOrUndefined(id)) {
      this.props.id = uuid();
    }

  }

  public accessProps(): SkillProps {
    const {
      name,
      icon,
      des,
      id,
      userId
    } = this.props;
    return {
      name,
      userId,
      icon,
      des,
      id
    }
  }
}