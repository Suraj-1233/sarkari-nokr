import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css']
})
export class DynamicFormBuilderComponent  implements OnInit {
  dynamicForm!: FormGroup;
  tableData!: FormArray;  numRows: number = 6;
  numCols: number = 9;
  selectedDataType: string = 'list';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dynamicForm = this.fb.group({
      dataType: [''],
      tableData: this.fb.array([]),
    });

    this.tableData = this.dynamicForm.get('tableData') as FormArray;
  }

  onDataTypeChange(event: any) {
    this.selectedDataType = event.target.value;
  }
  get listData(): FormArray {
    return this.dynamicForm.get('listData') as FormArray;
  }

  

  getControls(rowCtrl: any) {
    const formGroup = rowCtrl.get(Object.keys(rowCtrl.controls)[0]) as FormGroup;
    return formGroup.controls;
  }
  

  addListItem() {
    this.listData.push(new FormControl(''));
  }

  removeListItem(index: number) {
    this.listData.removeAt(index);
  }

  generateTable() {
    this.tableData.clear(); // Clear previous table data

    if (this.numRows <= 0 || this.numCols <= 0) {
      alert("Please enter valid number of rows and columns.");
      return;
    }

    for (let i = 0; i < this.numRows; i++) {
      const rowGroup = this.fb.group({});
      for (let j = 0; j < this.numCols; j++) {
        rowGroup.addControl(`col${j}`, new FormControl(''));
      }
      this.tableData.push(this.fb.group({ [`row${i}`]: rowGroup }));
    }
  }


  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}
