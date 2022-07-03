import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstname: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    lastname: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    email: schema.string([
      rules.email(),
      rules.required(),
    ]),
    password: schema.string([
      rules.regex(new RegExp('(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')),
      rules.required(),
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'firstname.required': 'First name is required',
    'firstname.maxLength': 'First name must be at most 255 characters',
    'lastname.required': 'Last name is required',
    'lastname.maxLength': 'Last name must be at most 255 characters',
    'email.email': 'Email is invalid',
    'email.required': 'Email is required',
    'password.required': 'Password is required',
    'password.regex': 'Password must be at least 8 characters, contain at least one number, one special character and one uppercase letter',
  }
}
