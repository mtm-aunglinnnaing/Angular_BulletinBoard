import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CdkTableExporterModule } from 'cdk-table-exporter';
import { MatTableExporterModule, MatTableExporterDirective } from 'mat-table-exporter';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

//pages
import { UploadCsvComponent } from '../upload-csv/upload-csv.component';

//services
import { PostService } from 'src/app/services/post.service';

export interface PeriodicElement {
  name: string;
  description: string;
  created_user_id: string;
  created_date: number;
}
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  dataSource!: MatTableDataSource<PeriodicElement>;
  posts: any;
  displayedColumns: string[] = ['title', 'description', 'created_user_id', 'created_date'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private postSvc: PostService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    this.postSvc.geAllPost().subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  uploadCSV() {
    let dialogRef = this.dialog.open(UploadCsvComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.postSvc.geAllPost().subscribe((data) => {
        this.posts = data;
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}


