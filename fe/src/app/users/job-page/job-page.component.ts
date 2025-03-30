import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
data:any;
constructor(private sanitizer: DomSanitizer) {
}
  ngOnInit(): void {
    this.postDate=this.jobsData.postDate
    this.shortInformation=this.jobsData.shortInformation;
    this.data=this.jobsData.data;
    this.shortInformation = this.sanitizer.bypassSecurityTrustHtml(this.shortInformation);
    this.title= this.sanitizer.bypassSecurityTrustHtml(this.jobsData.nameOfPost);


  }
}