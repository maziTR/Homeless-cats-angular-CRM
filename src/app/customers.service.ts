import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Customer } from './models/customer';
import { Comment } from './models/comment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('api/customers');
  }

  getCustomersFiltered(filterObject): Observable<Customer[]> {
    let params = new HttpParams();
    params.set('term', filterObject.term);
    params.set('table', filterObject.table);
    params.set('column', filterObject.column);
    return this.http.get<Customer[]>('api/customers', {params: params});
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`api/customers/${id}`);
  }

  getCustomerComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`api/customers/${id}/comments`);
  }

  addCustomer(newCustomer: Customer, comments: Comment[]): Observable<Customer> {
    return this.http.post<Customer>('api/customers', { customer: newCustomer, comments: comments });
  }

  addComment(customerId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`api/customers/${customerId}`, comment);
  }

  deleteCustomer(customer: Customer): Observable<{}> {
    return this.http.delete<{}>(`api/customers/${customer.id}/${customer.companyId}`);
  }
}