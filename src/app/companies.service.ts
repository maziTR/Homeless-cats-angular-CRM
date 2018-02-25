import { Injectable } from '@angular/core';
import { Company } from './models/company';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CompaniesService {

  constructor(private http: HttpClient) {}
  
  getCompanies() : Observable<Company[]> {
    return this.http.get<Company[]>('/api/companies')
  }
  
/*   deleteCompany(company:Company): Observable<{}> {
    this.http.delete<Company>('/api/companies')
    return this.http.delete<{}>('/api/companies/' + company.id );
  } */

  addCompany(company: Company) : Observable<Company>{
    return this.http.post<Company>('/api/companies',  company );
  }

}
