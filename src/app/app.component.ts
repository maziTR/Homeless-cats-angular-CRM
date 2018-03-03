import { Component, OnInit } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomerExtendedComponent } from './customer-extended/customer-extended.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private authService: AuthService, public router: Router) { }
  
  ngOnInit() {
    this.authService.fetchUserDetails().subscribe(
      data => console.log(data)
    );
  }

}