import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from './models/customer';
import { Comment } from './models/comment';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('api/customers');
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
}