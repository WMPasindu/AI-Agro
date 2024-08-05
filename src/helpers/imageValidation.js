// src/validations/imageValidation.js
export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  if (!file) {
    return false;
  }
  return validTypes.includes(file.type);
};
