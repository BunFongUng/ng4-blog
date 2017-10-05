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
  @Input() loading: boolean;
  @Input() pagesToShow: number;

  @Output() goPrev: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goNext: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() goPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  public getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  public getMax(): number {
    let max = this.perPage * this.page;

    if (max > this.count) {
      max = this.count;
    }

    return max;
  }

  public onPage(n: number): void {
    this.goPage.emit(n);
  }

  public onPrev(): void {
    this.goPrev.emit(true);
  }

  public onNext(): void {
    this.goNext.emit(true);
  }

  public totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  public lastPage(): boolean {
    return this.perPage * this.page > this.count;
  }

  public getPages(): number[] {
    const c = Math.ceil(this.count / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];

    pages.push(p);

    const times = pagesToShow - 1;

    for (let i = times; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }

      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }

    pages.sort((a, b) => a - b);

    return pages;
  }

  ngOnInit() {
  }

}
