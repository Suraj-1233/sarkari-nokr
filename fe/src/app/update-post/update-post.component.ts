import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../services/record.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  postData: any = {
    title: '',
    nameOfPost: '',
    typeOfPost: '',
    postDate: '',
    shortInformation: '',
    data: []
  };
  id: any;

  constructor(private route: ActivatedRoute, private recordService: RecordService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getDataById(this.id);
      }
    });
  }

  getDataById(id: string) { 
    this.recordService.getRecordById(id).subscribe({
      next: (data: any) => {
        this.postData = data;
        console.log('Fetched Post Data:', this.postData);
      },
      error: (err: any) => {
        console.error('❌ Error fetching data:', err);
      }
    });
  }

  addList() {
    this.postData.data.push({
      title: '',
      dataType: 'list',
      collapsed: true,
      items: [],
      newItem: '',
    });
  }

  addListItem(index: number) {
    if (this.postData.data[index].newItem.trim() !== '') {
      this.postData.data[index].items.push(this.postData.data[index].newItem);
      this.postData.data[index].newItem = '';
    }
  }

  removeListItem(listIndex: number, itemIndex: number) {
    this.postData.data[listIndex].items.splice(itemIndex, 1);
  }

  promptTable() {
    const rows = parseInt(prompt('Enter number of rows:') || '0', 10);
    const columnsInput = prompt('Enter column names separated by commas:');

    if (rows > 0 && columnsInput) {
      const columns = columnsInput.split(',').map(col => col.trim());
      this.addTable(rows, columns);
    } else {
      alert('❌ Please enter valid rows and column names.');
    }
  }

  addTable(rows: number, columns: string[]) {
    const tableData = Array.from({ length: rows }, () => {
      return columns.reduce((acc, col) => {
        acc[col] = '';
        return acc;
      }, {} as any);
    });

    this.postData.data.push({
      title: '',
      dataType: 'table',
      columns: columns,
      data: tableData,
      collapsed: true,
    });
  }

  toggleCollapse(index: number) {
    this.postData.data[index].collapsed = !this.postData.data[index].collapsed;
  }

  deleteItem(index: number) {
    if (confirm('❌ Are you sure you want to delete this item?')) {
      this.postData.data.splice(index, 1);
    }
  }

  updateColumnNames(item: any, index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      item.columns[index] = inputElement.value;
    }
  }

  updatePost() {
    if (!this.id) {
      alert('❌ Invalid Post ID. Cannot update.');
      return;
    }

    this.recordService.updateRecord(this.id, this.postData).subscribe({
      next: (response) => {
        console.log('✅ Post Updated Successfully:', response);
        alert('✅ Post Updated Successfully!');
      },
      error: (err) => {
        console.error('❌ Error updating post:', err);
        alert('❌ Failed to update post. Please try again.');
      }
    });
  }
}
