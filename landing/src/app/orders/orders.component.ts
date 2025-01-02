import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {Pagination} from '../interfaces/pagination';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Orders} from '../interfaces/orders';

@Component({
  selector: 'app-orders',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {

  private subscription: any;
  pagination: Pagination = {};
  orders: Orders[] = [];
  page: number = 1;
  limit: number = 20;

  constructor(private _ordersService: OrdersService) {
  }

  loadOrders(): void {
    this.subscription = this._ordersService.getAllOrders(this.page, this.limit).subscribe({
      next: res => {
        this.orders = res.data;
        this.pagination = res.pagination;
      },
      error: err => {
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }

  ngOnInit() {
    this.loadOrders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
