import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from '../services/reviews.service';
import {Pagination} from '../interfaces/pagination';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  private subscription: any;
  reviews: any[] = [];
  pagination: Pagination = {};
  page: number = 1;
  limit: number = 20;

  constructor(private _reviewsService: ReviewsService) {
  }

  loadReviews(): void {
    this.subscription = this._reviewsService.getReviews(this.page, this.limit).subscribe({
      next: res => {
        this.reviews = res.data;
        this.pagination = res.pagination;
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadReviews();
  }

  deleteReview(reviewId: string) {
    this._reviewsService.deleteReview(reviewId).subscribe({
      next: res => {
        this.reviews = this.reviews.filter(review => review._id !== reviewId);
        alert('review deleted successfully.');
      },
      error: err => {
        if (err.status === 400) alert(`${err.error.errors[0].msg}`)
        else alert(`${err.error.message}`);
      }
    })
  }

  ngOnInit() {
    this.loadReviews();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
