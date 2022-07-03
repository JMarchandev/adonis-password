/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/password/create', 'PasswordsController.create').as('passwords.create')
    Route.post('/password/create', 'PasswordsController.store')

    Route.get('/password/:id', 'PasswordsController.show').as('passwords.show')
    Route.post('/password/:id', 'PasswordsController.update')
    Route.delete('/password/:id', 'PasswordsController.destroy')

    Route.get('/categories/create', 'CategoriesController.create').as('categories.create')
    Route.post('/categories/create', 'CategoriesController.store')
    
    Route.post('/categories/:id', 'CategoriesController.update')
    Route.get('/categories/:id', 'CategoriesController.show').as('categories.show')
    Route.delete('/categories/:id', 'CategoriesController.destroy')
}).middleware(['auth'])

Route.get('/', 'PasswordsController.index').as('home')

Route.get('/login', 'AuthController.login').as('login')
Route.post('/login', 'AuthController.log')

Route.get('/register', 'AuthController.register').as('register')
Route.post('/register', 'AuthController.storeRegister')

Route.get('/logout', 'AuthController.logout')