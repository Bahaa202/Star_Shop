import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CouponsService} from '../services/coupons.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-coupon',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.scss'
})
export class AddCouponComponent {
  constructor(private couponsService: CouponsService, private router: Router) {
  }

  couponsForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99)]),
    expireTime: new FormControl(null, [Validators.required])
  })

  createOne(formData: FormGroup) {
    this.couponsService.createOne(formData.value).subscribe({
      next: res => {
        alert('coupon created successfully');
        this.router.navigate(['/coupons']);
      },
      error: error => {
      }
    })
  }

}
