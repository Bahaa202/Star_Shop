import {Component, OnDestroy, OnInit} from '@angular/core';
import {WishlistService} from '../services/wishlist.service';
import {AuthService} from '../services/auth.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  private subscription: any;
  wishlist: any[] = [];
  wishlistLength: number = 0;

  constructor(private _wishlistService: WishlistService, private _authService: AuthService) {
  }

  loadWishlist() {
    this.subscription = this._wishlistService.getWishlist().subscribe({
      next: res => {
        this.wishlist = res.data;
        this.wishlistLength = res.length;
      },
      error: err => {
      }
    })
  }

  removeFromWishlist(productId: string) {
    this._wishlistService.removeFromWishlist(productId).subscribe({
      next: res => {
        this.wishlist = res.data;
        this.wishlistLength = res.length;
        alert('Product removed from wishlist');
      },
      error: err => {
        alert('Error while trying to remove product');
      }
    })
  }

  ngOnInit() {
    this._authService.checkLogin();
    this.loadWishlist();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
