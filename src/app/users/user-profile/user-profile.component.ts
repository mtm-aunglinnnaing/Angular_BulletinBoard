import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  type: any;
  constructor() { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');

    if(this.userInfo.type == 0) {
      this.type = 'Admin';
    } else {
      this.type = 'User';
    }
  }

}
