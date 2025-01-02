import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CategoriesService} from '../services/categories.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  constructor(private categoriesService: CategoriesService, private _router: Router) {
  }

  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  })

  addCategory(formData: FormGroup) {
    this.categoriesService.createCategory(formData.value).subscribe({
      next: res => {
        alert('Category added successfully.');
        this._router.navigate(['/categories']);
      },
      error: err => {
      }
    })
  }

}
