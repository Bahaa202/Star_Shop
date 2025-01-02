import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DescriptionPipe } from '../pipes/description.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-best-seller',
  imports: [DecimalPipe, DescriptionPipe, RouterLink, CurrencyPipe],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss',
})
export class BestSellerComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private subscription: any;

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}

  loadProducts() {
    this.subscription = this._productsService
      .getProducts(1, 20, '-sold', '')
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
      });
  }

  addToCart(productId: string) {
    this._cartService.addToCart(productId).subscribe({
      next: (res) => {
        alert('product added successfully');
      },
      error: (err) => {
        err.error.errors
          ? alert(`${err.error.errors[0].msg}`)
          : alert(`${err.error.message}`);
      },
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
