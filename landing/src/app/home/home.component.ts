import {Component} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {BestSellerComponent} from '../best-seller/best-seller.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    BestSellerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
