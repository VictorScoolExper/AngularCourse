import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // this allows for the rest of the app to get access to the service
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}

}
