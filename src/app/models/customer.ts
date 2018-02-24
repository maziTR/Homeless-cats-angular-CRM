import {Company} from './company';
import {Comment} from './comment';

export class Customer{
    id: number;
    firstName: string;
    lastName: string;
    companyId: string;
    companyName: string;
    email: string;
    phone: string;
    comments?: Comment[];
}