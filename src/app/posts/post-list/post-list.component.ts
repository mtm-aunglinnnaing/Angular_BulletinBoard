import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

//services
import { PostService } from 'src/app/services/post.service';


export interface PeriodicElement {
  name: string;
  description: string;
  created_user_id: number;
  created_date: number;
}
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  public postDetail: any = [];

  dataSource!: MatTableDataSource<PeriodicElement>;
  posts: any;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_date', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postSvc: PostService, private router: Router,) { }

  ngOnInit(): void {

    this.postSvc.getPost().subscribe((data: any) => {
      console.log(data);
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  postCreate() {
    this.router.navigate(['/post']);
  }
   postDelete = async (postId: number) => {
    console.log(postId);
    this.postDetail = await this.postSvc.getListDetail(postId);
    console.log(this.postDetail)
    const data = {
      title: this.postDetail.title,
      description: this.postDetail.description,
      status: 1,
      created_user_id: 1,
      updated_user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

}


