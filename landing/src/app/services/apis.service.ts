import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor() {
  }

  readonly baseurl: string = 'http://localhost:3000';
  readonly authRoute: string = '/api/v1/auth';
  readonly productsRoute: string = '/api/v1/products';
  readonly wishlistRoute: string = '/api/v1/wishlist';
  readonly reviewsRoute: string = '/api/v1/reviews';
  readonly cartRoute: string = '/api/v1/cart';
  readonly couponsRoute: string = '/api/v1/coupons';
  readonly ordersRoute: string = '/api/v1/orders';
  readonly profileRoute: string = '/api/v1/profile';
}
