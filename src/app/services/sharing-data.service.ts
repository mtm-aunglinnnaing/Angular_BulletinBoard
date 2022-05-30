import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  postData: any;
  constructor() { }

  setPostData(data: any) {
    this.postData = data;
  }

  getPostData() {
    return this.postData;
  }
}
