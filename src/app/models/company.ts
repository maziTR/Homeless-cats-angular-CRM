export class Company{
    id: number;
    companyName: string;
    address:string;
    country:string;
    customersNum:number;
    constructor(id, companyName,address,country,customersNum){
        this.id = id;
        this.companyName = companyName;
        this.address = address;
        this.country= country;
        this.customersNum = customersNum;
    }
}