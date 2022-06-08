import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  value!: number;
  label!: string;
  typeOption = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'User' }
  ];
  userForm!: FormGroup;
  public userId: number = 0;
  public userDetail: any;
  public existingUser: any;
  public isEditUser: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shareDataSvc: SharingDataService
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.existingUser = this.activatedRoute.snapshot.data['user'];
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      type: [0],
      phone: ['', [Validators.required,
      Validators.pattern("^[0-9]{11}$")
      ]],
      dob: [''],
      address: ['']
    });
    if (this.existingUser) {
      this.userForm.patchValue({
        id: this.existingUser.id,
        name: this.existingUser.name,
        password: this.existingUser.password,
        email: this.existingUser.email,
        type: this.existingUser.type,
        phone: this.existingUser.phone,
        dob: this.existingUser.dob,
        address: this.existingUser.address,
      });
    }
    this.getUserData();
  }

  getUserData() {
    const data = this.shareDataSvc.getUserData();
    this.userDetail = data;
    if (this.userDetail) {
      this.userForm.setValue({
        name: this.userDetail.name,
        email: this.userDetail.email,
        password: this.userDetail.password,
        confirmPwd: this.userDetail.confirmPwd,
        type: this.userDetail.type,
        phone: this.userDetail.phone,
        dob: this.userDetail.dob,
        address: this.userDetail.address,
      });
    }
  }

  get myForm() {
    return this.userForm.controls;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  confirmUser() {
    this.shareDataSvc.setUserData({
      userId: this.userId,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      type: this.userForm.value.type,
      phone: this.userForm.value.phone,
      dob: this.userForm.value.dob,
      address: this.userForm.value.address,
    });
    this.router.navigate(['/user-update-confirm']);
  }

  clearData() {
    this.userForm.reset();
  }

  changePassword() {
    this.shareDataSvc.setUserId(this.activatedRoute.snapshot.params['id']);
  }
}
