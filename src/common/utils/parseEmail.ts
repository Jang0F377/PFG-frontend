export const parseEmail = (email: string) => {
  const isEmail = email.includes('@');
  if (!isEmail) {
    return undefined;
  }

  const prefix = email.split('@')[0];
  return prefix;
};
