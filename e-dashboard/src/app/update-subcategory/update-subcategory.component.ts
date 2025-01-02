import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SubcategoriesService} from '../services/subcategories.service';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-update-subcategory',
  imports: [
    RouterLink
  ],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss'
})
export class UpdateSubcategoryComponent {
  constructor(private subcategoriesService: SubcategoriesService, private categoriesService: CategoriesService, private router: Router) {
  }

  updateSubcategory() {
  }

}
