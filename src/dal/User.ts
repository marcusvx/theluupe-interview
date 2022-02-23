export interface IUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  password?: string;
  passwordConfirmation: string;
}
