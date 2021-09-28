export class FieldMissingError extends Error {
  constructor(field: string) {
    super(`Field Missing: ${field}`);
    this.name = "FieldMissingError";
  }
}
