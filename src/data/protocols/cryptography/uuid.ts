export interface UUID {
  generate: () => Promise<string>
}
