import { Component, OnInit } from '@angular/core';
// import { OpenAIService } from './services/openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
// implements OnInit 
{
  // title = 'openai-angular';
  // response: any;

  // constructor(private openAIService: OpenAIService) {}

  // ngOnInit(): void {
  //   const messages = [
  //     { role: 'system', content: 'You are a AI review summariser that summarizes customer reviews in less than 100 words to provide insights into the culinary experience offered by each chef on the CookinGenie platform' },
  //     { role: 'user', content: "['It was good'], ['It was bad']" }
  //   ];

  //   this.openAIService.getCompletion(messages).subscribe(
  //     result => {
  //       this.response = result;
  //       console.log(this.response);
  //     },
  //     error => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }
}
