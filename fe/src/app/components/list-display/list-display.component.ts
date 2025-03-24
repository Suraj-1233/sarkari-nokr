import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent {
  @Input() listData: any;

  // Link Parsing Utility for List Items
  parseTextWithLinks(text: string): string {
    return text.replace(
      /\{link:(.*?)\|(.*?)\}/g,
      `<a href="$1" target="_blank">$2</a>`
    );
  }

  // Check if List Item has Link
  hasLink(text: string): boolean {
    return typeof text === 'string' && /\{link:(.*?)\|(.*?)\}/.test(text);
  }
}
