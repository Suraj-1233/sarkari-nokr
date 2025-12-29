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
    // FIXED: Limit to 4 items max for better information density
    this.visibleItems = this.data.data.slice(0, 4);
  }

  toggleViewMore() {
    this.isExpanded = !this.isExpanded;
    // FIXED: Show 4 items when collapsed, all when expanded
    this.visibleItems = this.isExpanded ? this.data.data : this.data.data.slice(0, 4);
  }

  openInNewTab(url: string) {
    const fullUrl = window.location.origin  + url; // Ensure hash-based routing
    window.open(fullUrl, '_blank'); // Open in a new tab
  }
  
}
