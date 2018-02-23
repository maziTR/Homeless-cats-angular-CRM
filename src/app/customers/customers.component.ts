import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  dataSource: Customer[];
  // displayedColumns = ['id', 'firstName', 'lastName', 'companyName', 'email', 'phone', 'actions'];
  displayedColumns = ['firstName', 'lastName', 'companyName', 'phone', 'actions'];

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      data => this.dataSource = data
    );
  }
}