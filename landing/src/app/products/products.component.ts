import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {CurrencyPipe, DecimalPipe} from '@angular/common';
import {DescriptionPipe} from '../pipes/description.pipe';
import {RouterLink} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {Pagination} from '../interfaces/pagination';

@Component({
  selector: 'app-products',
  imports: [
    HeaderComponent,
    CurrencyPipe,
    DecimalPipe,
    DescriptionPipe,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any[] = [];
  pagination: Pagination = {};
  private subscription: any;
  private page: number = 1;
  private limit: number = 12;
  private search: string = '';

  constructor(private _productsService: ProductsService) {
  }

  loadProducts() {
    this.subscription = this._productsService.getProducts(this.page, this.limit, 'category,name', this.search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
      }
    })
  }

  searchProducts(value: string) {
    this.search = value;
    this.loadProducts();
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
