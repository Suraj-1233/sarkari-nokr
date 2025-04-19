import { Component, Input } from '@angular/core';
import { Section } from '../../model/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() data!: Section;

  visibleItems:any;
  isExpanded = false;

  ngOnInit() {
    
    this.visibleItems = this.data.data.slice(0, 9);
  }

  toggleViewMore() {
  
    this.isExpanded = !this.isExpanded;
    this.visibleItems = this.isExpanded ? this.data.data : this.data.data.slice(0, 5);
  }

  openInNewTab(url: string) {
    const fullUrl = window.location.origin  + url; // Ensure hash-based routing
    window.open(fullUrl, '_blank'); // Open in a new tab
  }
  
}
