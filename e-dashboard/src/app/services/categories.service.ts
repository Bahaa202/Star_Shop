import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly baseurl: string = '';
  private readonly categoriesRoute: string = '';

  constructor(private _httpClient: HttpClient, private _apisService: ApisService) {
    this.baseurl = _apisService.baseurl;
    this.categoriesRoute = _apisService.categoriesRoute;
  }

  getCategories(): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.categoriesRoute}`, {withCredentials: true})
  }

  getCategory(categoryId: string): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.categoriesRoute}/${categoryId}`, {withCredentials: true})
  }

  createCategory(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.categoriesRoute}`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  updateCategory(formData: any, categoryId: string): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.categoriesRoute}/${categoryId}`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.categoriesRoute}/${categoryId}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
}
