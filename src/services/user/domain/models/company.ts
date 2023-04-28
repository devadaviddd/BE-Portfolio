import { BadRequestException } from "../../../../exceptions"
import { isStringEmptyOrUndefined } from "../../../../utils"

export interface CompanyProps {
  name: string
}

export class Company {
  constructor(private readonly props: CompanyProps) {
    const { name } = props;


    if(!props) {
      throw new BadRequestException('Props of Company is null / undefined')
    }
    if(isStringEmptyOrUndefined(name)) {
      throw new BadRequestException('Name is null/undefined');
    }
  }

  public readProps(): CompanyProps {
    const { name } = this.props;
    return {
      name
    }
  }
}