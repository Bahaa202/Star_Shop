import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly baseurl: string = '';
  private readonly profileRoute: string = '';

  constructor(private _httpClient: HttpClient, private _apisService: ApisService) {
    this.baseurl = this._apisService.baseurl;
    this.profileRoute = this._apisService.profileRoute;
  }

  getProfile(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.profileRoute}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
  }

  updateProfile(formData: any): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.profileRoute}`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }

  changePassword(formData: any): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.profileRoute}/change-password`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }

  createPassword(formData: any): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.profileRoute}/create-password`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
    })
  }
}
