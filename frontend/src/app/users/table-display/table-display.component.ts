import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styleUrls: ['./table-display.component.css']
})
export class TableDisplayComponent implements OnInit {
  @Input() data:any;
  headers: string[] = [];

  ngOnInit() {
    
    if (this.data.length > 0) {
      this.headers = Object.keys(this.data[0]);
    }
  }


  
  shouldRenderCell(rowIndex: number, colIndex: number): boolean {
    const header = this.headers[colIndex];
    return !this.isDuplicate(rowIndex, colIndex, header);
  }
  
  isDuplicate(rowIndex: number, colIndex: number, header: string): boolean {
    for (let i = 0; i < rowIndex; i++) {
      if (this.data[i][header] === this.data[rowIndex][header]) {
        return true;
      }
    }
    return false;
  }
  getRowSpan(rowIndex: number, colIndex: number): number {
    const header = this.headers[colIndex];
    const currentValue = this.data[rowIndex][header];

    // If current value is empty, no row span needed
    if (
      currentValue === null ||
      currentValue === undefined ||
      currentValue === '' ||
      (Array.isArray(currentValue) && currentValue.length === 0)
    ) {
      return 0;
    }

    let rowSpan = 1;

    // Loop to check consecutive rows for merging
    for (let i = rowIndex + 1; i < this.data.length; i++) {
      const nextValue = this.data[i][header];
      if (
        nextValue === currentValue ||
        nextValue === null ||
        nextValue === undefined ||
        nextValue === '' ||
        (Array.isArray(nextValue) && nextValue.length === 0)
      ) {
        rowSpan++;
      } else {
        break;
      }
    }

    return rowSpan;
  }
  // Text with Link Parsing Utility
  parseTextWithLinks(text: string): string {
    return text.replace(
      /\{link:(.*?)\|(.*?)\}/g,
      `<a href="$1" target="_blank">$2</a>`
    );
  }

  // List Detection Utility
  isList(value: any): boolean {
    return Array.isArray(value);
  }

  // Text with Link Detection
  hasLink(text: string): boolean {
    return typeof text === 'string' && /\{link:(.*?)\|(.*?)\}/.test(text);
  }
}
