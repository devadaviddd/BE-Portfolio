export class Email {
  private static readonly emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  public static isValid(value: string) {
    return this.emailRegex.test(value);
  }
}
