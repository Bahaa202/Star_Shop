import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from '../services/profile.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: any;
  subscription: any;
  name: any;
  image: any;

  constructor(private _profileService: ProfileService) {
  }

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  createPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  saveImage(event: any) {
    this.image = event.target.files[0];
    // this.images = event.target.files;
  }

  getProfile() {
    this.subscription = this._profileService.getProfile().subscribe({
      next: res => {
        this.profile = res.data
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  updateProfile() {
    const formData = new FormData();
    if (this.name) formData.append('name', this.name);
    if (this.image) formData.append('image', this.image);
    // if (this.images) {
    //   for(let i=0;i<images.length;i++){
    //     formData.append('image', this.images[i])
    //   }
    // }
    this._profileService.updateProfile(formData).subscribe({
      next: res => {
        this.profile = res.data;
        alert('Profile updated');
      },
      error: err => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`)
        else alert(`${err.error.message}`);
      }
    })
  }

  changePassword(formData: FormGroup) {
    this._profileService.changePassword(formData.value).subscribe({
      next: res => {
        this.profile = res.data;
        localStorage.setItem('token', res.token);
      },
      error: err => {
      }
    })
  }

  createPassword(formData: FormGroup) {
    this._profileService.createPassword(formData.value).subscribe({
      next: res => {
        this.profile = res.data;
      },
      error: err => {
      }
    })
  }

  ngOnInit() {
    this.getProfile();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
