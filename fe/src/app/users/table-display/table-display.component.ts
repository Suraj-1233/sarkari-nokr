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
    debugger
    if (this.data.length > 0) {
      this.headers = Object.keys(this.data[0]);
    }
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
