import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor() {
  }

  baseurl: string = 'http://localhost:3000';
  authRoute: string = '/api/v1/auth';
  categoriesRoute: string = '/api/v1/categories';
  subcategoriesRoute: string = '/api/v1/subcategories';
  productsRoute: string = '/api/v1/products';
  couponsRoute: string = '/api/v1/coupons';
  ordersRoute: string = '/api/v1/orders';
  usersRoute: string = '/api/v1/users';
}
