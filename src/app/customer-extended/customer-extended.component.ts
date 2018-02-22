import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import {Customer} from '../models/customer';
import {Comment} from '../models/comment';

/*customer model, comments*/
@Component({
  selector: 'customer-extended',
  templateUrl: './customer-extended.component.html',
  styleUrls: ['./customer-extended.component.css']
})
export class CustomerExtendedComponent implements OnInit {

  constructor(private customerServ : CustomersService) { }

  ngOnInit() {
  }

}
