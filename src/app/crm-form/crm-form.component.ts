import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css']
})
export class CrmFormComponent implements OnInit {

  object: any;
  objectKeys: any;
  displayKeys: any;
  bindingKeys: string[];

  constructor(
    public dialogRef: MatDialogRef<CrmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      this.displayKeys = this.data.displayedColumns;
      let currInd = this.displayKeys.findIndex((item)=> item == "actions");
      if (currInd > -1){
        this.displayKeys.splice(currInd, 1);
      }
      
      this.objectKeys = Object.keys(this.data.object);
      this.object = this.data.object;
    }

/*     trackByIndex(index: number, obj: any): any {
      return index;
    } */
}
