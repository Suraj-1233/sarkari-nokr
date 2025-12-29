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
  id: any;
  jobsData: any = {};
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getDataById(this.id);
      }
    });
  }

  getDataById(id: string) {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.recordService.getRecordById(id).subscribe({
      next: (data) => {
        this.jobsData = data;
        this.isLoading = false;
        
        // Set meta tags
        if (this.jobsData.title) {
          this.title.setTitle(`${this.jobsData.title} | Sarkari Service`);
          this.meta.updateTag({ name: 'description', content: this.jobsData.nameOfPost || this.jobsData.title });
          this.meta.updateTag({ property: 'og:title', content: this.jobsData.title });
          this.meta.updateTag({ property: 'og:description', content: this.jobsData.typeOfPost || this.jobsData.title });
          this.meta.updateTag({ property: 'og:url', content: `https://www.servicesarkari.com/jobs/${this.jobsData.id}` });
          this.meta.updateTag({ property: 'og:site_name', content: 'Sarkari Service' });
        }
      },
      error: (err) => {
        console.error("Error fetching data: ", err);
        this.errorMessage = 'Failed to load job details. Please try again later.';
        this.isLoading = false;
      }
    });
  } 
  
  get hasJobsData(): boolean {
    return this.jobsData && Object.keys(this.jobsData).length > 0;
  }

}
