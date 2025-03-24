import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.css']
})
export class HeaderLinksComponent  implements OnInit {
  @Input() middleLinks: any[] = [];  
  @Input() coloredBoxes: any[] = [];
  randomColors: string[] = [];

  groupedLinks:any;

  // topLinks: Link[] = [
  //   { text: 'Sarkri Result Android Apps', id: 'android-apps' },
  //   { text: 'Sarkari Result Youtube Channel', id: 'youtube-channel' },
  //   { text: 'Sarkari Result Apple / IOS Apps', id: 'ios-apps' },
  //   { text: 'Follow Instagram', id: 'instagram-follow' }
  // ];
  
 ngOnInit(): void {
  console.log(this.middleLinks)
  console.log(this.middleLinks);
   this.groupedLinks = this.middleLinks.reduce<{ nameOfPost: string; id: string }[][]>((acc, link, index) => {
    const groupIndex = Math.floor(index / 3);
  
    if (!acc[groupIndex]) {
      acc[groupIndex] = []; // Initialize sub-array
    }
  
    acc[groupIndex].push({
      nameOfPost: link.nameOfPost, // Correct key mapping
      id: link.id
    });
  
    return acc;
  }, []);

     
 }

  topLinks: any[] = [
    
  ];
  
  // middleLinks: any[] = [
  //   { text: 'Railway RRB Technician Grade I Result 2025', id: 'railway-technician-result-2025' },
  //   { text: 'Bihar Board Class 10th Matric Answer Key', id: 'bihar-board-matric-key' },
  //   { text: 'UPPSC Pre Online Form 2025', id: 'uppsc-pre-2025' },
  //   { text: 'MPESB Parvekshak Admit Card 2025', id: 'mpesb-parvekshak-admit' },
  //   { text: 'SSC GD Constable Answer Key 2025', id: 'ssc-gd-key-2025' },
  //   { text: 'NTA CUET Exam City Details', id: 'nta-cuet-city' },
  //   { text: 'RRB Junior Engineer JE Result 2025', id: 'rrb-je-result-2025' },
  //   { text: 'Rajasthan PTET Online Form 2025', id: 'rajasthan-ptet-2025' },
  //   { text: 'NTA CUET UG 2025 Online Form', id: 'nta-cuet-ug-2025' }
  // ];
  
  // coloredBoxes: Box[] = [
  //   { text: 'RPF Constable Admit Card', color: 'olive', id: 'rpf-constable-admit' },
  //   { text: 'CISF Tradesman Apply Online', color: 'blue', id: 'cisf-tradesman-apply' },
  //   { text: 'CUET UG 2025 Apply Online', color: 'orange', id: 'cuet-ug-2025-apply' },
  //   { text: 'Army Agniveer 2025 Apply Online', color: 'brown', id: 'army-agniveer-2025' },
  //   { text: 'RRB Jr Engineer Result 2025', color: 'red', id: 'rrb-je-result' },
  //   { text: 'SSC Constable GD Answer Key', color: 'green', id: 'ssc-constable-gd-key' },
  //   { text: 'UPPSC Pre 2025 Apply Online', color: 'magenta', id: 'uppsc-pre-apply' },
  //   { text: 'JEECUP 2025 Apply Online', color: 'dodgerblue', id: 'jeecup-2025-apply' }
  // ];
  

  // groupedLinks = this.middleLinks.reduce<{ nameOfPost: string; id: string }[][]>((acc, link, index) => {
  //   const groupIndex = Math.floor(index / 3);
  
  //   if (!acc[groupIndex]) {
  //     acc[groupIndex] = []; // Initialize sub-array
  //   }
  
  //   acc[groupIndex].push({
  //     nameOfPost: link.text, // Correct key mapping
  //     id: link.id
  //   });
  
  //   return acc;
  // }, []);
  

  openInNewTab(url: string) {
    const fullUrl = window.location.origin + url; // Construct full URL
    window.open(fullUrl, '_blank'); // Open in a new tab
  }

  getRandomColor(index: number): string {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3C623", "#E91E63"];
    return colors[index % colors.length]; // Cycles through colors
  }
}
