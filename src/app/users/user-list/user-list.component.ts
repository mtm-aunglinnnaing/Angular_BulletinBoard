import { ViewChild, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

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
  eachUser: any;
  dataSource!: MatTableDataSource<any>;
  userInfo: any;
  //nameFilter = new FormControl();
  //emailFilter = new FormControl();
  //filteredValues = {
  //  name: '', email: ''
  //};
  readonly formControl!: FormGroup;
  constructor(
    private usersSvc: UsersService,
    private dialog: MatDialog,
    formBuilder: FormBuilder
  ) {
    this.formControl = formBuilder.group({
      name: '',
      email: ''
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.getUserData();
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    this.onSearch();
  }

  getUserData() {
    this.usersSvc.getUser().subscribe({
      next: data => {
        this.userList = data.filter((result: any) => {
          return result.is_removed === false;
        })
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        console.log(this.userList);
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
          width: '300px',
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

  deleteUserData(userId: any) {
    this.usersSvc.getUserDetail(userId).subscribe({
      next: data => {
        this.eachUser = data;
      }
    });
    const param = {
      "id": userId,
      "name": this.eachUser.name,
      "email": this.eachUser.email,
      "password": this.eachUser.password,
      "type": this.eachUser.type,
      "phone": this.eachUser.phone,
      "address": this.eachUser.address,
      "dob": this.eachUser.dob,
      "created_user_id": this.eachUser.created_user_id,
      "updated_user_id": this.eachUser.updated_user_id,
      "deleted_user_id": this.userInfo.id,
      "created_at": this.eachUser.created_at,
      "updated_at": this.eachUser.updated_at,
      "deleted_at": new Date(),
      "is_removed": true
    };
    this.usersSvc.deleteUser(userId, param).subscribe({
      next: data => {
        alert('Deleted successfully!!!');
        this.getUserData();
      },
      error: err => {
        console.log('=== handle error ===');
        console.log(err);
      }
    })
  }

  //  onSearch() {
  //    this.nameFilter.valueChanges.subscribe((nameFilterValue: any) => {
  //      if (nameFilterValue) {
  //        this.dataSource = this.userList
  //          .filter((eachUser: any) => {
  //            return eachUser.name.toLowerCase().indexOf(nameFilterValue.toLowerCase()) >= 0;
  //          });
  //      } else {
  //        this.dataSource = this.userList;
  //      }
  //    });
  //
  //    this.emailFilter.valueChanges.subscribe((emailFilterValue: any) => {
  //      if (emailFilterValue) {
  //        this.dataSource = this.userList
  //          .filter((eachUser: any) => {
  //            return eachUser.email.toLowerCase().indexOf(emailFilterValue.toLowerCase()) >= 0;
  //          });
  //      } else {
  //        this.dataSource = this.userList;
  //      }
  //    });
  //  }

  onSearch() {
    this.dataSource.filterPredicate = ((data: any, filter: any) => {
      const a = !filter.name || data.name.toLowerCase().includes(filter.name);
      const b = !filter.email || data.email.toLowerCase().includes(filter.email);
      return a && b;
    })
    this.formControl.valueChanges.subscribe(value => {
      const filter = { ...value, name: value.name.trim().toLowerCase() } as string;
      this.dataSource.filter = filter;
    });
  }
}
