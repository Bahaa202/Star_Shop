import {Coupons} from "./coupons.interface";
import couponsSchema from "./coupons.schema";
import refactorService from "../refactor.service";

class CouponsService {
    getAll = refactorService.getAll<Coupons>(couponsSchema);
    createOne = refactorService.createOne<Coupons>(couponsSchema);
    getOne = refactorService.getOne<Coupons>(couponsSchema);
    updateOne = refactorService.updateOne<Coupons>(couponsSchema);
    deleteOne = refactorService.deleteOne<Coupons>(couponsSchema);
}

const couponsService = new CouponsService();
export default couponsService;