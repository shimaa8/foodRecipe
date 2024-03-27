import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthLogin } from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role: string | any = '';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {

    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();

    }
  }



  getProfile() {

    let endoded: any = localStorage.getItem('userToken');
    console.log(endoded);

    let decoded: any = jwtDecode(endoded);
    localStorage.setItem('userRole', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);

    console.log(decoded);
    this.getRole()

  }

  getRole() {
    if (localStorage.getItem('userToken') !== null && localStorage.getItem('userRole') !== null) {
      this.role = localStorage.getItem('userRole')
    }
  }
  onLogin(data: AuthLogin): Observable<any> {

    return this._HttpClient.post('Users/Login', data)

  }
  onVerify(data: any): Observable<any> {

    return this._HttpClient.put('Users/verify', data)

  }

  onRegister(data: any): Observable<any> {

    return this._HttpClient.post('Users/Register', data)

  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this._Router.navigate(['/auth/login'])
  }
}
