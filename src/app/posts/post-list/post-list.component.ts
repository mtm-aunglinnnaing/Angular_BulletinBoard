import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';
import { MatDialog } from '@angular/material/dialog';

//services
import { PostService } from 'src/app/services/post.service';
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
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_at', 'action', 'action1'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postSvc: PostService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.login();
    
  }

  login() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
    this.postId = this.route.snapshot.params['id'];
    if (this.userInfo.type === 0) {
      this.getPostData();
    } else {
        this.postSvc.getPost().subscribe({
          next: posts => {
            this.postListDetail = posts.filter((data: any) => {
              return data.created_user_id === this.userInfo.id && data.is_removed == false;
            });
            console.log(this.postListDetail);
            this.dataSource = new MatTableDataSource(this.postListDetail);
            this.dataSource.paginator = this.paginator;
          }
        });
        
      }
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
            this.getPostData();
          }
        })
      }
    })
  }

  titleDetail(postId: any) {

      this.postSvc.getPostDetail(postId).subscribe({
        next: res => {
          this.eachData = res;
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


