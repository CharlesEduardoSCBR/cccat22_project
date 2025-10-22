import axios from "axios";

export default class AccountValidate {
  static validarNome(name: string) {
    return name.split(" ").length >= 2 ? true : false;
  }

  /*
  static async validarEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    const responseGetAccount = await axios.get(
      `http://localhost:3000/accountsByEmail/${email}`
    );
    return (
      responseGetAccount.data.hasemail !== "0" &&
      responseGetAccount.data.hasemail !== 0
    );
  }
  */

  static validarEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return true;
  }

  static validarPassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  }
}
