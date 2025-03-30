import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css'],
})
export class JobPageComponent  implements OnInit  {
 @Input() jobsData: any;
 title: any;
 postDate:any;
 shortInformation:any;
data:any
  ngOnInit(): void {
    console.log(this.jobsData , " ths s ");
    this.title=this.jobsData.title;
    this.postDate=this.jobsData.postDate;
    this.shortInformation=this.jobsData.shortInformation;
    this.data=this.jobsData.data;
  }
}