import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent {
  type: 'table' | 'list' = 'list';
  rows = 0;
  cols = 0;

  constructor(public dialogRef: MatDialogRef<PopupModalComponent>) {}

  confirm() {
    const data = this.type === 'table' 
      ? { type: 'table', rows: Array(this.rows), cols: Array(this.cols) }
      : { type: 'list' };

    this.dialogRef.close(data);
  }

  cancel() {
    this.dialogRef.close();
  }
}
