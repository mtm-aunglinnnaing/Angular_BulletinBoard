import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { MatDialog } from '@angular/material/dialog';

//services
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  public postDetail: any = [];
  public allPost: any = [];
  public eachPost: any = [];
  public userData: any = [];

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action', 'action1'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postSvc: PostService, private usersSvc: UsersService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPostData();
    this.login();
  }

  getPostData() {
    this.postSvc.getPost().subscribe({
      next: posts => {
        this.allPost = posts.filter((data: any) => {
          return data.is_removed == false;
        });
        this.dataSource = new MatTableDataSource(this.allPost);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  login() {
    {
    this.userData = localStorage.getItem('userInfo');
      return console.log(this.userData);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  createPost() {
    this.router.navigate(['/post']);
  }
  editPost(postId: number) {
    this.router.navigate(['/post/'+ postId])
  }

  deletePost(postId: any) {
    this.postSvc.getPostDetail(postId).subscribe({
      next: data => {
        this.eachPost = data;
        const param = {
          "title": this.eachPost.title,
          "description": this.eachPost.description,
          "status": this.eachPost.status,
          "created_user_id": this.eachPost.created_user_id,
          "updated_user_id": this.eachPost.updated_user_id,
          "created_at": this.eachPost.created_at,
          "is_removed": true,
          "deleted_at": new Date()
        }
        this.postSvc.deletePost(postId, param).subscribe({
          next: data => { 
            this.getPostData();
          }
        })
      }
    })
  }

  titleDetail(postId: any) {

      this.postSvc.getPostDetail(postId).subscribe({
        next: res => {
          this.eachPost = res;
          this.dialog.open(PostModalComponent, {
            width: '100%',
            data: {
              title: res.title,
              description: res.description,
              status: res.status,
              created_user_id: res.created_user_id,
              updated_user_id: res.updated_user_id,
              created_at: res.created_at,
            }
          });
        },
        error: err => {
          console.log('=== handle error ===');
          console.log(err);
        }
      });
    }

}


