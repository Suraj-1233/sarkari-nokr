import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent {

  visibleItems: any;
  isExpanded = false;
  type: string = ''
  typeData: any;
  title: any
  constructor(private route: ActivatedRoute, private recordService: RecordService) { }


  ngOnInit(): void {
    debugger
    this.route.params.subscribe((params) => {
      this.type = params['type']
    });
    if (this.type) {
      this.getDataByType(this.type);  // Call API after id is assigned
    }
  }

  getDataByType(type: string) {
    this.recordService.getRecordsByType(type).subscribe({
      next: (data) => {
        this.typeData = this.getGroupedData(data);
        console.log('Grouped Data:', this.typeData);

        if (Array.isArray(this.typeData) && this.typeData.length > 0) {
          this.visibleItems = this.typeData[0].items;
          this.title = this.typeData[0].title;
        } else {
          this.visibleItems = [];
          this.title = '';
        }

        console.log('visibleItems:', this.visibleItems);
        console.log('title:', this.title);

      },
      error: (err) => {
        console.error("Error fetching data: ", err);
      }
    });
  }


  openInNewTab(url: string) {
    const fullUrl = window.location.origin + '/#' + url; 
    window.open(fullUrl, '_blank'); 
  }


  getGroupedData(data: any[]): any[] {
    const groupedData: { [key: string]: any } = {};
    data.forEach((item, index) => {
      const type = item.typeOfPost;
      if (!groupedData[type]) {
        groupedData[type] = {
          title: type,
          type: type,
          items: []
        };
      }
      groupedData[type].items.push({
        text: `${item.title} `,
        id: `${item.id}`
      });
    });
    return Object.values(groupedData);
  }


}
