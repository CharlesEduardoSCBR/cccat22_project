import axios from "axios";

function validarNome(name: string) {
  return name.split(" ").length >= 2 ? true : false;
}

async function validarEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  const responseGetAccount = await axios.get(`http://localhost:3000/accountsByEmail/${email}`);
  return responseGetAccount.data.hasemail !== "0" && responseGetAccount.data.hasemail !== 0;
}

function validarPassword(password: string) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

export const validateSignup = {
  validarNome,
  validarEmail,
  validarPassword,
};
