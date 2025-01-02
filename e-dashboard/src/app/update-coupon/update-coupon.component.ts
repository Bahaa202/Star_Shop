import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CouponsService} from '../services/coupons.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-update-coupon',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './update-coupon.component.html',
  styleUrl: './update-coupon.component.scss'
})
export class UpdateCouponComponent implements OnInit {

  constructor(private couponsService: CouponsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  couponId: string = '';
  coupon: any;

  couponsForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)]),
    expireTime: new FormControl(null, [Validators.required])
  })

  updateOne(formData: FormGroup, couponId: string) {
    this.couponsService.updateOne(formData.value, couponId).subscribe({
      next: res => {
        alert('coupon updated successfully');
        this.router.navigate(['/coupons']);
      },
      error: error => {
      }
    })
  }

  getOne(couponId: string) {
    this.couponsService.getOne(couponId).subscribe({
      next: res => {
        this.coupon = res.data;
      },
      error: error => {
      }
    })
  }

  ngOnInit() {
    this.couponId = this.activatedRoute.snapshot.params['id'];
    this.getOne(this.couponId);
  }

}
