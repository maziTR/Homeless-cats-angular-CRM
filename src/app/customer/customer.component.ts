import { Component, OnInit } from '@angular/core';
import {Customer} from '../models/customer';
import {Comment} from '../models/comment';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
