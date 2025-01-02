import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../services/orders.service';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {
  }

  orders: any[] = [];

  getAll() {
    this.ordersService.getAll().subscribe({
      next: res => {
        this.orders = res.data;
      },
      error: error => {
      }
    })
  }

  deliverOrder(orderId: string) {
    this.ordersService.deliverOne(orderId).subscribe({
      next: res => {
        // const index = this.orders.findIndex(order => order?._id === orderId);
        // this.orders[index] = res.data;
        this.getAll();
      },
      error: error => {
      }
    })
  }

  payOrder(orderId: string) {
    this.ordersService.payOne(orderId).subscribe({
      next: res => {
        // const index = this.orders.findIndex(order => order?._id === orderId);
        // this.orders[index] = res.data;
        this.getAll();
      },
      error: error => {
      }
    })
  }

  ngOnInit() {
    this.getAll();
  }

}
