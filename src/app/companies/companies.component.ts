import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { CompanyComponent } from '../company/company.component';
import {Company} from '../models/company';

// import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {
  companies: Company[];
  currCompany: Company = new Company();
  displayedColumns = ['companyName', 'address', 'country', 'customersNum', 'actions'];

  constructor(private companiesServ : CompaniesService) { }

  ngOnInit() {
    this.companiesServ.getCompanies()
    .subscribe(data => {
      this.companies = data;
    });
  }
  
}