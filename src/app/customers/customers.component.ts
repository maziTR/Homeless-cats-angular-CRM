import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';
import { Comment } from '../models/comment';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  dataSource: MatTableDataSource<Customer>;
  displayedColumns = ['firstName', 'lastName', 'companyName', 'phone', 'actions'];
  filterOptions: any[]; // options for the select component
  selectedTermToFilter: {term: string, table: string, column: string}; // object to the input filter

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.customers = data;
      }
    );
    this.filterOptions = [
      {optionName: 'Name', optionKey: 'firstName'},
      {optionName: 'Company', optionKey: 'company'},
      {optionName: 'Email', optionKey: 'email'}
    ];
    this.selectedTermToFilter = {term: '', table: 'customers', column: ''};
  }

  deleteCustomer(customer: Customer) {
    var i = this.customers.findIndex((element) => element.id === customer.id);
    this.customerService.deleteCustomer(customer).subscribe(data => {
      this.customers.splice(i, 1);
      this.dataSource = new MatTableDataSource(this.customers);
    });
  }

  updateFilter(filterObject) {
    this.customerService.getCustomersFiltered(filterObject)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.customers = data;
      });
  }
}