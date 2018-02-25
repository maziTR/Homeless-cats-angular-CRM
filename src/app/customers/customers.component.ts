import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';
import { Comment } from '../models/comment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CrmFormComponent } from '../crm-form/crm-form.component';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;
  displayedColumns = ['firstName', 'lastName', 'companyName', 'phone', 'actions'];
  dialogFields = ['firstName', 'lastName', 'companyId', 'email', 'phone'];

  filterOptions: any[]; // options for the select component
  selectedTermToFilter: { term: string, column: string }; // object to the input filter

  constructor(private customerService: CustomersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.customers = data;
      }
    );
    this.filterOptions = [
      { optionName: 'First Name', optionKey: 'firstName' },
      { optionName: 'Last Name', optionKey: 'lastName' },
      { optionName: 'Company', optionKey: 'companyName' },
      { optionName: 'Phone', optionKey: 'phone' }
    ];
    this.selectedTermToFilter = { term: '', column: '' };
  }

  deleteCustomer(customer: Customer) {
    var i = this.customers.findIndex((element) => element.id === customer.id);
    this.customerService.deleteCustomer(customer).subscribe(data => {
      this.customers.splice(i, 1);
      this.dataSource = new MatTableDataSource(this.customers);
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CrmFormComponent, {
      width: '250px',
      data: { object: new Customer('', '', 1, '', ''), displayedColumns: this.dialogFields, title: 'customer' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.addCustomer(result.object).subscribe(data => {
          this.customers.push(data);
          this.dataSource = new MatTableDataSource(this.customers);
        });
      }
      console.log('The dialog was closed');
    });
  }

  updateFilter(filterObject) {
    this.customerService.getFilteredCustomers(filterObject)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.customers = data;
      });
  }
}