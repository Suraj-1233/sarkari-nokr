import { Component } from '@angular/core';
import { Section } from './model/section.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sections: Section[] = [
    {
      title: 'Result',
      items: [
        'AIIMS Group B.C CRE Result 2025',
        'UP Police Constable 2023 Final Result',
        'SSC CGL 2024 Final Result',
        'SSC MTS 2024 Final Result',
        'MP Police Constable 2023 Final Result'
      ],
      link: '#'
    },
    {
      title: 'Admit Card',
      items: [
        'Railway RRB ALP Stage II Admit Card 2025',
        'NTA AISSEE 2025 Exam City Details',
        'BPSC Lecturer Mining Engineering Admit Card 2025',
        'Airforce Agniveer Intake 01/2026 Exam City Details',
        'CCC Admit Card March 2025'
      ],
      link: '#'
    },
    {
      title: 'Latest Jobs',
      items: [
        'NCL CIL ITI / Diploma / Graduate Apprentices Online Form 2025',
        'Army Agniveer CEE Online Form 2025',
        'CSBC Bihar Police Constable Online Form 2025',
        'MPESB Middle School Teacher Online Form 2025',
        'SSC Stenographer 2024 Vacancy Details'
      ],
      link: '#'
    },
    {
      title: 'Answer Key',
      items: [
        'SSC CPO SI 2024 Paper II Answer Key',
        'NTA CSIR UGC NET Answer Key 2025',
        'Bihar Board Class 10th Answer Key 2025',
        'SSC GD Constable Answer Key 2025'
      ],
      link: '#'
    },
    {
      title: 'Syllabus',
      items: [
        'NTA JEE MAIN Syllabus 2025',
        'UPSSSC Homeopathic Pharmacist Syllabus 2024',
        'UPSSSC JE Civil Syllabus 2024',
        'UPSSSC Assistant Store Keeper Syllabus 2024',
        'UPSSSC BCG Technician Syllabus 2024'
      ],
      link: '#'
    },
    {
      title: 'Admission',
      items: [
        'NTA NEET UG 2025 Correction Edit Form',
        'UPBED 2025 Online Form Extended',
        'Bihar ITICAT 2025 Online Form',
        'KVS Class 1 Admissions Online Form 2025',
        'Rajasthan BEd PTET Online Form 2025'
      ],
      link: '#'
    }
  ];
}
