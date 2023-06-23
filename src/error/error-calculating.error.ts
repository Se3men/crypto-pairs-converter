export class ErrorCalculating extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorCalculating';
  }
}
