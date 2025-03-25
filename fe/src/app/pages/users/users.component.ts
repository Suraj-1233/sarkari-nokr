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
      debugger
      this.coloredBoxes=sortedData.firstPart;
      this.middleLinks=sortedData.secondPart;
      this.sections=this.getGroupedData(this.records)
      console.log(this.getGroupedData(this.records) )
    });
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
        text: `${item.nameOfPost} `,
        id: `${item.id}`
      });
    });
    return Object.values(groupedData);
  }
 

   sortDataInTwoParts(data: any[]): { firstPart: any[], secondPart: any[] } {
    // Take the first 8 items and sort them
    const extractedData = data.map(item => ({ id: item.id, nameOfPost: item.nameOfPost }));

    const firstPart = extractedData.slice(0, 8 ).sort((a, b) => a.nameOfPost.localeCompare(b.nameOfPost));


    // Take the next 7 items and sort them
    const secondPart = extractedData.slice(8, 15).sort((a, b) => a.nameOfPost.localeCompare(b.nameOfPost));


    return { firstPart, secondPart };
}



}
