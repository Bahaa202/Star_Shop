import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CouponsService} from '../services/coupons.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-coupons',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit, OnDestroy {
  constructor(private couponsService: CouponsService) {
  }

  coupons: any[] = [];
  pagination: any;

  getAll() {
    this.couponsService.getAll().subscribe({
      next: res => {
        this.coupons = res.data;
        this.pagination = res.pagination;
      },
      error: err => {
      }
    })
  }

  deleteOne(couponId: string) {
    this.couponsService.deleteOne(couponId).subscribe({
      next: res => {
        this.coupons = this.coupons.filter(coupon => coupon._id !== couponId);
      },
      error: err => {
      }
    })
  }

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
  }
}
