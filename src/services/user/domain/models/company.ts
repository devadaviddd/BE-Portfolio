import { BadRequestException } from "../../../../exceptions"
import { isStringEmptyOrUndefined } from "../../../../utils"

export interface CompanyProps {
  name: string
}

export class Company {
  public name: string
  
  constructor(props: CompanyProps) {
    const { name } = props;
    if(!props) {
      throw new BadRequestException('Props of Company is null / undefined')
    }
    if(isStringEmptyOrUndefined(name)) {
      throw new BadRequestException('Name is null/undefined');
    }
    this.name = name;
  }

  public readProps(): CompanyProps {
    return {
      name: this.name
    }
  }
}