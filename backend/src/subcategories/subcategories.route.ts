import {Router} from 'express';
import subcategoriesService from "./subcategories.service";
import subcategoriesValidation from "./subcategories.validation";
import authService from "../auth/auth.service";

const subcategoriesRoute: Router = Router({mergeParams: true});

subcategoriesRoute.route('/')
    .get(subcategoriesService.filterSubcategories, subcategoriesService.getAll)
    .post(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), subcategoriesService.setCategoryId, subcategoriesValidation.createOne, subcategoriesService.createOne);

subcategoriesRoute.route('/:id')
    .get(subcategoriesValidation.getOne, subcategoriesService.getOne)
    .put(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), subcategoriesValidation.updateOne, subcategoriesService.updateOne)
    .delete(authService.protectedRoutes, authService.checkActive, authService.allowedTo('admin', 'employee'), subcategoriesValidation.deleteOne, subcategoriesService.deleteOne);

export default subcategoriesRoute;