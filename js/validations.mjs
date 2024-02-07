import { PASSWORD } from './regex.mjs'

export const validateNameAndSurname = (nameOrSurname) => {
  if (nameOrSurname[0] !== nameOrSurname[0].toUpperCase()) {
    return 'You must use an initial capital letter'
  }
  if (nameOrSurname.slice(1) !== nameOrSurname.slice(1).toLowerCase()) {
    return 'The name must be in lower case except for the first character'
  }
  return ''
}

export const validateEmailOrPhone = (emailOrPhone, regex, message) => {
  if (!regex.test(emailOrPhone)) {
    return message
  }
  return ''
}

export const validatePasswords = (password, confirmation) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!PASSWORD.test(password)) {
    return 'Password must contain a capital letter, a lowercase letter and a special character'
  }

  if (password !== confirmation) {
    return 'Passwords do not match'
  }
  return ''
}
