import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  sendMailFlag: boolean = false;
  verifyCodeFlag: boolean = false;
  completeSendFlag: boolean = false;
  emailError: string = '';

  constructor(private _authService: AuthService, private _router: Router) {
  }

  forgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  verifyCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  resetPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  forgetPassword(formData: FormGroup) {
    this.completeSendFlag = true;
    this._authService.forgetPassword(formData.value).subscribe({
      next: res => {
        localStorage.setItem('reset', res.token);
        this.sendMailFlag = true;
        this.completeSendFlag = false;
      },
      error: err => {
        this.emailError = err.error.message;
        this.completeSendFlag = false;
      }
    })
  }

  verifyCode(formData: FormGroup) {
    this._authService.verifyCode(formData.value).subscribe({
      next: res => {
        this.verifyCodeFlag = true;
      },
      error: err => {
        this.emailError = err.error.message;
      }
    })
  }

  resetPassword(formData: FormGroup) {
    this._authService.resetPassword(formData.value).subscribe({
      next: res => {
        this.verifyCodeFlag = false;
        this.sendMailFlag = false;
        localStorage.removeItem('reset');
        this._router.navigate(['/account/login']);
      },
      error: err => {
        if (err.status === 403) this.emailError = err.error.message
        else this.emailError = err.error.errors[0].msg;
      }
    })
  }

}
