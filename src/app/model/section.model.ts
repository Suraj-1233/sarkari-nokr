export interface Section {
    title: string;
    type:string;
    items: SectionItem[];
  }
  
  export interface SectionItem {
    text: string;
    id:string
  }
  