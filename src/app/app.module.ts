import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//pages
import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostConfirmComponent } from './posts/post-confirm/post-confirm.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { PlainModalComponent } from './components/plain-modal/plain-modal.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ListModalComponent } from './components/list-modal/list-modal.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserConfirmComponent } from './users/user-confirm/user-confirm.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserUpdateConfirmComponent } from './users/user-update-confirm/user-update-confirm.component';

//services
import { PostService } from './services/post.service';
import { UsersService } from './services/users.service';

//pipes
import { PasswordPipe } from './pipes/password.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostConfirmComponent,
    PlainModalComponent,
    UserLoginComponent,
    PostListComponent,
    UserListComponent,
    ListModalComponent,
    UserCreateComponent,
    UserConfirmComponent,
    UserUpdateComponent,
    UserUpdateConfirmComponent,
    PasswordPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PostService,
    UsersService,
    PasswordPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
