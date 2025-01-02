import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly baseurl: string = '';
  private readonly ordersRoute: string = '';

  constructor(private _httpClient: HttpClient, private _apisService: ApisService) {
    this.baseurl = _apisService.baseurl;
    this.ordersRoute = _apisService.ordersRoute;
  }

  getAllOrders(page: number, limit: number): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.ordersRoute}?page=${page}&limit=${limit}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
  }

  getOrder(orderId: string): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.ordersRoute}/${orderId}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
  }

  createCashOrder(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.ordersRoute}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
}
