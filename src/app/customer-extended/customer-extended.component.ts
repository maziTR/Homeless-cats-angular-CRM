import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { Customer } from '../models/customer';
import { Comment } from '../models/comment';

/*customer model, comments*/
@Component({
  selector: 'customer-extended',
  templateUrl: './customer-extended.component.html',
  styleUrls: ['./customer-extended.component.css']
})
export class CustomerExtendedComponent implements OnInit {
  customer: Customer = new Customer();
  showCommentForm: boolean;
  newCommentText: string;

  constructor(private customerService: CustomersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customerService.getCustomer(params.id).subscribe(customerData => {
        this.customer = customerData[0];
        this.customerService.getCustomerComments(params.id).subscribe(commentsData => {
          this.customer.comments = commentsData;
        });
      });
    });
    this.showCommentForm = false;
    this.newCommentText = "";
  }

  toggleCommentForm() {
    this.showCommentForm = !this.showCommentForm;
  }

  addComment() {
    let customerId = this.customer.id;
    let comment = {text: this.newCommentText, customerId: customerId, date: new Date()};
    this.customerService.addComment(customerId, comment).subscribe(data =>{
      this.customer.comments.push(comment);
      this.toggleCommentForm();
    });
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customer).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}