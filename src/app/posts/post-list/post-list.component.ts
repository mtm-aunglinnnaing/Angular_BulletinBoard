import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//services
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

//pages
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  public postDetail: any = [];
  public allPost: any = [];
  public eachPost: any = [];
  public eachData: any = [];
  public userInfo: any = [];
  public postListDetail: any = [];
  public postId: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postSvc: PostService,
    private userSvc: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login();

  }

  //user or admin filter
  login() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    if (this.userInfo.type === 0 ) {
      this.getPostData();
    } else {
      this.getEachPost();
    }
  }

  //get all post for admin
  getPostData() {
    this.postSvc.getPost().subscribe({
      next: posts => {
        this.allPost = posts.filter((data: any) => {
          this.userSvc.getUserDetail(data.created_user_id).subscribe({
            next: user => {
              data.user_name = user.name;
            }
          });
          return data.is_removed == false && data.status === 1;
        });
        this.dataSource = new MatTableDataSource(this.allPost);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  //get user related post
  getEachPost() {
    this.postSvc.getPost().subscribe({
      next: posts => {
        this.postListDetail = posts.filter((data: any) => {
          this.userSvc.getUserDetail(data.created_user_id).subscribe({
            next: user => {
              data.user_name = user.name;
            }
          });
          return data.created_user_id === this.userInfo.id && data.is_removed == false && data.status === 1;
        });
        this.dataSource = new MatTableDataSource(this.postListDetail);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  //post search filter
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  //post edit
  editPost(postId: number) {
    this.router.navigate(['/post/' + postId])
  }

  //post delete
  deletePost(postId: any) {
    this.postSvc.getPostDetail(postId).subscribe({
      next: data => {
        this.eachData = data;
        const param = {
          "title": this.eachData.title,
          "description": this.eachData.description,
          "status": this.eachData.status,
          "created_user_id": this.eachData.created_user_id,
          "updated_user_id": this.eachData.updated_user_id,
          "created_at": this.eachData.created_at,
          "is_removed": true,
          "deleted_at": new Date()
        }
        this.postSvc.deletePost(postId, param).subscribe({
          next: data => {
            if (this.userInfo.type === 0) {
              this.snackBar.open('Post Deleted Successfully!', '', { duration: 3000 });
              this.getPostData();
            }
            else {
              this.snackBar.open('Post Deleted Successfully!', '', { duration: 3000 });
              this.getEachPost();
            }
          }
        })
      }
    })
  }

  //post create
  createPost() {
    this.router.navigate(['/post']);
  }

  //post upload
  uploadCSV() {
    let dialogRef = this.dialog.open(UploadCsvComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.login();
    })
  }

  //post title details
  titleDetail(postId: any) {
    this.postSvc.getPostDetail(postId).subscribe({
      next: res => {
        this.eachData = res;
        this.dialog.open(PostModalComponent, {
          width: '40%',
          data: {
            title: res.title,
            description: res.description,
            status: res.status,
            created_user_id: res.created_user_id,
            updated_user_id: res.updated_user_id,
            created_at: res.created_at,
          }
        });
      }
    });
  }
}


