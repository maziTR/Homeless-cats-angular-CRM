import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerExtendedComponent } from './customer-extended/customer-extended.component';
import { CompaniesComponent } from './companies/companies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CrmFormComponent } from './crm-form/crm-form.component';
import { FilterComponent } from './filter/filter.component';

import { CompaniesService } from './companies.service';
import { CustomersService } from './customers.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerExtendedComponent,
    CompaniesComponent,
    NavbarComponent,
    CrmFormComponent,
    FilterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [CrmFormComponent, CompaniesComponent],
  providers: [CompaniesService, CustomersService, AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }