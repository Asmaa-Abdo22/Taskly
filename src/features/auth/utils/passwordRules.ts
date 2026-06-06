export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

export const signUpPasswordRules: PasswordRule[] = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "No spaces", test: (v: string) => !/\s/.test(v) },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "Number", test: (v: string) => /[0-9]/.test(v) },
  { label: "Special character", test: (v: string) => /[!@#$%^&*]/.test(v) },
];

export const resetPasswordRules: PasswordRule[] = [
  { label: "8-64 characters", test: (v: string) => v.length >= 8 },
  { label: "No spaces", test: (v: string) => !/\s/.test(v) },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One Digit", test: (v: string) => /[0-9]/.test(v) },
  { label: "Special character", test: (v: string) => /[!@#$%^&*]/.test(v) },
];
