import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 5;

export const encryptPassword = (password: string) => {
  const saltedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  return saltedPassword;
};
