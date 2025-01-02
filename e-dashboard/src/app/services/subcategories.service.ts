import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private readonly baseurl: string = '';
  private readonly subcategoriesRoute: string = '';

  constructor(private _apisService: ApisService, private _httpClient: HttpClient) {
    this.baseurl = _apisService.baseurl;
    this.subcategoriesRoute = _apisService.subcategoriesRoute;
  }

  getSubcategories(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.subcategoriesRoute}`, {withCredentials: true})
  }

  getSubcategory(subcategoryId: string): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.subcategoriesRoute}/${subcategoryId}`, {withCredentials: true})
  }

  createSubcategory(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.subcategoriesRoute}`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  updateSubcategory(formData: any, subcategoryId: string): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.subcategoriesRoute}/${subcategoryId}`, {
      withCredentials: true, headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  deleteSubcategory(subcategoryId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.subcategoriesRoute}/${subcategoryId}`, {
      withCredentials: true, headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
}
