import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css']
})
export class CrmFormComponent implements OnInit {
//  @Input() visible: boolean;
//  @Input() data: any;
//  @Output(); // submit + object
    currKeys: any;

  constructor() { }

  ngOnInit() {
    // genarete empty object according to data
    // this.currKeys = Object.keys(this.data);
  }

}
