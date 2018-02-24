import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { CompanyComponent } from '../company/company.component';
import { Company } from '../models/company';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CrmFormComponent } from '../crm-form/crm-form.component'

// import {MatTableModule} from '@angular/material/table';

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
    this.company = new Company(0,"","","",0);
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
  addCompany(company:Company){

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmFormComponent, {
      width: '250px',
      data: {object: this.company, displayedColumns: this.displayedColumns}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.company = result.bindingKeys;
      console.log(result.bindingKeys)
    });
  }
}