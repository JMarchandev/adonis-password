import { CategoriesColorsOptions } from "App/Constants/CategoriesColorsOptions";
import Category from "App/Models/Category";
import CategoryValidator from "App/Validators/CategoryValidator";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
    async create({ view }) {
        return view.render("categories/create", { colors: CategoriesColorsOptions, isUpdatable: false });
    }

    async store({ request, response, session, auth }: HttpContextContract) {
        await auth.use('web').authenticate()

        const category = new Category()
        
        const color = JSON.parse(request.input("color"))
        const data = await request.validate(CategoryValidator)
        
        category.merge({ ...data, color, userId: auth.user?.id }).save()

        session.flash({ success: "Category created" });
        return response.redirect().toRoute("home")
    }

    async show({ params, view }: HttpContextContract) {
        const category = await Category.query().where('id', params.id).firstOrFail();

        return view.render("categories/show", { category, colors: CategoriesColorsOptions, isUpdatable: true });
    }

    async update({ request, params, response, session }: HttpContextContract) {
        const category = await Category.findOrFail(params.id)
        
        const color = request.input("color")
        const data = await request.validate(CategoryValidator)
        
        category.merge({ ...data, color }).save();

        session.flash({ success: "Category updated" });
        return response.redirect().toRoute("home")
    }

    async destroy({ params, session, response, bouncer }: HttpContextContract) {
        const category = await Category.findOrFail(params.id);
        
        await bouncer.authorize('destroyCategory', category)
        await category.delete();

        session.flash({ success: "Category deleted" });
        return response.redirect().toRoute("home");
    }

}