import { BadRequestException } from "../../../../exceptions"
import { isStringEmptyOrUndefined } from "../../../../utils"

export interface SchoolProps {
  name: string
}
export class School {
  public name: string;

  constructor(props: SchoolProps) {
    const { name } = props;
    if(!props) {
      throw new BadRequestException('Props of school is null / undefined')
    }
    if(isStringEmptyOrUndefined(name)) {
      throw new BadRequestException('Name School is invalid');
    }
    this.name = name;
  }

  public readProps(): SchoolProps {
    return {
      name: this.name
    }
  }
}