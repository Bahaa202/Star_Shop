import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', title: 'Home', loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)},
  {
    path: 'wishlist',
    title: 'Wishlist',
    canActivate: [authGuard],
    loadComponent: () => import('./wishlist/wishlist.component').then(c => c.WishlistComponent)
  },
  {
    path: 'cart',
    title: 'Cart',
    canActivate: [authGuard],
    loadComponent: () => import('./cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'orders',
    title: 'My Orders',
    canActivate: [authGuard],
    loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent)
  },
  {
    path: 'reviews',
    title: 'My Reviews',
    canActivate: [authGuard],
    loadComponent: () => import('./reviews/reviews.component').then(c => c.ReviewsComponent)
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
  },
  {
    path: 'auth/google',
    title: 'google login',
    loadComponent: () => import('./google/google.component').then(c => c.GoogleComponent)
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: ':id',
        title: 'Product Details',
        loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: 'signup',
        title: 'signup',
        loadComponent: () => import('./signup/signup.component').then(c => c.SignupComponent)
      },
      {
        path: 'login',
        title: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'forget-password',
        title: 'forget password',
        loadComponent: () => import('./forget-password/forget-password.component').then(c => c.ForgetPasswordComponent)
      }
    ]
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
