import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export default class AuthController {
    async login({ view }: HttpContextContract) {
        return view.render("auth/login");
    }

    async register({ view }: HttpContextContract) {
        return view.render("auth/register");
    }

    async log({ request, response, session, auth }: HttpContextContract) {
        const { email, password } = request.all();

        try {
            await auth.use('web').attempt(email, password);
            return response.redirect().toRoute('home')
        } catch (error) {
            session.flash({ error: 'Invalid credentials' })
            response.redirect().toRoute("login");
        }
    }

    async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect().toRoute('login')
    }


    async storeRegister({ request, session, response, auth }: HttpContextContract) {
        const data = await request.validate(UserValidator);
        await User.create(data);

        await auth.use('web').attempt(data.email, data.password);

        session.flash({ success: "User created" });
        return response.redirect().toRoute("home");
    }
}
