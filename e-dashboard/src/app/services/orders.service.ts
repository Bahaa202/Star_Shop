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

  constructor(private httpClient: HttpClient, private apisService: ApisService) {
    this.baseurl = apisService.baseurl;
    this.ordersRoute = apisService.ordersRoute;
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.ordersRoute}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  getOne(orderId: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.ordersRoute}/${orderId}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  deliverOne(orderId: string): Observable<any> {
    return this.httpClient.put(`${this.baseurl}${this.ordersRoute}/${orderId}/deliver?lang=en`, {}, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }

  payOne(orderId: string): Observable<any> {
    return this.httpClient.put(`${this.baseurl}${this.ordersRoute}/${orderId}/pay?lang=en`, {}, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }
}
