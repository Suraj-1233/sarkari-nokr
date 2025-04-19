import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {


  constructor(private route: ActivatedRoute , private recordService: RecordService,private title: Title, private meta: Meta) {}
  id:any;
  jobsData:any={};
  ngOnInit(): void {
    
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
        console.log(this.jobsData,"new Data");
        this.title.setTitle(`${this.jobsData.title} | Sarkari Service`);
        this.meta.updateTag({ name: 'description', content: this.jobsData.nameOfPost });
        this.meta.updateTag({ property: 'og:title', content: this.jobsData.title });
        this.meta.updateTag({ property: 'og:description', content: this.jobsData.typeOfPost });
        this.meta.updateTag({ property: 'og:url', content: `https://www.servicesarkari.com/jobs/${this.jobsData.id}` });
        this.meta.updateTag({ property: 'og:site_name', content: 'Sarkari Service' });
        this.meta.updateTag({ name: 'description', content: this.jobsData.nameOfPost });
        this.meta.updateTag({ property: 'title', content: this.jobsData.title });
        this.meta.updateTag({ property: 'description', content: this.jobsData.typeOfPost });
        this.meta.updateTag({ property: 'url', content: `https://www.servicesarkari.com/jobs/${this.jobsData.id}` });
        this.meta.updateTag({ property: 'site_name', content: 'Sarkari Service' });



        
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
