import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

//services
import { PostService } from 'src/app/services/post.service';
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCsvComponent implements OnInit {
  public importedData: any = [];
  public userInfo: any;
  //public files: any[] = [];
  constructor(
    private router: Router,
    private postSvc: PostService,
    private snackBar: MatSnackBar,
    private _csvService: CsvService) { }

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
  }

  //onFileChange(pFileList: any){
  //  this.files = Object.keys(pFileList.target.files[0]).map(key => pFileList[key]);
  //  console.log(this.files);
  //}

  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this._csvService.importDataFromCSV(fileContent);
    console.log(this.importedData);
    //const csvData = this.importedData.map(({ result }: any) => {
    //  return result;
    //});
    //console.log(csvData);
    //const data = {
    //  title: csvData.title,
    //  description: csvData.description,
    //  status: 1,
    //  created_user_id: this.userInfo.id,
    //  updated_user_id: this.userInfo.id,
    //  created_at: new Date(),
    //  updated_at: new Date()
    //};
    //this.postSvc.createPost(data).subscribe({
    //  next: result => {
    //    
    //  },
    //  error: err => {
    //    console.log('=== handle error ====')
    //    console.log(err)
    //  }
    //});
    //this.snackBar.open('Post Created Successfully!', '', { duration: 3000 });
    //this.router.navigate(['/post-list']);
  }
  
  private async getTextFromFile(event:any){
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }

}
