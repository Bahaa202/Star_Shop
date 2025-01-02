import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly baseurl: string = '';
  private readonly usersRoute: string = '';

  constructor(private httpClient: HttpClient, private apisService: ApisService) {
    this.baseurl = apisService.baseurl;
    this.usersRoute = apisService.usersRoute;
  }

  getAll(role: string = 'employee'): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.usersRoute}?lang=en&role=${role}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  getOne(userId: string): Observable<any> {
    return this.httpClient.get(`${this.baseurl}${this.usersRoute}/${userId}?lang=en`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
  }

  createOne(formData: any): Observable<any> {
    return this.httpClient.post(`${this.baseurl}${this.usersRoute}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }

  updateOne(formData: any, userId: string): Observable<any> {
    return this.httpClient.put(`${this.baseurl}${this.usersRoute}/${userId}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }

  deleteOne(userId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseurl}${this.usersRoute}/${userId}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    });
  }
}
