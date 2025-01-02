import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-categories',
  imports: [
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: any[] = [];

  constructor(private _categoriesService: CategoriesService) {
  }

  getAll() {
    this._categoriesService.getCategories().subscribe({
      next: res => {
        this.categories = res.data;
      },
      error: err => {
      },
    })
  }

  deleteCategory(categoryId: string) {
    this._categoriesService.deleteCategory(categoryId).subscribe({
      next: res => {
        this.categories = this.categories.filter(category => category._id !== categoryId);
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
