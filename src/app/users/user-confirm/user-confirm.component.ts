import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlainModalComponent } from 'src/app/components/plain-modal/plain-modal.component';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss']
})
export class UserConfirmComponent implements OnInit {

  public userData: any;
  public userList: any;
  public userListDetail: any;
  public userId: any;
  public existingUser: any;
  public userInfo: any;

  constructor(
    private router: Router,
    private shareDataSvc: SharingDataService,
    private userSvc: UsersService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userData = this.shareDataSvc.getUserData();
    this.userId = this.userData.userId;
    this.getUserList();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
  }

  getUserList() {
    this.userSvc.getUser().subscribe({
      next: result => {
        this.userList = result;
      },
      error: err => {
        console.log('=== handle error ====')
        console.log(err)
      }
    });
  }

  createUser() {
    const duplicateUser = this.userList.filter((item: any) => item.email === this.userData.email);

    if (duplicateUser.length > 0) {
      this.dialog.open(PlainModalComponent, {
        data: {
          content: ` User with ${this.userData.email} already exists !`,
          note: '',
          applyText: 'Ok'
        }
      });
    } else {
      if (!this.userId) {
        const data = {
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          confirmPwd: this.userData.confirmPwd,
          type: this.userData.type,
          phone: this.userData.phone,
          dob: this.userData.dob,
          address: this.userData.address,
          created_user_id: this.userInfo.id,
          updated_user_id: this.userInfo.id,
          deleted_user_id: this.userInfo.id,
          created_at: new Date(),
          updated_at: new Date(),
          is_removed:'false'
        };
        this.userSvc.createUser(data).subscribe({
          next: result => {
          },
          error: err => {
            console.log('=== handle error ====')
            console.log(err)
          }
        });
        this.snackBar.open('User Created Successfully!', '', { duration: 3000 });
        this.router.navigate(['/user-list']);
      }
    }
  }

    goBackUserCreate(){
      this.router.navigate(['/user']);
    }

}
