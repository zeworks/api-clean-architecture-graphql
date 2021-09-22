import { validateRequiredFields } from "./required-fields-validator"

test('should return true on validate required fields', () => {
  const fields = {
    name: "jose",
    email: "a",
    age: null,
    street: "Rua Antonio Pinto de Carvalho"
  }

  expect(validateRequiredFields(fields, ["email", "name"])).toBe(true)
})

test('should return false on validate required fields', () => {
  const fields = {
    name: "jose",
    email: "a",
    age: undefined
  }

  expect(validateRequiredFields(fields, ["age"])).toBe(false)
})
