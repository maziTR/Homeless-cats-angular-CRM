import {Company} from './company';
import {Comment} from './comment';

export class Customer{
    id: number;
    firstName: string;
    lastName: string;
    company: Company;
    email: string;
    phone: string;
    comments: Comment[];
}