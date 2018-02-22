import { Component } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomerExtendedComponent } from './customer-extended/customer-extended.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
