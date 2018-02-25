import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../models/company';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrmFormComponent } from '../crm-form/crm-form.component';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  companies: Company[];
  displayedColumns = ['companyName', 'address', 'country', 'customersNum', 'actions'];
  company: Company;
  constructor(private companiesServ : CompaniesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.companiesServ.getCompanies()
    .subscribe(data => {
      this.companies = data;
    });
  }

/*   delEntry(id:number){
    this.companiesServ.deleteCompany(id)
    .subscribe(data => {
      this.companies = data;
    });
  } */

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmFormComponent, {
      width: '250px',
      data: {object: new Company("","","",0) , displayedColumns: this.displayedColumns, title: 'company'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
      this.companiesServ.addCompany(result.object).subscribe(data =>
        this.companies.push(data)
      )
    }
    console.log('The dialog was closed');
    });
  }
}