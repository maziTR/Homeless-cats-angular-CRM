import { Injectable } from '@angular/core';
import { Company } from './models/company';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompaniesService {

  constructor(private http: HttpClient) {}
  
  getCompanies() : Observable<Company[]> {
    console.log(this.http.get<Company[]>('/api/companies'));
    return this.http.get<Company[]>('/api/companies')
  }

}
