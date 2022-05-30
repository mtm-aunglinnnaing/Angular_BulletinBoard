import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { PlainModalComponent } from 'src/app/components/plain-modal/plain-modal.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersSvc: UsersService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', [Validators.required])
    });
  }

  get myLoginForm() {
    return this.loginForm.controls;
  }

  login() {
    this.usersSvc.getUser().subscribe(res => {
      console.log(res)
      const user = res.find((a: any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
      });
      if (user) {
        if (user.type === 0) {
          this.router.navigate(["/post-list"]);
        } else if (user.type === 1) {
          this.router.navigate(["/post-list"]);
        }
        localStorage.setItem("userInfo", JSON.stringify(user));
      } else {
        this.dialog.open(PlainModalComponent, {
          data: {
            content: `Email or password is incorrect...`,
            note: '',
            applyText: 'Ok'
          }
        });
      }

    });
  }

}
