import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly baseurl: string = '';
  private readonly wishlistRoute: string = '';

  constructor(private _apisService: ApisService, private _httpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.wishlistRoute = _apisService.wishlistRoute;
  }

  getWishlist(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.wishlistRoute}?lang=en`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
      withCredentials: true
    })
  }

  addToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.wishlistRoute}?lang=en`, {productId}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.wishlistRoute}/${productId}?lang=en`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }
}
