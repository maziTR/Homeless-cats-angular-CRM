import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerExtendedComponent } from './customer-extended/customer-extended.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesService } from './companies.service';
import { CustomersService } from './customers.service';
import { AppRoutingModule } from './app-routing.module';
import { CrmFormComponent } from './crm-form/crm-form.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerComponent,
    CustomerExtendedComponent,
    CompaniesComponent,
    CompanyComponent,
    NavbarComponent,
    CrmFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [CompaniesService, CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
