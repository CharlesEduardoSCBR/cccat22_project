export default class Name {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) throw new Error("Nome inválido");
    this.value = value;
  }

  private isValid(value: string) {
    return /[a-zA-Z]+ [a-zA-Z]+/.test(value);
  }

  getValue() {
    return this.value;
  }
}
