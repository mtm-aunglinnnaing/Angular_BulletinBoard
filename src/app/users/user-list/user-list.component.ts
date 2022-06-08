import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//services
import { UsersService } from 'src/app/services/users.service';

//pages
import { ListModalComponent } from 'src/app/components/list-modal/list-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'created_user_id', 'phone', 'dob', 'address', 'created_at', 'updated_at', 'action'];
  userList: any = [];
  orgList: any = [];
  eachUser: any;
  dataSource!: MatTableDataSource<any>;
  userInfo: any;
  nameFilter: any;
  emailFilter: any;
  fromDate: any;
  toDate: any;

  constructor(
    private router: Router,
    private usersSvc: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUserData();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
  }

  getUserData() {
    this.usersSvc.getUser().subscribe({
      next: data => {
        this.orgList = data.filter((result: any) => {
          this.usersSvc.getUserDetail(result.created_user_id).subscribe({
            next: user => {
              result.user_name = user.name;
            }
          });
          return result.is_removed === false;
        })
        this.userList = data.filter((result: any) => {
          this.usersSvc.getUserDetail(result.created_user_id).subscribe({
            next: user => {
              result.user_name = user.name;
            }
          });
          return result.is_removed === false;
        })
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log('=== handle error ===');
        console.log(err);
      }
    });
  }

  getEachUser(userId: any) {
    this.usersSvc.getUserDetail(userId).subscribe({
      next: res => {
        this.eachUser = res;
        this.dialog.open(ListModalComponent, {
          width: '600px',
          data: {
            name: res.name,
            email: res.email,
            phone: res.phone,
            dob: res.dob,
            address: res.address,
            created_date: res.created_at
          }
        });
      },
      error: err => {
        console.log('=== handle error ===');
        console.log(err);
      }
    });
  }

  updateUserData(userId: any) {
    this.router.navigate(['/user/' + userId]);
  }

  deleteUserData(userId: any) {
    this.usersSvc.getUserDetail(userId).subscribe({
      next: data => {
        this.eachUser = data;
        const param = {
          id: userId,
          name: this.eachUser.name,
          email: this.eachUser.email,
          password: this.eachUser.password,
          type: this.eachUser.type,
          phone: this.eachUser.phone,
          address: this.eachUser.address,
          dob: this.eachUser.dob,
          created_user_id: this.eachUser.created_user_id,
          updated_user_id: this.eachUser.updated_user_id,
          deleted_user_id: this.userInfo.id,
          created_at: this.eachUser.created_at,
          updated_at: this.eachUser.updated_at,
          deleted_at: new Date(),
          is_removed: true
        };
        this.usersSvc.deleteUser(userId, param).subscribe({
          next: data => {
            this.snackBar.open('User Deleted Successfully!', '', { duration: 3000 });
            this.getUserData();
          },
          error: err => {
            console.log('=== handle error ===');
            console.log(err);
          }
        })
      }
    });
  }

  onSearch() {
    if (!this.nameFilter && !this.emailFilter && !this.fromDate && !this.toDate) {
      this.getUserData();
    }
    if (this.nameFilter && !this.emailFilter && !this.fromDate && !this.toDate) {
      //for name filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    } else if (!this.nameFilter && this.emailFilter && !this.fromDate && !this.toDate) {
      //for email filter
      let result = this.orgList.filter((e: any) => {
        return e.email.includes(this.emailFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (!this.nameFilter && !this.emailFilter && this.fromDate && this.toDate) {
      //for date filter
      let result = this.orgList.filter((e: any) => {
        return new Date(e.created_at).getDate() >= this.fromDate.getDate()
          && new Date(e.created_at).getDate() <= this.toDate.getDate();
      });
      this.dataSource = new MatTableDataSource(result);
    } else if (this.nameFilter && this.emailFilter && !this.fromDate && !this.toDate) {
      //for name and email filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter) && e.email.includes(this.emailFilter);
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (this.nameFilter && !this.emailFilter && this.fromDate && this.toDate) {
      //for name and date filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter) && new Date(e.created_at) >= this.fromDate && new Date(e.created_at) <= this.toDate;
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else if (!this.nameFilter && this.emailFilter && this.fromDate && this.toDate) {
      //for email and date filter
      let result = this.orgList.filter((e: any) => {
        return e.email.includes(this.emailFilter)
          && new Date(e.created_at).getDate() >= this.fromDate.getDate()
          && new Date(e.created_at).getDate() <= this.toDate.getDate();
      });
      this.dataSource = new MatTableDataSource(result);
    }
    else {
      //for name , email and date filter
      let result = this.orgList.filter((e: any) => {
        return e.name.trim().toLowerCase().includes(this.nameFilter)
          && e.email.includes(this.emailFilter)
          && new Date(e.created_at).getDate() >= this.fromDate.getDate()
          && new Date(e.created_at).getDate() <= this.toDate.getDate();
      });
      this.dataSource = new MatTableDataSource(result);
    }
    this.dataSource.paginator = this.paginator;
  }

  onClickUserCreate() {
    this.router.navigate(['/user']);
  }
}
