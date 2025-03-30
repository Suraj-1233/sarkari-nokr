import { Component } from '@angular/core';

@Component({
  selector: 'app-post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent {
  title: string = '';
  nameOfPost: string = '';
  postDate: string = '';
  typeOfPost: string = '';
  shortInformation: string = '';

  data: any[] = []; // Unified array for lists & tables

  // Add a new List
  addList() {
    this.data.push({
      title: '',
      dataType: 'list',
      collapsed: true,
      items: [],
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
    if (this.data[index].newItem.trim() !== '') {
      this.data[index].items.push(this.data[index].newItem);
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

  // Submit final data
  submitData() {
    const formattedData = {
      typeOfPost: this.typeOfPost,
      nameOfPost: this.nameOfPost,
      postDate: this.postDate,
      shortInformation: this.shortInformation,
      data: this.data.map(item => {
        if (item.dataType === 'list') {
          return {
            dataType: 'list',
            title: item.title,
            data: item.items
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
  }
}
