import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private readonly baseurl: string = '';
  private readonly couponsRoute: string = '';
  private readonly cartRoute: string = '';

  constructor(private _apisService: ApisService, private _httpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.couponsRoute = _apisService.couponsRoute;
    this.cartRoute = _apisService.cartRoute;
  }

  applyCoupon(formData: any): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.cartRoute}/apply-coupon?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
}
