export class SkillDescription {
  private static readonly usernameRegex =/^[a-z]{1,50}$/i;

  public static isValid(value?: string) {
    if (value) return this.usernameRegex.test(value);
    return false;
  }
}