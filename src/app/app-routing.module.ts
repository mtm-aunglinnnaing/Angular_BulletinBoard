import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//pages
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { UserLoginComponent } from './users/user-login/user-login.component';

//resolver
import { PostResolver } from './resolver/post.resolver';

//guard
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'post', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostCreateComponent, resolve: { post: PostResolver }, canActivate: [AuthGuard] },
  { path: 'post-confirm', component: PostConfirmComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
