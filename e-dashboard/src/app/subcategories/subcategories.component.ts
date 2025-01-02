import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SubcategoriesService} from '../services/subcategories.service';

@Component({
  selector: 'app-subcategories',
  imports: [
    RouterLink
  ],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  constructor(private subcategoriesService: SubcategoriesService) {
  }

  subcategories: any[] = [];

  getSubcategories() {
    this.subcategoriesService.getSubcategories().subscribe({
      next: res => {
        this.subcategories = res.data;
      },
      error: error => {
      }
    })
  }

  deleteSubcategory(subcategoryId: string) {
    this.subcategoriesService.deleteSubcategory(subcategoryId).subscribe({
      next: res => {
        alert('Subcategory deleted successfully.');
        this.subcategories = this.subcategories.filter(subcategory => subcategory._id !== subcategoryId);
      }
    })
  }

  ngOnInit() {
    this.getSubcategories();
  }

  ngOnDestroy() {
  }
}
