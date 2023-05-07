import { User, UserProps } from "../services/user/domain";

export const userResponseFormat = (users: User[]): UserProps[] => {
  return users.map((user) => {
    return user.accessProps();
  })
}
