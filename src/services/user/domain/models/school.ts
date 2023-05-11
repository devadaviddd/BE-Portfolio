import { BadRequestException } from "../../../../exceptions"
import { isStringEmptyOrUndefined } from "../../../../utils"

export interface SchoolProps {
  name: string
}

export class School {
  public get name() {
    return this.props.name;
  }

  constructor(private readonly props: SchoolProps) {
    const { name } = props;
    if(!props) {
      throw new BadRequestException('Props of school is null / undefined')
    }
    if(isStringEmptyOrUndefined(name)) {
      throw new BadRequestException('Name School is invalid');
    }
  }

  public readProps(): SchoolProps {
    const { name } = this.props;
    return {
      name
    }
  }
}