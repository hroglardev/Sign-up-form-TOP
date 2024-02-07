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
const errors = Array.from(document.querySelectorAll('.error-message'))

const addEvent = (element, error, callback, confirmPasswordOptional = null) => {
  element.addEventListener('input', (_event) => {
    error.innerText = callback()
    if (error.innerText !== '') {
      element.classList.add('red-border')
      if (confirmPasswordOptional) {
        confirmPasswordOptional.classList.add('red-border')
      }
    } else {
      element.classList.remove('red-border')
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

  let hasErrors = false

  errors.forEach((error) => {
    if (error.innerText !== '') {
      hasErrors = true
    }
  })

  if (hasErrors) {
    submit.setAttribute('disabled', true)
  } else {
    submit.removeAttribute('disabled')

    inputs.forEach((input) => {
      input.value = ''
    })
  }
})
