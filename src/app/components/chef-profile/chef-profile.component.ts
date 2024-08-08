import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChefsService } from 'src/app/services/chefs.service';
import { OpenAIService } from 'src/app/services/openai.service';
import { Chef, Review } from 'src/app/models/chefs.interface';

@Component({
  selector: 'app-chef-profile',
  templateUrl: './chef-profile.component.html',
  styleUrls: ['./chef-profile.component.css'],
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
        this.loadSummary();
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
      this.newReview.author = this.newReview.author.toUpperCase();
      this.newReview.date = new Date().toISOString();
      reviews.push({ ...this.newReview });
      this.chef.reviews = reviews;
      localStorage.setItem(
        `chef-reviews-${this.chef.id}`,
        JSON.stringify(reviews)
      );
      this.newReview = { author: '', content: '', date: '' };
      this.summarizeReviews();
    }
  }

  loadSummary(): void {
    const storedSummary = localStorage.getItem(`chef-summary-${this.chef?.id}`);
    if (storedSummary) {
      this.summary = storedSummary;
    } else {
      this.summarizeReviews();
    }
  }

  summarizeReviews(): void {
    if (this.chef && this.chef.reviews && this.chef.reviews.length >= 2) {
      const reviewContents = this.chef.reviews
        .map((review, index) => `Review ${index + 1}: ${review.content}`)
        .join(`\n`);
      console.log(reviewContents);
      const messages = [
        {
          role: 'system',
          content: `You are an AI review summarizer. Provide a single summary in less than 75 words that highlights key takeaways from the culinary experience offered by the chef ${this.chef.name}`,
          // "If you are unsure about all of the reviews, you can respond with 'No summary available.'"
          // Few Shot Learning,
        },
        { role: 'user', content: reviewContents },
      ];
      this.openAIService.getCompletion(messages).subscribe((result) => {
        this.summary = result.choices[0].message.content;
        localStorage.setItem(`chef-summary-${this.chef?.id}`, this.summary!);
      });
    }
  }
}
