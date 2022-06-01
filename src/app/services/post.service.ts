import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Observable,
  BehaviorSubject
} from 'rxjs';

//service
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private router: Router,
    private userSvc: UsersService) { }

  geAllPost(): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.get(url);
  }

  getPostDetail(postId: number): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.get(url);
  }

  createPost(data: any): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.post(url, data);
  }

  updatePost(data: any, postId: any): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.put(url, data);
  }

  //to check user is loggedIn 
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(data: any) {
    this.userSvc.getUser().subscribe(res => {
      console.log(res)
      const user = res.find((a: any) => {
        return a.email === data.email && a.password === data.password;
      });
      if (user) {
        this.loggedIn.next(true);
        this.router.navigate(['/post']);
      } else {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

}
