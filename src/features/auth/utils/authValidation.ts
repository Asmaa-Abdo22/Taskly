export const nameRegex = /^\p{L}+(?: \p{L}+)*$/u;

export const passwordSpecialCharacterRegex = /[^\p{L}\p{N}\s]/u;

export const passwordValidation = {
  minLength: 8,
  maxLength: 64,
  noWhitespace: /^\S+$/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  specialCharacter: passwordSpecialCharacterRegex,
};
