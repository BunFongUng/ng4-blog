import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page: number;
  @Input() count: number;
  @Input() perPage: number;
  @Input() pagesToShow: number;
  @Input() loading: boolean;

  @Output() goPre: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {

  }

}
