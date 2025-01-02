import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoriesService} from '../services/categories.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-category',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent implements OnInit {
  categoryId: string = '';
  category: any;

  constructor(private categoriesService: CategoriesService, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
  })

  updateCategory(formData: FormGroup, categoryId: string) {
    this.categoriesService.updateCategory(formData.value, categoryId).subscribe({
      next: res => {
        alert('Category updated successfully.');
        this._router.navigate(['/categories']);
      },
      error: err => {
      }
    })
  }

  ngOnInit() {
    this.categoryId = this._activatedRoute.snapshot.params['id'];
    this.categoriesService.getCategory(this.categoryId).subscribe({
      next: res => {
        this.category = res.data
      }
    })
  }

}
