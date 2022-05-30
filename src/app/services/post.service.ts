import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) { }

  getPost()
  {
    return this.http.get(this.url);
  }
}
