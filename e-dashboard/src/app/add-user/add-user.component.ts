import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-add-user',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(private usersService: UsersService, private router: Router) {
  }

  usersForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  })

  createUser(formData: FormGroup) {
    this.usersService.createOne(formData.value).subscribe({
      next: res => {
        alert('user added successfully!');
        this.router.navigate(['/users']);
      },
      error: err => {
      }
    })
  }
}
