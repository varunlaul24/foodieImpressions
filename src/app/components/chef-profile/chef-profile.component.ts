import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';
import { OpenAIService } from 'src/app/services/openai.service';
import { Chef, Review } from 'src/app/models/chefs.interface';

@Component({
  selector: 'app-chef-profile',
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css']
})
export class ChefProfileComponent implements OnInit {
  chef: Chef | null = null;
  newReview: Review = { author: '', content: '', date: '' };
  summary: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private chefService: ChefsService,
    private openAIService: OpenAIService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chefService.getChef(id).subscribe((data) => {
        this.chef = data;
        this.loadReviews();
        this.summarizeReviews();
      });
    }
  }

  loadReviews(): void {
    const reviews = localStorage.getItem(`chef-reviews-${this.chef?.id}`);
    if (reviews) {
      this.chef!.reviews = JSON.parse(reviews);
    }
  }

  addReview(): void {
    if (this.chef) {
      const reviews = this.chef.reviews || [];
      this.newReview.date = new Date().toISOString();
      reviews.push({ ...this.newReview });
      this.chef.reviews = reviews;
      localStorage.setItem(`chef-reviews-${this.chef.id}`, JSON.stringify(reviews));
      this.newReview = { author: '', content: '', date: '' };
      this.summarizeReviews();
    }
  }

  summarizeReviews(): void {
    if (this.chef?.reviews?.length) {
      const reviewContents = this.chef.reviews.map(review => review.content).join(' ');
      const messages = [
        { role: 'system', content: 'You are an AI review summarizer that summarizes customer reviews in less than 100 words to provide insights into the culinary experience offered by each chef on the CookinGenie platform' },
        { role: 'user', content: reviewContents }
      ];
      
      this.openAIService.getCompletion(messages).subscribe(
        result => {
          this.summary = result.choices[0].message.content;
        },
        error => {
          console.error('There was an error!', error);
        }
      );
    }
  }
}