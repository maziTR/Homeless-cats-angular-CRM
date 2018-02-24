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

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.customers = data;
      }
    );
  }

  deleteCustomer(customer: Customer) {
    var i = this.customers.findIndex((element) => element.id === customer.id);
    this.customerService.deleteCustomer(customer).subscribe(data => {
      this.customers.splice(i, 1);
      this.dataSource = new MatTableDataSource(this.customers);
    });
  }
}