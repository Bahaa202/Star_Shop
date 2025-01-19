import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { WishlistService } from '../services/wishlist.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, DecimalPipe, DatePipe, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  updateReview(arg0: any) {
    throw new Error('Method not implemented.');
  }
  getStarTitle(_t62: number) {
    throw new Error('Method not implemented.');
  }
  addToCart(arg0: any) {
    throw new Error('Method not implemented.');
  }

  private subscription: any;
  private productId: string = '';
  product: any;
  loggedUser: any;
  errorMsg: string = '';

  reviewsForm = new FormGroup({
    comment: new FormControl(null, [Validators.required]),
    rate: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _wishlistService: WishlistService,
    private _reviewsService: ReviewsService,
    private _authService: AuthService
  ) {}

  loadProduct(productId: string) {
    this.subscription = this._productsService.getProduct(productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        err.error.message
          ? (this.errorMsg = err.error.message)
          : (this.errorMsg = 'Invalid product details');
        err.message
          ? (this.errorMsg = err.message)
          : (this.errorMsg = err.errors[0].msg);
      },
    });
  }

  addToWishlist(productId: string) {
    this._wishlistService.addToWishlist(productId).subscribe({
      next: (res) => {
        alert('Product Added to your wishlist');
      },
      error: (err) => {
        alert(`${err.error.message}`);
      },
    });
  }

  addReview(productId: string, formData: FormGroup) {
    this._reviewsService.addReview(productId, formData.value).subscribe({
      next: (res) => {
        this.loadProduct(productId);
        alert('Success');
      },
      error: (err) => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`);
        else alert(`${err.error.message}`);
      },
    });
  }

  deleteReview(reviewId: string) {
    this._reviewsService.deleteReview(reviewId).subscribe({
      next: (res) => {
        this.loadProduct(this.productId);
        alert('Success');
      },
      error: (err) => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`);
        else alert(`${err.error.message}`);
      },
    });
  }

  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
    this.loggedUser = this._authService.loggedUser.getValue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
