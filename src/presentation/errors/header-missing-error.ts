export class HeaderMissingError extends Error {
  constructor(field: string) {
    super(`Header Missing: ${field}`);
    this.name = "HeaderMissingError";
  }
}
