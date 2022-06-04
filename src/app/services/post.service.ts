import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { RouterLinkWithHref } from '@angular/router';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  geAllPost(): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.get(url);
  }

  getPostDetail(postId: number): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.get(url);
  }

  createPost(data: any): Observable<any> {
    const url = this.apiUrl + '/posts';
    return this.http.post(url, data);
  }

  updatePost(data: any, postId: any): Observable<any> {
    const url = this.apiUrl + '/posts/' + postId;
    return this.http.put(url, data);
  }

  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  public exportToCsv(rows: object[], fileName: string, columns?: string[]) {
    if (!rows || !rows.length) {
      return;
    }
    console.log(typeof(rows))
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (columns?.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    console.log(keys)
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map((row:any) => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
    console.log(csvContent)
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }

//  downloadFile(data:any, filename = 'data') {
//    let csvData = this.ConvertToCSV(data, [
//        'Post Title', 'Post description', 'Posted User', 'Posted Date'
//    ]);
//    console.log(typeof(csvData))
//    let blob = new Blob(['\ufeff' + csvData], {
//        type: 'text/csv;charset=utf-8;'
//    });
//    let dwldLink = document.createElement("a");
//    let url = URL.createObjectURL(blob);
//    //let isSafariBrowser = navigator.userAgent.indexOf(
//    //    'Safari') != -1 & amp; & amp;
//    //navigator.userAgent.indexOf('Chrome') == -1;
//    //if Safari open in new window to save file with random filename.
//    //if (isSafariBrowser) {
//    //
//    //    dwldLink.setAttribute("target", "_blank");
//    //}
//    dwldLink.setAttribute("href", url);
//    dwldLink.setAttribute("download", filename + ".csv");
//    dwldLink.style.visibility = "hidden";
//    document.body.appendChild(dwldLink);
//    dwldLink.click();
//    document.body.removeChild(dwldLink);
//}
//ConvertToCSV(objArray:any, headerList:any) {
//  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//  var str = '';
//  var row = '';
//
//  for (var index in headerList) { //objArray[0]
//      //Now convert each value to string and comma-separated
//      row += headerList[index] + ',';
//  }
//  row = row.slice(0, -1);
//  //append Label row with line break
//  str += row + '\r\n';
//  for (var i = 0; i < array.length; i++) {
//      var line = (i+1)+'';
//      for (var index in headerList) {//array[i]
//         let head = headerList[index];
//
//          //if (line != '') line += ','
//          line += ',' + array[i][head];
//      }
//      str += line + '\r\n';
//  }
//  console.log(str)
//  return str;
//}
}
