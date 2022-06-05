import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-csv-download',
  templateUrl: './csv-download.component.html',
  styleUrls: ['./csv-download.component.scss']
})
export class CsvDownloadComponent implements OnInit {
  jsonData: any;
  constructor(private postSvc:PostService) { }

  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    this.postSvc.geAllPost().subscribe({
      next: result => {
        this.jsonData = result;
      },
      error: err => {
        console.log('=== handle error ====')
        console.log(err)
      }
    });
  }
  //download(){
  //  this.postSvc.downloadFile(this.jsonData,'download');
  //}

  exportToCsv(): void {
    this.postSvc.exportToCsv(this.jsonData, 'user-data', ['Post Title', 'Post Description', 'Post User', 'Post Date']);
  }

}
