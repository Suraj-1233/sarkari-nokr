import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.css'],
})
export class DynamicContentComponent {
  @Input() data: { title: string; content: string[] } = {
    title: 'Default Title',
    content: ['Default content goes here.']
  };
}
