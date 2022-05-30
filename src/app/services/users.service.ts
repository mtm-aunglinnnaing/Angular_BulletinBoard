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

}


