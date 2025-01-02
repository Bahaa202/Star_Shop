import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SubcategoriesService} from '../services/subcategories.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'app-add-subcategory',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss'
})
export class AddSubcategoryComponent implements OnInit {
  constructor(private subcategoriesService: SubcategoriesService, private categoriesService: CategoriesService, private router: Router) {
  }

  categories: any[] = [];
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    category: new FormControl(null, [Validators.required])
  })

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: res => {
        this.categories = res.data;
      }
    })
  }

  addSubcategory(formData: FormGroup) {
    this.subcategoriesService.createSubcategory(formData.value).subscribe({
      next: () => {
        alert('Subcategory added successfully');
        this.router.navigate(['/subcategories']);
      }
    })
  }

  ngOnInit() {
    this.getCategories();
  }
}
