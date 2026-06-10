import { passwordValidation } from "./authValidation";

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export const signUpPasswordRules: PasswordRule[] = [
  {
    label: "At least 8 characters",
    test: (v: string) => v.length >= passwordValidation.minLength,
  },
  {
    label: "No spaces",
    test: (v: string) => passwordValidation.noWhitespace.test(v),
  },
  {
    label: "Uppercase letter",
    test: (v: string) => passwordValidation.uppercase.test(v),
  },
  {
    label: "Lowercase letter",
    test: (v: string) => passwordValidation.lowercase.test(v),
  },
  {
    label: "Number",
    test: (v: string) => passwordValidation.number.test(v),
  },
  {
    label: "Special character",
    test: (v: string) => passwordValidation.specialCharacter.test(v),
  },
];

export const resetPasswordRules: PasswordRule[] = [
  {
    label: "8-64 characters",
    test: (v: string) =>
      v.length >= passwordValidation.minLength &&
      v.length <= passwordValidation.maxLength,
  },
  {
    label: "No spaces",
    test: (v: string) => passwordValidation.noWhitespace.test(v),
  },
  {
    label: "Uppercase letter",
    test: (v: string) => passwordValidation.uppercase.test(v),
  },
  {
    label: "Lowercase letter",
    test: (v: string) => passwordValidation.lowercase.test(v),
  },
  {
    label: "One Digit",
    test: (v: string) => passwordValidation.number.test(v),
  },
  {
    label: "Special character",
    test: (v: string) => passwordValidation.specialCharacter.test(v),
  },
];
