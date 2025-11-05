export default class Email {
  private value: string;

  constructor(value: string) {
    if (!this.isValid(value)) throw new Error("Email inválido");
    this.value = value;
  }

  private isValid(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  getValue() {
    return this.value;
  }
}
