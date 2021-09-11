import { validateRequiredFields } from "./required-fields-validator"

test('should return true on validate required fields', () => {
  const fields = {
    nome: "jose",
    email: "a",
    age: null
  }

  expect(validateRequiredFields(fields, ["email", "nome"])).toBe(true)
})

test('should return false on validate required fields', () => {
  const fields = {
    nome: "jose",
    email: "a",
    age: undefined
  }

  expect(validateRequiredFields(fields, ["age"])).toBe(false)
})
