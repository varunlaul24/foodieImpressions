import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [RouterLink]
})
export class HeaderComponent {

  constructor(private router: Router) { }

  routeToHome(): void {
    this.router.navigate(['home']);
  }

}
