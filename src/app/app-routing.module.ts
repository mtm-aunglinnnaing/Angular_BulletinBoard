import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserConfirmComponent } from './users/user-confirm/user-confirm.component';


//resolver
import { PostResolver } from './resolver/post.resolver';
import { UserResolver } from './resolver/user.resolver';

//guard
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: '', component: UserLoginComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'post', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostCreateComponent, resolve: { post: PostResolver }, canActivate: [AuthGuard] },
  { path: 'post-confirm', component: PostConfirmComponent },
  { path: 'user', component: UserCreateComponent },
  { path: 'user/:id', component: UserCreateComponent, resolve: { user: UserResolver } },
  { path: 'user-confirm', component: UserConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
