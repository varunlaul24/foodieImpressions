import { Component } from '@angular/core';
import { ChefsService } from 'src/app/services/chefs.service';
import { Chef } from '../../models/chefs.interface';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-chef-list',
    templateUrl: './chef-list.component.html',
    imports: [RouterLink]
})
export class ChefListComponent {

  chefs: Chef[] = [];

  constructor(private chefService: ChefsService) {}

  ngOnInit() {
    this.chefService.getAllChefs().subscribe((data) => (this.chefs = data));
  }
}
