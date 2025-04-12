import { Component } from '@angular/core';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  records: any[] = [];
  data='ff'
    constructor(private recordService: RecordService) {}
  
    ngOnInit(): void {
      this.recordService.getAllRecords().subscribe(data => {
        this.records = data;
        console.log(this.records , " ths ");
        this.records=this.extractUniqueTypeAndTitle(this.records)
        console.log(this.extractUniqueTypeAndTitle(this.records))
      });
    }
   
   
    extractUniqueTypeAndTitle(dataArray: any[], limit = 5) {
      const uniqueData = new Map();
      const result = [];
  
      for (const item of dataArray) {
          if (!uniqueData.has(item.typeOfPost)) {
              uniqueData.set(item.typeOfPost, { typeOfPost: item.typeOfPost, title: item.title });
              result.push({ typeOfPost: item.typeOfPost, title: item.title });
  
              if (result.length === limit) break; // Stop when reaching the limit
          }
      }
  
      return result;
  }

  
  

  openInNewTab(url: string) {
    const fullUrl = window.location.origin + url; 
    window.open(fullUrl, '_blank'); 
  }

}
