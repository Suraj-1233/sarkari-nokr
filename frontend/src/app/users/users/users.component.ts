import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/section.model';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  middleLinks:any[] = []
  coloredBoxes:any[] = []
  sections: any;
  records: any[] = [];

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.recordService.getAllRecords().subscribe(data => {
      this.records = data;
      console.log(this.records);
      const sortedData = this.sortDataInTwoParts(data);
      console.log(sortedData.firstPart);  
      console.log(sortedData.secondPart); 
      
      this.coloredBoxes=sortedData.firstPart;
      this.middleLinks=sortedData.secondPart;
      this.sections=this.getGroupedData(this.records)
      console.log(this.getGroupedData(this.records) )
    });
  }
  getGroupedData(data: any[]): any[] {
    const groupedData: { [key: string]: any } = {};
   data.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
     console.log(data," new Data")
    data.forEach((item, index) => {
      const type = item.typeOfPost;
      if (!groupedData[type]) {
        groupedData[type] = {
          type: type ,
          data:[]
        };
      }
      groupedData[type].data.push({
        text: `${item.title} `,
        id: `${item.id}`
      });
    });
    return Object.values(groupedData);
  }
 

  sortDataInTwoParts(data: any[]): { firstPart: any[], secondPart: any[] } {
    // Validate input
    if (!data || data.length === 0) {
        return { firstPart: [], secondPart: [] };
    }
    data.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
    // Extract only required fields, handle null/undefined nameOfPost
    const extractedData = data.map(item => ({
        id: item.id,
        nameOfPost: item.title || "" // Default to empty string if null/undefined
    }));

    // Sort with null/undefined check
    const compare = (a: any, b: any) => {
        const nameA = a.title || ""; // Handle null/undefined
        const nameB = b.title || ""; // Handle null/undefined
        return nameA.localeCompare(nameB);
    };

    const firstPart = extractedData.slice(0, Math.min(8, extractedData.length)).sort(compare);
    const secondPart = extractedData.slice(8, Math.min(15, extractedData.length)).sort(compare);

    return { firstPart, secondPart };
}





}
