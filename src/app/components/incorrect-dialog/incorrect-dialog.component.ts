import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incorrect-dialog',
  templateUrl: './incorrect-dialog.component.html',
  styleUrls: ['./incorrect-dialog.component.scss']
})
export class IncorrectDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IncorrectDialogComponent>
  ) { }

  ngOnInit(): void {
  }

}
