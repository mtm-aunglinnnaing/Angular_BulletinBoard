import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { PostListComponent } from './posts/post-list/post-list.component';

//services
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
