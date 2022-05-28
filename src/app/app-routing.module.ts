import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//users
import { UserLoginComponent } from './users/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
