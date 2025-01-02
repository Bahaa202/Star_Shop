import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {rolesGuard} from './guards/roles.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'account', pathMatch: 'full'},
  {
    path: 'home',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'profile',
    title: 'Profile',
    canActivate: [authGuard],
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
  },
  {
    path: 'account',
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
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
    path: 'categories',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Categories',
        loadComponent: () => import('./categories/categories.component').then(c => c.CategoriesComponent)
      },
      {
        path: 'create',
        title: 'Create Category',
        loadComponent: () => import('./add-category/add-category.component').then(c => c.AddCategoryComponent)
      },
      {
        path: ':id/update',
        title: 'update Category',
        loadComponent: () => import('./update-category/update-category.component').then(c => c.UpdateCategoryComponent)
      }
    ]
  },
  {
    path: 'subcategories',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Subcategories',
        loadComponent: () => import('./subcategories/subcategories.component').then(c => c.SubcategoriesComponent)
      },
      {
        path: 'create',
        title: 'Create Subcategory',
        loadComponent: () => import('./add-subcategory/add-subcategory.component').then(c => c.AddSubcategoryComponent)
      },
      {
        path: ':id/update',
        title: 'update Subcategory',
        loadComponent: () => import('./update-subcategory/update-subcategory.component').then(c => c.UpdateSubcategoryComponent)
      }
    ]
  },
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () => import('./products/products.component').then(c => c.ProductsComponent)
      },
      {
        path: 'create',
        title: 'Create Product',
        loadComponent: () => import('./add-product/add-product.component').then(c => c.AddProductComponent)
      },
      {
        path: ':id/update',
        title: 'update Product',
        loadComponent: () => import('./update-product/update-product.component').then(c => c.UpdateProductComponent)
      }
    ]
  },
  {
    path: 'coupons',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Coupons',
        loadComponent: () => import('./coupons/coupons.component').then(c => c.CouponsComponent)
      },
      {
        path: 'create',
        title: 'Create Coupon',
        loadComponent: () => import('./add-coupon/add-coupon.component').then(c => c.AddCouponComponent)
      },
      {
        path: ':id/update',
        title: 'update Coupon',
        loadComponent: () => import('./update-coupon/update-coupon.component').then(c => c.UpdateCouponComponent)
      }
    ]
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'Orders',
        loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent)
      }
    ]
  },
  {
    path: 'users',
    canActivate: [authGuard, rolesGuard],
    children: [
      {
        path: '',
        title: 'Users',
        loadComponent: () => import('./users/users.component').then(c => c.UsersComponent)
      },
      {
        path: 'create',
        title: 'Create User',
        loadComponent: () => import('./add-user/add-user.component').then(c => c.AddUserComponent)
      },
      {
        path: ':id',
        title: 'User Details',
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent)
      }
    ]
  },
  {
    path: '**',
    title: 'Not Found 404',
    loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
  },
];
