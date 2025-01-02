import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseurl: string = '';
  private readonly cartRoute: string = '';

  constructor(private _apisService: ApisService, private _httpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.cartRoute = _apisService.cartRoute;
  }

  getCart(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.cartRoute}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
  }

  addToCart(productId: string): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.cartRoute}?lang=en`, {product: productId}, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }

  removeFromCart(itemId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.cartRoute}/${itemId}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.cartRoute}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }
}
