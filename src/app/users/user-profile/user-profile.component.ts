import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  constructor() { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  }

}
