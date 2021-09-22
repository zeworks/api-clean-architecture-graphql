/**
 * required fields validation of the request
 * it validates only a flat list, this validator is not iterable through nested arrays/objects
 * 
 * - if returns true, your validation is **VALID**
 * - if returns false, your validation is **INVALID**
 * 
 * @param fields request object
 * @param keys array of fields to validate
 * @returns boolean
 */
export const validateRequiredFields = (fields: any, keys: Array<string>) => {
  return [fields].map(field => keys.some(key => !field[key])).some(boo => !boo);
}
