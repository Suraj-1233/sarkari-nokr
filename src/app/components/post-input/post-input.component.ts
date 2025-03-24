import { Component } from '@angular/core';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent {
  title: string = '';
  name_of_post: string = '';
  post_date: string = '';
  short_information: string = '';

  data: any[] = []; // Unified array for lists & tables

  // Add a new List
  addList() {
    this.data.push({
      title: '',
      dataType: 'list',
      collapsed: true,
      items: [],
      newItem: '',
    });
  }

  // Add an item to a List
  addListItem(index: number) {
    if (this.data[index].newItem.trim() !== '') {
      this.data[index].items.push(this.data[index].newItem);
      this.data[index].newItem = '';
    }
  }

  // Remove an item from a List
  removeListItem(listIndex: number, itemIndex: number) {
    this.data[listIndex].items.splice(itemIndex, 1);
  }

  // Prompt user for table details (rows & columns)
  promptTable() {
    const rows = parseInt(prompt('Enter number of rows:') || '0', 10);
    const columnsInput = prompt('Enter column names separated by commas:');

    if (rows > 0 && columnsInput) {
      const columns = columnsInput.split(',').map(col => col.trim());
      this.addTable(rows, columns);
    } else {
      alert('Please enter valid rows and column names.');
    }
  }

  // Add Table with dynamic column names
  addTable(rows: number, columns: string[]) {
    const tableData = Array.from({ length: rows }, () => {
      return columns.reduce((acc, col) => {
        acc[col] = ''; // Empty fields for user input
        return acc;
      }, {} as any);
    });

    this.data.push({
      title: '',
      dataType: 'table',
      columns: columns,
      data: tableData,
      collapsed: true,
    });
  }

  // Toggle collapse state
  toggleCollapse(index: number) {
    this.data[index].collapsed = !this.data[index].collapsed;
  }

  // Delete an item (List or Table)
  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.data.splice(index, 1);
    }
  }
  trackByFn(index: number, item: any): any {
    return index; // or use a unique identifier if available
  }
  updateColumnNames(item: any, index: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      item.columns[index] = inputElement.value;
    }
  }
  
  // Submit final data
  submitData() {
    const formattedData = {
      title: this.title,
      name_of_post: this.name_of_post,
      type_of_post: "",
      post_date: this.post_date,
      short_information: this.short_information,
      data: this.data.map(item => {
        if (item.dataType === 'list') {
          return {
            dataType: 'list',
            title: item.title,
            data: item.items,
          };
        } else {
          return {
            dataType: 'table',
            title: item.title,
            columns: item.columns,
            data: item.data.map((row: { [x: string]: any; }) => {
              return item.columns.reduce((formattedRow: { [x: string]: any; }, col: string) => {
                formattedRow[col.toLowerCase().replace(/\s+/g, '_')] = row[col];
                return formattedRow;
              }, {} as any);
            }),
          };
        }
      }),
    };

    console.log('Final Output:', JSON.stringify(formattedData, null, 2));
    alert('Data submitted! Check the console for details.');
  }
}
