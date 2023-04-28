export class Username {
  private static readonly usernameRegex = /^[a-z][a-zA-Z0-9._-]{1,50}$/;

  public static isValid(value?: string) {
    if (value) return this.usernameRegex.test(value);
    return false;
  }
}
