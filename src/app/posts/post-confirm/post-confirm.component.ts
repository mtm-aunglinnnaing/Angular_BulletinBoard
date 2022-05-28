import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { PostService } from 'src/app/services/post.service';
import { SharingDataService } from 'src/app/services/sharing-data.service';

//pages
import { PlainModalComponent } from '../components/plain-modal/plain-modal.component';

@Component({
  selector: 'app-post-confirm',
  templateUrl: './post-confirm.component.html',
  styleUrls: ['./post-confirm.component.scss']
})
export class PostConfirmComponent implements OnInit {

  public postData: any;
  public postList: any;
  public postId: any;
  public isChecked: boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private shareDataSvc: SharingDataService,
    private postSvc: PostService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.postId = this.activatedRoute.snapshot.params['id'];
    this.postData = this.shareDataSvc.getPostData();
    this.postId = this.postData.postId;
    if (this.postData.status === 1) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    this.getPostList();
    //console.warn(this.postList);
  }

  getPostList() {
    this.postSvc.geAllPost().subscribe({
      next: result => {
        this.postList = result;
      },
      error: err => {
        console.log('=== handle error ====')
        console.log(err)
      }
    });
  }

  createPost() {
    const duplicateTitle = this.postList.filter((item: any) => item.title === this.postData.title);

    if (duplicateTitle.length > 0) {
      this.dialog.open(PlainModalComponent, {
        data: {
          content: `${this.postData.title} already exists in the post list!`,
          note: '',
          applyText: 'Ok'
        }
      });
    } else {
      if (this.postId) {
        const data = {
          //id: this.postId,
          title: this.postData.title,
          description: this.postData.description,
          status: this.postData.status,
          updated_user_id: 2,
          updated_at: new Date()
        };
        this.postSvc.updatePost(data, this.postId)
          .subscribe({
            next: result => {
              this.router.navigate(['/post-confirm']);
            },
            error: err => {
              console.log('=== handle error ====')
              console.log(err)
            }
          });
        this.snackBar.open('Post Updated Successfully!', 'Dismiss  ');
      } else {
        const data = {
          title: this.postData.title,
          description: this.postData.description,
          status: 1,
          created_user_id: 1,
          updated_user_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        };
        this.postSvc.createPost(data).subscribe({
          next: result => {
            //this.router.navigate(['/post-confirm']);
          },
          error: err => {
            console.log('=== handle error ====')
            console.log(err)
          }
        });
        this.snackBar.open('Post Created Successfully!', 'Dismiss');
      }

    }
  }

  //updatePost() {
  //  const data = {
  //    id: this.postId,
  //    title: this.postData.title,
  //    description: this.postData.description,
  //    status: this.postData.status,
  //    updated_user_id: 1,
  //    updated_at: new Date()
  //  };
  //  this.postSvc.updatePost(this.postId, data).subscribe({
  //    next: result => {
  //      //this.router.navigate(['/post-confirm']);
  //    },
  //    error: err => {
  //      console.log('=== handle error ====')
  //      console.log(err)
  //    }
  //  });
  //}

  goBackPostCreate() {
    if (this.postId) {
      this.router.navigate(['/post/' + this.postId]);
    }
    else {
      this.router.navigate(['/post']);
    }
  }
}
