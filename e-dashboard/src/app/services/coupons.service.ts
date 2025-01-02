import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private readonly baseurl: string = '';
  private readonly couponsRoute: string = '';

  constructor(private httpClient: HttpClient, private apisService: ApisService) {
    this.baseurl = apisService.baseurl;
    this.couponsRoute = apisService.couponsRoute;
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.couponsRoute}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  getOne(couponId: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.couponsRoute}/${couponId}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  createOne(formData: any): Observable<any> {
    return this.httpClient.post(`${this.baseurl}${this.couponsRoute}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }

  updateOne(formData: any, couponId: string): Observable<any> {
    return this.httpClient.put(`${this.baseurl}${this.couponsRoute}/${couponId}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }

  deleteOne(couponId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}${this.couponsRoute}/${couponId}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }
}
