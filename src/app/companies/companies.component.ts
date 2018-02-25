import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { Company } from '../models/company';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CrmFormComponent } from '../crm-form/crm-form.component'

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  companies: Company[];
  displayedColumns = ['companyName', 'address', 'country', 'customersNum', 'actions'];
  dialogFields = ['companyName', 'address', 'country', 'customersNum'];
  dataSource: MatTableDataSource<Company>;

  filterOptions: any[]; // options for the select component
  selectedTermToFilter: { term: string, column: string }; // object to the input filter

  constructor(private companiesServ : CompaniesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.companiesServ.getCompanies()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.companies = data;
    });
    this.filterOptions = [
      { optionName: 'Company Name', optionKey: 'companyName' },
      { optionName: 'Address', optionKey: 'address' },
      { optionName: 'Country', optionKey: 'country' }
    ];
    this.selectedTermToFilter = { term: '', column: '' };
  }

  delEntry(id:number){
    let currInd = this.companies.findIndex(item => item.id === id);
    this.companiesServ.deleteCompany(id)
    .subscribe(data => {
      this.companies.splice(currInd,1);
      this.dataSource = new MatTableDataSource(this.companies);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmFormComponent, {
      width: '250px',
      data: {object: new Company("","","",0) , displayedColumns: this.dialogFields, title: 'company'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
      this.companiesServ.addCompany(result.object).subscribe(data =>{
        this.companies.push(data);
        this.dataSource = new MatTableDataSource(this.companies);
       }
      )
    }
    console.log('The dialog was closed');
    });
  }

  updateFilter(filterObject) {
    this.companiesServ.getFilteredCompanies(filterObject)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.companies = data;
      });
  }
}