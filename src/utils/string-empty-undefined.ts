export const isStringEmptyOrUndefined = (value: string | null | undefined) => {
  return !value || value === '';
};
