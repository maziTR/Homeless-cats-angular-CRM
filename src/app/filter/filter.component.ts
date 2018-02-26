import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  selected: string;
  @Input() filterOptions: any[];
  @Input() selectedTermToFilter: {term: string, column: string};
  @Output() termChanged: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
    this.selected = '0';
  }

  updateTerm() {
    this.selectedTermToFilter.column = this.filterOptions[parseInt(this.selected)].optionKey;
    this.termChanged.emit(this.selectedTermToFilter);
  }
}
