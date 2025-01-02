import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  signupForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });

  usernameError: string = '';
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  signup(formData: FormGroup) {
    this._authService.signup(formData.value).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this._authService.saveLogin();
        this._router.navigate(['/home']);
      },
      error: err => {
        if (err.error.errors) {
          err.error.errors.map((error: any) => {
            if (error.path === 'username') this.usernameError = error.msg
            else if (error.path === 'name') this.nameError = error.msg
            else if (error.path === 'email') this.emailError = error.msg
            else if (error.path === 'password') this.passwordError = error.msg
            else if (error.path === 'confirmPassword') this.confirmPasswordError = error.msg
          })
        }
      }
    })
  }

  ngOnInit() {
  }

}
