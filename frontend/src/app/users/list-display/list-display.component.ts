import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent {
  @Input() listData: any;

  // Link Parsing Utility for List Items
  
  // Check if List Item has Link
  hasLink(text: string): boolean {
    return typeof text === 'string' && /\{link:(.*?)\|(.*?)\}/.test(text);
  }
}
