export class SkillName {
  private static readonly usernameRegex =/^[a-z]{1,20}$/i;

  public static isValid(value?: string) {
    if (value) return this.usernameRegex.test(value);
    return false;
  }
}