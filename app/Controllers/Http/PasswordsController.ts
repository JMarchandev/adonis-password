import Category from "App/Models/Category";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Password from "App/Models/Password";
import UpdatePasswordValidator from "App/Validators/UpdatePasswordValidator";
// import User from "App/Models/User";

export default class PasswordsController {
    async index({ view, auth }: HttpContextContract) {
        const userId = (await auth.use('web').authenticate()).id;
        const passwords = await Password.query().where("user_id", userId).preload("category");

        return view.render("password/index", { passwords });
    }

    async show({ params, view, auth }: HttpContextContract) {
        const password = await Password.query()
            .preload("category")
            .where("id", params.id)
            .firstOrFail();
            
        const userId = (await auth.use('web').authenticate()).id
        const categories = await Category.query().where("user_id", userId)
        
        return view.render("password/show", { password, categories });
    }

    async create({ view, auth }: HttpContextContract) {
        const userId = (await auth.use('web').authenticate()).id

        const password = new Password();
        const categories = await Category.query().where("user_id", userId)
        return view.render("password/create", { password, categories });
    }

    async store({ params, request, response, session, auth }: HttpContextContract) {
        await this.handleActionPasswordRequest(params, request, auth);

        session.flash({ success: "Password created" });
        return response.redirect().toRoute("home");
    }

    async update({ params, request, response, session, auth }: HttpContextContract) {
        await this.handleActionPasswordRequest(params, request, auth);

        session.flash({ success: "Password updated" });
        return response.redirect().toRoute("home");
    }

    async destroy({ params, session, response, bouncer }: HttpContextContract) {
        const password = await Password.findOrFail(params.id);
        await bouncer.authorize('destroyPassword', password)
        await password.delete();

        session.flash({ success: "Password deleted" });
        return response.redirect().toRoute("home");
    }

    private async handleActionPasswordRequest(
        params: HttpContextContract["params"],
        request: HttpContextContract["request"],
        auth: HttpContextContract["auth"]
    ) {
        const userId = (await auth.use('web').authenticate()).id
        const password = params.id
            ? await Password.findOrFail(params.id)
            : new Password();


        const data = await request.validate(UpdatePasswordValidator);

        password.merge({ ...data, userId }).save();
    }
}
