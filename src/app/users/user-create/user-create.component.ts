import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingDataService } from 'src/app/services/sharing-data.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

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
  public currentdate = new Date();

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
      password: ['',[Validators.required,Validators.pattern('(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPwd: ['', [Validators.required, MustMatch]],
      type: [0],
      phone: ['', Validators.required],
      dob: [this.currentdate],
      address: ['']
    },
      {
        validator: MustMatch('password', 'confirmPwd')
      });
    if (this.existingUser) {
      this.userForm.patchValue({
        id: this.existingUser.id,
        name: this.existingUser.name,
        email: this.existingUser.email,
        password: this.existingUser.password,
        confirmPwd: this.existingUser.confirmPwd,
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

  confirmUser() {
    this.shareDataSvc.setUserData({
      userId: this.userId,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      confirmPwd: this.userForm.value.confirmPwd,
      type: this.userForm.value.type,
      phone: this.userForm.value.phone,
      dob: this.userForm.value.dob,
      address: this.userForm.value.address,
    });
    this.router.navigate(['/user-confirm']);
  }

  clearData() {
    this.userForm.reset();
  }
}
