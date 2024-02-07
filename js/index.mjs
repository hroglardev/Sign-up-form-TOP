'use strict'
import { EMAIL, PHONE } from './regex.mjs'
import { validateEmailOrPhone, validateNameAndSurname, validatePasswords } from './validations.mjs'

const name = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const password = document.querySelector('#password')
const confirm = document.querySelector('#confirm')
const submit = document.querySelector('#submit')

const nameError = document.querySelector('.name-error')
const lastNameError = document.querySelector('.lastName-error')
const emailError = document.querySelector('.email-error')
const phoneError = document.querySelector('.phone-error')
const passwordError = document.querySelector('.password-error')

const inputs = Array.from(document.querySelectorAll('input'))

const isFormValid = () => {
  return inputs.every((inputElement) => !inputElement.classList.contains('red-border') && inputElement.value !== '')
}

const addEvent = (input, error, validationFunction, confirmPasswordOptional = null) => {
  input.addEventListener('input', (event) => {
    error.innerText = validationFunction()

    if (error.innerText !== '') {
      input.classList.add('red-border')
      if (confirmPasswordOptional) {
        confirmPasswordOptional.classList.add('red-border')
      }
    } else {
      input.classList.remove('red-border')
      if (confirmPasswordOptional) {
        password.classList.remove('red-border')
        confirmPasswordOptional.classList.remove('red-border')
      }
    }
  })
}

addEvent(name, nameError, () => validateNameAndSurname(name.value))
addEvent(lastName, lastNameError, () => validateNameAndSurname(lastName.value))
addEvent(email, emailError, () => validateEmailOrPhone(email.value, EMAIL, 'It must be an email with .com format'))
addEvent(phone, phoneError, () => validateEmailOrPhone(phone.value, PHONE, 'It must be a phone number with + at the start'))
addEvent(password, passwordError, () => validatePasswords(password.value, confirm.value), confirm)
addEvent(confirm, passwordError, () => validatePasswords(password.value, confirm.value), confirm)

form.addEventListener('submit', (event) => {
  event.preventDefault()
  inputs.forEach((input) => {
    input.value = ''
  })
  submit.setAttribute('disabled', true)
})

form.addEventListener('input', (_event) => {
  let isValid = isFormValid()
  if (isValid) {
    submit.removeAttribute('disabled')
  }
})
