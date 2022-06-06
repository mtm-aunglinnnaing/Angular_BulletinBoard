import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

//services
import { UsersService } from 'src/app/services/users.service';

//validators
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  public passwordForm!: FormGroup;
  userInfo: any;
  userId: any;
  eachUser: any;
  constructor(
    private fb: FormBuilder,
    private usersSvc: UsersService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      confirmPassword: ['', [Validators.required, MustMatch]]
    },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    this.userId = this.userInfo.id;
    this.usersSvc.getUserDetail(this.userId).subscribe({
      next: result => {
        this.eachUser = result;
      }
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

  onSubmit(formValue: any) {
    const password = this.eachUser.password;
    if (password !== formValue.oldPassword) {
      this.snackBar.open('Incorrect Password!', '', { duration: 3000 });
    } else {
      const data = {
        "id": this.userId,
        "name": this.userInfo.name,
        "email": this.userInfo.email,
        "password": this.passwordForm.value.newPassword,
        "type": this.userInfo.type,
        "phone": this.userInfo.phone,
        "address": this.userInfo.address,
        "dob": this.userInfo.dob,
        "create-user-id": this.userInfo.created_user_id,
        "updated-user-id": this.userInfo.updated_user_id,
        "deleted-user-id": this.userInfo.deleted_user_id,
        "created-at": this.userInfo.created_at,
        "updated-at": this.userInfo.updated_at,
        "deleted-at": "",
        "is-removed": false
      }
      this.usersSvc.updateUser(data, this.userId).subscribe({
        next: result => {

        }
      });
      this.snackBar.open('Password Change Successfully!', '', { duration: 3000 });
    }
  }

  clearForm() {
    this.passwordForm.reset();
  }
}
