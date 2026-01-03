import { Component, Input } from '@angular/core';
import { Section } from '../../model/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})

  export class SectionComponent {
  @Input() data!: Section;

  visibleItems: any[] = [];
  isExpanded = false;

  ngOnInit() {
    this.setCollapsedView();
  }

  toggleViewMore() {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.visibleItems = this.data.data;
    } else {
      this.setCollapsedView();
    }
  }

  private setCollapsedView() {
    const items = this.data.data;

    // If 4 or fewer items, show all
    if (items.length <= 4) {
      this.visibleItems = items;
      return;
    }

    // Show ONLY last 4 items
    this.visibleItems = items.slice(-4);
  }

  openInNewTab(url: string) {
    const fullUrl = window.location.origin + url;
    window.open(fullUrl, '_blank');
  }
}
