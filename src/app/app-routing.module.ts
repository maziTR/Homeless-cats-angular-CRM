import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerExtendedComponent } from './customer-extended/customer-extended.component';
import { CompaniesComponent } from './companies/companies.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CustomersComponent },
  { path: 'customers/:id', component: CustomerExtendedComponent },
  { path: 'companies', component: CompaniesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
