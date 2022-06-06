import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }





  getPost(): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.get(url);
  }
  deletePost(postId: any, data: any): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.put(url, data);
  }

  getPostDetail(postId: any): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.get(url);
  }

  getUsersParams(userId: any): Observable<any> {
    const url = this.apiUrl + `/posts?id=${userId}`;
    return this.http.get(url);
}

getPostParams(postId: any) {
  let params = new HttpParams().set("created_user_id", postId);
  const url = this.apiUrl + '/post?id=created_user_id';
  return this.http.get(url, {params});
}


  geAllPost(): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.get(url);
  }
  
  

  async getListDetail(postId: number): Promise<object> {
    const url = this.apiUrl + '/posts/' + postId;
    console.log(postId);
    return await this.http.get(url);
  }

  createPost(data: any): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.post(url, data);
  }

  updatePost(data: any, postId: any): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.put(url, data);
  }

}
