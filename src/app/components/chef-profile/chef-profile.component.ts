import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chef, Review } from 'src/app/models/chefs.interface';
import { ChefsService } from 'src/app/services/chefs.service';

@Component({
  selector: 'app-chef-profile',
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css']
})
export class ChefProfileComponent {
  chef: Chef | null = null;
  newReview: Review = { author: '', content: '', date: '' };

  constructor(private route: ActivatedRoute, private chefService: ChefsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chefService.getChef(id).subscribe((data) => {
        this.chef = data;
        this.loadReviews();
      });
    }
  }

  loadReviews() {
    const reviews = localStorage.getItem(`chef-reviews-${this.chef?.id}`);
    if (reviews) {
      this.chef!.reviews = JSON.parse(reviews);
    }
  }

  addReview() {
    if (this.chef) {
      const reviews = this.chef.reviews || [];
      this.newReview.date = new Date().toISOString();
      reviews.push({ ...this.newReview });
      this.chef.reviews = reviews;
      localStorage.setItem(`chef-reviews-${this.chef.id}`, JSON.stringify(reviews));
      this.newReview = { author: '', content: '', date: '' };
    }
  }
}
