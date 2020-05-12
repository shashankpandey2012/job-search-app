
const isNumber = (number) => {
  const numRegex = /^\d+$/.test(number);
  return numRegex;
};
const isPassword = (password) => {
  console.log("PASsascwedwdc", typeof password);
  if (!password) return false;
  if (password.length < 8) return false;
  return true;
};
const isConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return false;
  return true;
};

const isEmail = (email) => {
  if (!email) return false;
  const emailRegex = /\S+@\S+\.\S+/.test(email);
  return emailRegex;
};

export {
  isNumber,
  isPassword,
  isConfirmPassword,
  isEmail,
};
