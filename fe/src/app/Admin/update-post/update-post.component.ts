import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  title: string = '';
  nameOfPost: string = '';
  postDate: string = '';
  typeOfPost: string = '';
  shortInformation: string = '';

  data: any[] = []; // Unified array for lists & tables
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
        this.title = data?.title;
        this.postDate = data?.postDate;
        this.typeOfPost = data?.typeOfPost;
        this.shortInformation = data?.shortInformation;
        this.nameOfPost=data?.nameOfPost;
        this.data = data?.data;

        
        console.log('Fetched Post Data:', this.data);
      },
      error: (err: any) => {
        console.error('❌ Error fetching data:', err);
      }
    });
  }

  // Add a new List
  addList() {
    this.data.push({
      title: '',
      dataType: 'list',
      collapsed: true,
      data: [],
      newItem: ''
    });
  }

  // Add a new Table
  addTable() {
    this.data.push({
      title: '',
      dataType: 'table',
      columns: [],
      data: [],
      collapsed: true
    });
  }

  // Add an item to a List
  addListItem(index: number) {
    debugger
    if (this.data[index].newItem.trim() !== '') {
      this.data[index].data.push(this.data[index].newItem);
      this.data[index].newItem = '';
    }
  }

  // Remove an item from a List
  removeListItem(listIndex: number, itemIndex: number) {
    this.data[listIndex].items.splice(itemIndex, 1);
  }

  // Add a column to the table
  addColumn(item: any) {
    item.columns.push({ name: '', type: 'text' });
    item.data.forEach((row: any) => {
      row[''] = '';
    });
  }

  // Remove a column from the table
  removeColumn(item: any, columnIndex: number) {
    const columnName = item.columns[columnIndex].name;
    item.columns.splice(columnIndex, 1);
    item.data.forEach((row: any) => delete row[columnName]);
  }

  // Add a new row to the table
  addRowToTable(item: any) {
    const newRow: any = {};
    item.columns.forEach((col: any) => {
      newRow[col.name] = col.type === 'list' ? [] : '';
    });
    item.data.push(newRow);
  }

  // Remove a row from the table
  deleteRowFromTable(item: any, rowIndex: number) {
    item.data.splice(rowIndex, 1);
  }

  // Add an item to a list in the table
  addListItemToTable(item: any, rowIndex: number, columnName: string) {
    const row = item.data[rowIndex];
    if (!Array.isArray(row[columnName])) {
      row[columnName] = [];
    }
    if (row.newItem?.trim() !== '') {
      row[columnName].push(row.newItem);
      row.newItem = '';
    }
  }

  // Remove a list item from a table cell
  removeListItemFromTable(item: any, rowIndex: number, columnName: string, listIndex: number) {
    item.data[rowIndex][columnName].splice(listIndex, 1);
  }

  // Toggle collapse state
  toggleCollapse(index: number) {
    this.data[index].collapsed = !this.data[index].collapsed;
  }

  // Delete List or Table
  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.data.splice(index, 1);
    }
  }

  submitData() {
    const formattedData = {
      title: this.title,
      typeOfPost: this.typeOfPost,
      postDate: this.postDate,
      shortInformation: this.shortInformation,
      nameOfPost: this.nameOfPost,
      data: this.data.map(item => {
        if (item.dataType === 'list') {
          return {
            dataType: 'list',
            title: item.title,
            data: item.data
          };
        } else {
          return {
            dataType: 'table',
            title: item.title,
            columns: item.columns,
            data: item.data.map((row: any) => {
              const formattedRow: any = {};
              item.columns.forEach((col: any) => {
                formattedRow[col.name] = row[col.name];
              });
              return formattedRow;
            })
          };
        }
      })
    };

    console.log("Final Output:", JSON.stringify(formattedData, null, 2));

    this.updatePost(formattedData)
  }
  updatePost(formattedData:any) {
    if (!this.id) {
      alert('❌ Invalid Post ID. Cannot update.');
      return;
    }

    this.recordService.updateRecord(this.id, formattedData).subscribe({
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
onDateChange(event: any) {

  if (this.postDate) {

    this.postDate = new Date(this.postDate).toISOString().slice(0, 19); // Convert to ISO format
    console.log("Formatted Post Date:", this.postDate);
  } else {
    console.log("Post Date is empty");
  }
  // You can call your API here if needed
}

}
