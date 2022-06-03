import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const url = this.apiUrl + '/users';
    return this.http.get(url);
  }

  getUserDetail(paramId: any): Observable<any> {
    const url = this.apiUrl + '/users/' + paramId;
    return this.http.get(url);
  }

  createUser(data: any): Observable<any> {
    const url = this.apiUrl + '/users';
    return this.http.post(url, data);
  }

  updateUser(data: any, userId: any): Observable<any> {
    const url = this.apiUrl + '/users/' + userId;
    return this.http.put(url, data);
  } 
  deleteUser(paramId: number, data: any): Observable<any> {
    const url = this.apiUrl + '/users/' + paramId;
    return this.http.put(url, data);
  }
}


