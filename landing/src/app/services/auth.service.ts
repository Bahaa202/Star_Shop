import {Injectable} from '@angular/core';
import {ApisService} from './apis.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseurl: string = '';
  private readonly authRoute: string = '';

  loggedUser = new BehaviorSubject(null);

  constructor(private _apisService: ApisService, private _httpClient: HttpClient, private _router: Router) {
    this.baseurl = _apisService.baseurl;
    this.authRoute = _apisService.authRoute;
    (localStorage.getItem('token')) ? this.saveLogin() : Cookies.get('token') !== null ? '' : this.logout();
  }

  checkLogin() {
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.exp <= Math.trunc(Date.now() / 1000)) {
      this.logout();
      this._router.navigate(['/home']);
    } else return decodedToken;
  }

  saveLogin() {
    const decodedToken = this.checkLogin();
    this.loggedUser.next(decodedToken);
  }

  login(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/login?lang=en`, formData, {
      headers: {'X-CSRF-Token': `${Cookies.get('cookies')}`},
      withCredentials: true
    })
  }

  signup(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/signup?lang=en`, formData, {
      headers: {'X-CSRF-Token': `${Cookies.get('cookies')}`},
      withCredentials: true
    })
  }

  forgetPassword(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/forget-password?lang=en`, formData, {
      headers: {'X-CSRF-Token': `${Cookies.get('cookies')}`},
      withCredentials: true
    })
  }

  verifyCode(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/verify-code?lang=en`, formData, {
      headers: {
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'Authorization': `Bearer ${localStorage.getItem('reset')}`
      },
      withCredentials: true
    })
  }

  resetPassword(formData: any): Observable<any> {
    return this._httpClient.post(`${this.baseurl}${this.authRoute}/reset-password?lang=en`, formData, {
      headers: {
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'Authorization': `Bearer ${localStorage.getItem('reset')}`
      },
      withCredentials: true
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedUser.next(null);
    this._router.navigate(['/home']);
  }

}
