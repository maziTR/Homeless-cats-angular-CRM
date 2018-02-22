import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { CompanyComponent } from '../company/company.component';
import {Company} from '../models/company';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {

  constructor(private companiesServ : CompaniesService) { }

  ngOnInit() {
  }

}
