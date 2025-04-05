import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {


  constructor(private route: ActivatedRoute , private recordService: RecordService) {}
  id:any;
  jobsData:any={};
  ngOnInit(): void {
    debugger
    this.route.params.subscribe((params) => {
      this.id= params['id']
    });
    if (this.id) {
      this.getDataById(this.id);  // Call API after id is assigned
    }  }
  
  getDataById(id: string) { 
    this.recordService.getRecordById(id).subscribe({
      next: (data) => {
        this.jobsData = data;
        console.log(this.jobsData);
      },
      error: (err) => {
        console.error("Error fetching data: ", err);
      }
    });
  } 
  
  get hasJobsData(): boolean {
    return this.jobsData && Object.keys(this.jobsData).length > 0;
  }

}
