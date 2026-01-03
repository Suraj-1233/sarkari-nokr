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
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.recordService.getAllRecords().subscribe({
      next: (data) => {
      this.records = data;
      const sortedData = this.sortDataInTwoParts(data);
        this.coloredBoxes = sortedData.firstPart;
        this.middleLinks = sortedData.secondPart;
        this.sections = this.getGroupedData(this.records);
        
        const priorityOrder = ["Result", "Admit Card", "Latest Jobs", "Answer Key"];
      const prioritySections = this.sections.filter(
        (section: any) => priorityOrder.includes(section.type)
      );
  
      const otherSections = this.sections.filter(
        (section: any) => !priorityOrder.includes(section.type)
      );
  
      this.sections = [...prioritySections, ...otherSections];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading records:', error);
        this.errorMessage = 'Failed to load data. Please try again later.';
        this.isLoading = false;
      }
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

    const firstPart = extractedData.slice(0, Math.min(6, extractedData.length)).sort(compare);
    const secondPart = extractedData.slice(8, Math.min(15, extractedData.length)).sort(compare);

    return { firstPart, secondPart };
}





}
