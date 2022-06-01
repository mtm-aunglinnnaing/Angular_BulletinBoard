import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  postData: any;
  userData: any;
  constructor() { }

  setPostData(data: any) {
    this.postData = data;
  }

  getPostData() {
    return this.userData;
  }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

}
