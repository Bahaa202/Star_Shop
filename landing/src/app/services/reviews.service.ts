import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApisService} from './apis.service';
import {Observable} from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private readonly baseurl: string = '';
  private readonly reviewsRoute: string = '';
  private readonly productsRoute: string = '';

  constructor(private _httpClient: HttpClient, private _apisService: ApisService) {
    this.baseurl = _apisService.baseurl;
    this.reviewsRoute = _apisService.reviewsRoute;
    this.productsRoute = _apisService.productsRoute;
  }

  getReviews(page: number, limit: number): Observable<any> {
    return this._httpClient.get(`${this.baseurl}${this.reviewsRoute}/my?page=${page}&limit=${limit}`, {
      withCredentials: true,
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
  }

  addReview(productId: string, formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.productsRoute}/${productId}/reviews?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  updateReview(reviewId: string, formData: any): Observable<any> {
    return this._httpClient.put(`${this.baseurl}${this.reviewsRoute}/${reviewId}?lang=en`, formData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }

  deleteReview(reviewId: string): Observable<any> {
    return this._httpClient.delete(`${this.baseurl}${this.reviewsRoute}/${reviewId}?lang=en`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      }
    })
  }
}
